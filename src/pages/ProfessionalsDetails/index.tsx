import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../key";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { UserInfo, Notification } from "../../interface";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

const UserDetails: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const { id } = useParams();
  const userId = id ?? "";
  const auth = getAuth(firebaseApp);
  const currentUser = auth.currentUser;

  const [user] = useAuthState(auth);
  const userAut = useAuthState(auth);
  const [users, setUsers] = useState<any>(null);
  const uid = auth.currentUser?.uid;
  const db = getFirestore();

  useEffect(() => {
    const getUsers = async () => {
      if (uid) {
        try {
          const userDoc = doc(db, "users", uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const users = docSnapshot.data();
            console.log("Dados do usuário:", users);
            setUsers(users);
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
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(firestore, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else if (userDocSnap === undefined) {
          console.log("Não existe um ID");
        } else {
          console.log("Usuário não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <p>Carregando dados do usuário...</p>;
  }

  const sendWorkRequest = async (userId: string) => {
    const uid = userId;
    const lastRequestTime = localStorage.getItem(`lastRequestTime_${uid}`);
  
    // if (lastRequestTime) {
    //   const twentyFourHours = 24 * 60 * 60 * 1000;
    //   const currentTime = new Date().getTime();
    //   const lastRequestTimestamp = parseInt(lastRequestTime, 10);
  
    //   if (currentTime - lastRequestTimestamp < twentyFourHours) {
    //     console.log("Aguarde 24 horas antes de enviar uma nova solicitação.");
    //     return;
    //   }
    // }
  
    if (userId) {
      const notification: Notification = {
        userId,
        message:
          "Olá! Você recebeu uma solicitação de serviço de um cliente. Confira os detalhes da solicitação e avalie se você está disponível para realizar o trabalho. Fique à vontade para entrar em contato com o cliente para discutir mais detalhes, se necessário.",
        timestamp: new Date(),
        isRead: false,
        proposalId: "",
        jobId: "",
        requesterName: currentUser?.displayName,
        requesterId: currentUser?.uid,
        requesterPhoto: currentUser?.photoURL,
        requesterPhoneNumber: currentUser?.phoneNumber,
        notificationId: "", // Será definido após adicionar o documento
        rightRequest: false,
      };
  
      try {
        const notificationsCollection = collection(firestore, "notifications");
        const newNotificationRef = await addDoc(notificationsCollection, notification);
        const newNotificationId = newNotificationRef.id;
  
        console.log("ID da nova notificação:", newNotificationId);
  
        // Atualizar a notificação com o ID gerado
        const updatedNotification: Notification = {
          ...notification,
          notificationId: newNotificationId
        };
  
        // Atualizar o documento da notificação com o ID gerado
        await setDoc(newNotificationRef, updatedNotification);
  
        localStorage.setItem(
          `lastRequestTime_${uid}`,
          new Date().getTime().toString()
        );
  
        console.log("Notificação enviada com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar a notificação:", error);
      }
    } else {
      console.log("ID do usuário não está definido");
    }
  };
  

  console.log("O ID", userData.uid);
  return (
    <div>
      <h2>Dados do Usuário</h2>
      <p>Nome: {userData.location}</p>
      <p>Email: {userData.email}</p>
      {users?.isActive !== false ? (
        <button onClick={() => sendWorkRequest(userData.uid)}>
          Enviar pedido de serviço
        </button>
      ) : null}
    </div>
  );
};

export default UserDetails;
