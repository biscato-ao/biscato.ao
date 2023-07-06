import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/menu';
import { getFirestore, collection, onSnapshot, query, where, doc, getDoc, updateDoc, Firestore, setDoc, addDoc } from 'firebase/firestore';
import { Job, Notification } from "../../interface";
import { auth } from '../../services/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from "uuid";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const db = getFirestore();
  const [user] = useAuthState(auth);
  const userId = user?.uid;
  const job: Job = {
    jobId: '',
    title: '',
    description: '',
    location: '',
    publishDate: new Date(),
    publishTime: '',
    skillsRequired: [] ,
    createdBy: '',
    createdDate: new Date(),
    isCompleted: false,
    completedBy: null,
    completedDate: null,
    proposedBy: [],
    acceptedProposal: '',
    acceptedDate: new Date(),
    value: 0,
    notificationId: undefined,
    isCreatedByUser: false,
  };

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

  const sendWorkRequest = async () => {
    try {
      const jobCollectionRef = collection(db, 'jobs');

      // Cria um novo documento na coleção "jobs" com um ID gerado automaticamente
      const jobDocRef = await addDoc(jobCollectionRef, {
        title: job.title,
        description: job.description,
        location: job.location,
        publishDate: job.publishDate,
        publishTime: job.publishTime,
        skillsRequired: job.skillsRequired,
        createdBy: '',
        createdDate: job.createdDate,
        isCompleted: false,
        completedBy: 'proposal.userId',
        completedDate: new Date() || null,
        proposedBy: [],
        acceptedProposal: 'proposal.jobId',
        acceptedDate: new Date(),
        value: job.value,
        isCreatedByUser: false,
        notificationId: uuidv4(), // Gera um ID único com a função uuidv4()
      });

      // Recupera o ID gerado automaticamente para o documento
      const jobId = jobDocRef.id;

      // Restante do código...

      console.log('Proposta aceita com sucesso:');
    } catch (error) {
      console.error('Erro ao aceitar a proposta:', error);
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
              <p>{notification.message}</p>
              <p>{notification.contactInfo}</p>
              {!notification.rightRequest && (
                <>
                  <button onClick={sendWorkRequest}>Aceitar</button>
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
