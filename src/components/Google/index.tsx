import React from 'react';
import google from './../../asset/vector/google.svg'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../../key';
import { UserInfo } from '../../interface';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss'

export const Google: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleSignIn = () => {
    signInWithGoogle();
  };
  
  const navigate = useNavigate();
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const usersCollection = collection(db, 'users');
  
  const addUser = async (newUserData: UserInfo) => {
    try {
      const docRef = await setDoc(doc(usersCollection, newUserData.uid), newUserData);
      console.log('Usuário adicionado com sucesso! ID do documento:', docRef);
    } catch (error) {
      console.error('Erro ao adicionar o usuário:', error);
    }
  };
  
  if (user) {
    // Salva o ID do usuário no localStorage para uso posterior
    localStorage.setItem('user', JSON.stringify(user.user.uid));
  
    // Cria um objeto com os dados do usuário a serem enviados para a coleção
    const newUserData: UserInfo = {
      uid: user.user.uid,
      displayName: user.user.displayName,
      email: user.user.email,
      phoneNumber: user.user.phoneNumber,
      photoURL: user.user.photoURL,
      providerId: '',
      skills: [],
      status: '',
      location: '',
      utolaCode: '',
      verified: false,
      about: '',
      username: '',
      clients: [],
      coverPhotoURL: null,
      isActive: false
    };
  
    // Chama a função para adicionar o usuário à coleção no Firebase
    addUser(newUserData);
  
    toast.success('Você fez login com o Google!');
    navigate('/dashboard');
  }
  
  if (error) {
    toast.error('Erro ao fazer login. Por favor, tente novamente.');
  }
  

  return <div className='input-group-google input-group'>
    <div className='input-group-text'><img src={google} alt="" /></div>
    <button className='form-control' onClick={handleSignIn}>Google</button>
  <ToastContainer />
</div> 
}