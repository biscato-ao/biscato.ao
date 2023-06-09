import React, { useState } from 'react';
import logo from './../../asset/vector/logo.svg'
import google from './../../asset/vector/google.svg'
import './style.scss'
import { HiOutlinePhone, HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
                <input type="number" className='form-control' name="" id="" value={phone} onChange={handlePhoneChange} placeholder='Número de celular'/>
              </div>
              <div className="text-border mb-3 mt-3 d-flex justify-content-center">
                <span className="text">ou</span>
              </div>
              <div className='input-group border mb-3'>
                <span className='input-group-text'>
                  <HiOutlineUser/>
                </span>
                <input type="email" className='form-control' name="" id="" placeholder='Email'/>
              </div>

              <div className='input-group border mb-3'>
                <span className='input-group-text'>
                  <HiOutlineLockClosed/>
                </span>
                <input type="password" className='form-control' name="" id="" placeholder='Senha' />
              </div>
              <Link className='a-link' to="r">Esqueceu sua senha?</Link>
              <button className='btn btn-primary mt-3 mb-3'>Entrar</button>
              <button className='btn btn-light'><img src={google} alt="" />oogle</button>

              <div className='mt-5 text-center'>
               Não tenho uma conta? <Link className='a-link' to="/register">Criar conta</Link>.
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  </>
}

export default Login;