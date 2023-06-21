import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from "../components/pageLoader";

interface AuthRouteProps {
  children: React.ReactNode;
}
const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);
  if (loading) {
    return <PageLoader/>
  }
  return <>{children}</>;
}
export default AuthRoute;
