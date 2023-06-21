import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/menu';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { Notification } from "../../interface";
import { auth } from '../../services/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';


const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const db = getFirestore();
  const [user] = useAuthState(auth);
  const userId = user?.uid

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
              </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Notifications;
