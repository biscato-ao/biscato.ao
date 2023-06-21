import React, { useState } from 'react';
import logo from './../../asset/vector/logo.svg'

import './style.scss'
import { HiOutlinePhone, HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';
import { Google } from '../../components/Google';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageLoader } from '../../components/pageLoader';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const handlePhoneChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    if (value.length <= 9) {
      setPhone(value);
    }
  };
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Ir para a página inicial
    </Tooltip>
  );
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLocal = localStorage.getItem('user')
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
 
  if (error) {
    toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
  }
  if (loading) {
    toast.info('Realizando login...');
  }
  if (user) {
    toast.success('Login realizado com sucesso!');
    localStorage.setItem ('user', JSON.stringify(user.user.uid))
    navigate('/dashboard');
  }

  if(userLocal !== null){
    window.location.href = ('/dashboard')
    return <PageLoader/>   
  }

  return <>
    <section className='p-4 pb-5 d-flex justify-content-center align-items-center'>
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3">
              <div className='text-img text-center mt-5 pb-4'>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Link to="/dashboard">
                <img src={logo} alt="" className='mb-3'/>
                </Link>
              </OverlayTrigger>
                <h4>Entrar no Biscato</h4>
              </div>
              <div className='input-group border mb-3'>
                <span className='input-group-text'>
                  <HiOutlinePhone/>
                </span>
                <input type="number" className='form-control' name="" id="" value={phone} onChange={handlePhoneChange} placeholder='Número de celular' required/>
              </div>
              <div className="text-border mb-3 mt-3 d-flex justify-content-center">
                <span className="text">ou</span>
              </div>
              <div className='input-group border mb-3'>
                <span className='input-group-text'>
                  <HiOutlineUser/>
                </span>
                <input 
                type="email" 
                className='form-control' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required/>
              </div>

              <div className='input-group border mb-3'>
                <span className='input-group-text'>
                  <HiOutlineLockClosed/>
                </span>
                <input 
                type="password" 
                className='form-control' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Senha' 
                required/>
              </div>
              <Link className='a-link' to="r">Esqueceu sua senha?</Link>
              <button className='btn btn-primary mt-3 mb-3' onClick={() => signInWithEmailAndPassword(email, password)}>Entrar</button>
              <Google/>
              <div className='mt-5 text-center'>
               Não tenho uma conta? <Link className='a-link' to="/register">Criar conta</Link>.
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
    <ToastContainer />
  </>
}

export default Login;