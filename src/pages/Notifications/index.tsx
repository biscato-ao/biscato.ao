import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/menu';
import { getFirestore, collection, onSnapshot, query, where, addDoc, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { Job, Notification } from "../../interface";
import { auth } from '../../services/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from "uuid";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const db = getFirestore();
  const [user] = useAuthState(auth);
  const userId = user?.uid;
  const uid = auth.currentUser?.uid;
  const [users, setUsers] = useState<any>(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const getUsers = async () => {
      if (uid) {
        try {
          const userDoc = doc(db, "users", uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log("Dados do usuário:", userData);
            setUsers(userData);
          } else {
            console.log('Usuário não encontrado na coleção "users"');
          }
        } catch (error) {
          console.error("Erro ao obter dados do usuário:", error);
        }
      }
    };

    getUsers();
  }, [uid, db]);

  useEffect(() => {
    const q = query(collection(db, 'notifications'), where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedNotifications = snapshot.docs.map((doc) => doc.data() as Notification);
      setNotifications(updatedNotifications);
    });

    return () => {
      unsubscribe();
    };
  }, [db, userId]);

  const sendWorkRequest = async (proposal: Notification) => {
    try {
      const notification: Notification = {
        userId: proposal.requesterId,
        message: "Sua proposta foi aceita!",
        timestamp: new Date(),
        isRead: false,
        proposalId: proposal.proposalId,
        jobId: proposal.jobId,
        requesterName: users?.displayName || "", 
        requesterId: users?.uid || "",
        requesterPhoto: users?.photoURL || "",
        requesterPhoneNumber: users?.phoneNumber || "", 
        notificationId: uuidv4(),
        rightRequest: false
      }; 
  
      const notificationsCollection = collection(db, "notifications");
      await addDoc(notificationsCollection, notification);
  
      console.log("Notificação enviada com sucesso!");

      // Criar um novo trabalho com a proposta aceita
      const newJobData: Job = {
        jobId: uuidv4() ,
        title: '',
        description: '',
        location: '',
        publishDate: new Date() || null,
        publishTime: '',
        skillsRequired: [],
        createdBy: `${notification.requesterId}`,
        createdDate: new Date() || null,
        isCompleted: false,
        completedBy: proposal.requesterId,
        completedDate: new Date() || null,
        proposedBy: [],
        acceptedProposal: `${currentUser?.uid}`,
        acceptedDate: new Date(),
        value: 0,
        isCreatedByUser: false,
        notificationId: uuidv4(), // Gerar um ID único para ocampo notificationId
      };

      const newJobRef = doc(collection(db, "jobs"));
      const newJobId = newJobRef.id;
      newJobData.jobId = newJobId; // Atribuir o ID único ao campo jobId
      await setDoc(newJobRef, newJobData);
    } catch (error) {
      console.error("Erro ao enviar a notificação:", error);
    }
  };
 
  // const rejectWorkRequest = async (notification: Notification) => {
  //   try {
  //     const rejectedNotificationId = notification.notificationId;
  
  //     // Obter uma referência para a notificação a ser removida
  //     const notificationRef = doc(db, 'notifications', rejectedNotificationId);
  
  //     // Verificar se a notificação existe antes de tentar removê-la
  //     const docSnapshot = await getDoc(notificationRef);
  
  //     if (docSnapshot.exists()) {
  //       // Remover a notificação
  //       await deleteDoc(notificationRef);
  //       console.log('Notificação removida com sucesso!');
  //     } else {
  //       console.log('Notificação não encontrada.');
  //     }
  
  //     // Enviar uma nova notificação informando que a proposta foi recusada
  //     const rejectionNotification: Notification = {
  //       userId: notification.requesterId,
  //       message: 'Sua proposta foi recusada.',
  //       timestamp: new Date(),
  //       isRead: false,
  //       proposalId: notification.proposalId,
  //       jobId: notification.jobId,
  //       requesterName: users?.displayName || '',
  //       requesterId: users?.uid || '',
  //       requesterPhoto: users?.photoURL || '',
  //       requesterPhoneNumber: users?.phoneNumber || '',
  //       notificationId: uuidv4(),
  //       rightRequest: false,
  //     };
  
  //     const notificationsCollection = collection(db, 'notifications');
  //     await addDoc(notificationsCollection, rejectionNotification);
  
  //     console.log('Notificação enviada com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao remover a notificação:', error);
  //   }
  // };
  
  const deleteNotification = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      const docSnapshot = await getDoc(notificationRef);
  
      if (docSnapshot.exists()) {
        const notificationData = docSnapshot.data() as Notification;
        await deleteDoc(notificationRef);
        console.log("Notification deleted successfully!");
  
        const rejectionNotification: Notification = {
          userId: notificationData.requesterId,
          message: 'Sua proposta foi recusada.',
          timestamp: new Date(),
          isRead: false,
          proposalId: notificationData.proposalId,
          jobId: notificationData.jobId,
          requesterName: users?.displayName || '',
          requesterId: users?.uid || '',
          requesterPhoto: users?.photoURL || '',
          requesterPhoneNumber: users?.phoneNumber || '',
          notificationId: uuidv4(),
          rightRequest: false,
        };
  
        const notificationsCollection = collection(db, 'notifications');
        await addDoc(notificationsCollection, rejectionNotification);
  
        console.log('Notificação enviada com sucesso!');
      } else {
        console.log('Notificação não encontrada.');
      }
    } catch (error) {
      console.error('Erro ao remover a notificação:', error);
    }
  };
  
  
  
  
  
  
  
  return (
    <main>
      <Menu />
      <div className='mt-5 pt-6'>
        <h1>Notifications</h1>
        
        <ul>
          {notifications.map((notification) => (
            <li key={notification.notificationId}>
              {notification.notificationId}
              <p>{notification.message}</p>
              <img src={notification.requesterPhoto} alt="" />
              <p>{notification.requesterId}</p>
              <p>{notification.requesterName}</p>
              {!notification.rightRequest && (
                <>
                  <button onClick={() => sendWorkRequest(notification)}>Aceitar</button>
                  <button onClick={() => deleteNotification(notification.notificationId)}>Apagar</button>



                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Notifications;
