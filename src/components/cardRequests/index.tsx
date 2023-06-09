import React from 'react';
import './style.scss'
import logo from './../../asset/vector/logo.svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { HiLocationMarker, HiBookmark } from "react-icons/hi";
import { Link } from 'react-router-dom';


interface cardRequestsInter {
  title: string; // Título do post
  description: string; // Descrição do post
  date: string; // Data do post (formato string)
  location: string; // Localização do post
  details: string; // Detalhes do post
  value: number; // Valor do post
  skill: string[]
  publish_date: string; // Data de publicação do post (formato string)
  publish_time: string; // Hora de publicação do post (formato string)
}

export const CardRequests: React.FC<cardRequestsInter> = (props) => {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Saber mais
    </Tooltip>
  );
  const renderTooltip2 = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Guardar publicação
    </Tooltip>
  );

  return <div className="card border card-requests">
    <div className="card-header justify-content-between d-flex">
    <div>
    <h5><b>{props.title}</b></h5>
    <span><HiLocationMarker/> {props.location} - Postado {props.publish_time} de {props.publish_date}</span>
    </div>
    <div className='ps-3'>
    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip2}
    >
    <Link to="/" className='guardar'>
      <HiBookmark/>
    </Link>
    </OverlayTrigger>
    </div>
  </div>
  <div className='card-body pt-0 pb-0'>
  <div>
  {Array.isArray(props.skill) && props.skill.map((skill: string, index: number) => (
    <span className="badge me-2" key={index}>{skill}</span>
  ))}
</div>

  </div>
    <div className="card-body">
    {props.description.length > 230 ? `${props.description.slice(0, 230)}...` : props.description}
    <h6 className='mt-3'>Valor a pagar: <b>{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'AOA' }).format(props.value).replace('AOA', 'Kz')}</b></h6>
    </div>
    <div className="card-footer pt-0 d-flex justify-content-between">
    <div>
      propostas: <b>10</b>
    </div>
    <div>
    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Link to="/" className='shadow-sm'>
        <img src={logo} alt="" />
      </Link>
    </OverlayTrigger>
    </div>
  </div>
  </div>
}