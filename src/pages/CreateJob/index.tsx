import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../../key';
import { Post } from '../../interface';

const CreateJob: React.FC = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const postsCollection = collection(db, 'requests');

  const addPost = async (newPostData: Post) => {
    try {
      const docRef = await addDoc(postsCollection, newPostData);
      console.log('Post adicionado com sucesso! ID do documento:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar o post:', error);
    }
  };

  const handleClick = () => {
    const newPost: Post = {
      id: '22222',
      title: 'Serviço de Doméstica',
      description: 'Olá! Estou procurando uma profissional de limpeza doméstica para minha residência. Preciso de alguém que possa realizar tarefas como lavar e engomar roupas. Estou disposta a pagar até 300 mil por mês pelo serviço. A pessoa deve ter experiência na área e ser responsável. Caso tenha interesse ou conheça alguém que se encaixe nesse perfil, por favor, entre em contato. Obrigada!',
      user_id: '',
      date: '20/02/2023',
      time: '12:30',
      location: 'Luanda / Cazenga',
      details: '',
      value: 300000,
      skill: ['lavadeira', 'engomadeira'],
      publish_date: new Date().toLocaleDateString(),
      publish_time: new Date().toLocaleTimeString()
    };
    

    addPost(newPost);
  };

  return (
    <button onClick={handleClick}>Publicar</button>
  );
};

export default CreateJob;
