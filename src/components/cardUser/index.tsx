import React from 'react';
import './style.scss'

interface cardUser{

}
export const CardUser: React.FC<cardUser> = (props) => {
  return <div className="card cardUser">
    <div className="card-body d-flex">
      <div className='buttons-avatar'>
          <div className="avatar">
           <img src="" alt="" />
          </div>
      </div>
      <div>
        <h5>Daniel Kitanaxi</h5>
        <span>Luanda/Cazenga</span>
        <div>
          <span className="badge me-1">De3e3e3e</span>
          <span className="badge me-1">Darek</span>
          <span className="badge me-1">Darek</span>
          </div>
      </div>
      <div>
        
      </div>
    </div>
  </div>
}
