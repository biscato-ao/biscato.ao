import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';

// import { Container } from './styles';

export const loginGosogle: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const handleSignIn = () => {
    signInWithGoogle(); // Chama a função para fazer login com o Google
  };
  return <button onClick={handleSignIn}>ddd</button>
}

