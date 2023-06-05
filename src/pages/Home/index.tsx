import React from 'react';

import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";

import './style.scss'


import img1 from '../../asset/img/img1.png';
import img2 from '../../asset/img/img2.png';
import img3 from '../../asset/img/img3.png';
import logo from '../../asset/vector/logo.svg';

// import { Link } from 'react-router-dom';
import logoText from '../../asset/vector/logo_text.svg';

const Home: React.FC = () => {
  return <>
  <nav className="navbar navbar-light bg-white pt-3 pb-3 border-bottom fixed-top">
      <div className="container">
        <a href="/"><img src={logoText} width="100"/></a>
        <div className="d-flex">
          <a href="/alert" className="btn btn-light bg-white border-0 pt-3">Entrar</a>
        </div>
      </div>
    </nav>
    <div className='home'>
    <div className="h-100 d-flex align-items-center">
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
        <div className="mt-5 pt-5">
          <h1 className="display-4">Conectando quem precisa com quem sabe fazer</h1>
          <h5 className="opacity-50">Fale o que precisa, receba até 10 orçamentos e escolha o melhor.</h5 >
          <button type="button" className="btn btn-primary pe-4 mt-3 ps-4">Saber mais</button>
        </div>
        </div>
        <div className="col-md-6 d-flex align-items-center">
        <img src={img1} className="img-fluid mt-5"/>
        </div>
      </div>
    </div>
    </div>
    <div className='div-text-cards'>
      <div className="bg-green pt-100 pb-180">
        <div className="container text-center">
        <h2>O que é o biscato?</h2>
        <h5 className="mt-3">Biscato é a maior plataforma de contratação de serviços de Angola. Conectamos Profissionais de toda a Angola com pessoas solicitando serviço, atendendo com qualidade, facilidade e rapidez todos os tipos de necessidade.</h5>
        </div>
      </div>
      <div className="container mt-n100">
        <div className="row">
          <div className="col-sm-4 mb-5">
            <div className="card border-0">
              <div className="card-body p-20">
                <img src={logo} alt="" width={50} className="mb-4"/>
                <h4><b>Faça o seu pedido</b></h4>
                Fale o que você precisa. <br /> É rápido e de graça!
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-5">
            <div className="card border-0">
              <div className="card-body p-20">
                <img src={logo} alt="" width={50} className="mb-4"/>
                <h4><b>Receba até 10 orçamentos</b></h4>
                Profissionais avaliados entram em contato com você em instantes!
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-5">
            <div className="card border-0">
              <div className="card-body p-20">
                <img src={logo} alt="" width={50} className="mb-4"/>
                <h4><b>Escolha o melhor</b></h4>
                Negocie direto com eles. Fácil como nunca foi antes!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="h-100 d-flex align-items-center">
    <div className="container">
      <div className="row">
        <div className="col-sm-5 d-flex align-items-center mb-5">
        <img src={img2} className="img-fluid"/>
        </div>
        <div className="col-sm-5 d-flex align-items-center mb-5">
          <div>
          <h1>Por que deves usar o biscato</h1>
          <h5 className='mt-4'>Sem custo até você contratar</h5>
          O potencial de entrevista se encaixa no seu trabalho, negocie taxas e pague apenas pelo trabalho que você aprovar.
          <h5 className='mt-4'>Seguro e protegido</h5>
          Concentre-se em seu trabalho sabendo que ajudamos a proteger seus dados e privacidade. Estamos aqui com suporte 24 horas por dia, 7 dias por semana, se você precisar.
          </div>
        </div>
      </div>
    </div>
    </div>
    <div className="bg-black h-100 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mb-5 d-flex align-items-center">
            <div>
              <h1>Encontre um ótimo profissional</h1>
              <p>Conheça profissional com os quais você está animado para trabalhar e leve sua carreira ou negócios a novos patamares.</p>
              <button type="button" className="btn btn-light mt-4">Encontrar Profissional</button>
            </div>
          </div>
          <div className="col-sm-6 d-flex mb-5 align-items-center">
          <img src={img3} className="img-fluid"/>
          </div>
        </div>
      </div>
    </div>
    <div className="container text-center pt-100 pb-100">
    <h2 className="mb-5">Como o biscato funciona para o Profissional?</h2>
    <div className="row mt-5 justify-content-center">
      <div className="col-sm-3">
        <div className="card-body p-2">
          <img src={logo} alt="" width={50} className="mb-4"/>
          <p>Pedidos de serviços chegando toda hora no seu celular ou computador.</p>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card-body p-2">
          <img src={logo} alt="" width={50} className="mb-4"/>
          <p>Veja todos os pedidos de graça, e invista apenas nos que gostar.</p>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card-body p-2">
          <img src={logo} alt="" width={50} className="mb-4"/>
          <p>95% do valor do serviço é seu. E sem mensalidade!</p>
        </div>
      </div>
    </div>
    </div>
  </div>
  <footer className='border-top'>
    <div className="container">
      <div className="row">
        <div className="col-lg-2 text-center pb-3">
          <a href="https://www.facebook.com/Biscato-109372028547022" className='me-3 link-icon-reds' target="_blank" rel="noreferrer">
            <FaFacebookF/>
          </a>
          <a href="https://www.linkedin.com/company/biscato" className='me-3 link-icon-reds' target="_blank" rel="noreferrer">
            <FaLinkedinIn/>
          </a>
          <a href="https://www.youtube.com/channel/UCdQxe8pzeVWHiHKsSOiI_GA" className='me-3 link-icon-reds' target="_blank" rel="noreferrer">
            <FaYoutube/>
          </a>
        </div>
        <div className="col-lg-10 pb-3 text-right opacity-50">
        Copyright © 2023 biscato. All rights reserved.
        </div>
      </div>
    </div>
    <div>        
    </div>
  </footer>
  </>
}
export default Home;