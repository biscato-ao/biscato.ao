import React from 'react';
import './style.scss'

interface InputForm {
  title: string
  type: string,
  placeholder: string,
  icon: any,
  value: any,
  onChange: any,
  rows: number
}

export const InputForm: React.FC <InputForm> = (props) => {
  return <div className='inputForm'>
    <div className='label'><span>{props.title}</span></div>
    <div className='input-group'>
      <input type={props.type} className='form-control' placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
      <span className='pe-2 ps-2'>
        {props.icon}
      </span> 
    </div>
  </div>
}

export const InputFormTextArea: React.FC <InputForm> = (props) => {
  return <div className='inputForm'>
    <div className='label'><span>Titilo do trabalho</span></div>
    <div className='input-group'>
      <textarea className='form-control' placeholder={props.placeholder} value={props.value} onChange={props.onChange} rows={props.rows}/>
      <span className='pe-2 ps-2'>
        {props.icon}
      </span> 
    </div>
  </div>
}

