import React from 'react';
import { Notification } from '../components/notification';
export const Template: React.FC = () => {
  return <main className='mt-5 pt-5 mb-5 pb-5'>
    <section>
      <div className="container">
        <div className="row justify-content-center">
        <div className="col-lg-7">
          <Notification textarea={'Sua proposta foi aceita para o trabalho.'} link={undefined} data={'02/67/9988'} title={'Proposta aceite'}/>
          <Notification textarea={'Você tem uma nova proposta na sua publicação.'} link={undefined} data={'02/67/9988'} title={'Nova proposta'}/>
          <Notification textarea={'Olá! Você recebeu uma solicitação de serviço de um cliente. Confira os detalhes da solicitação e avalie se você está disponível para realizar o trabalho. Fique à vontade para entrar em contato com o cliente para discutir mais detalhes, se necessário.'} link={undefined} data={'02/67/9988'} title={'Solicitacao de trabalho'}/>
        </div>
        </div>
      </div>
    </section>
  </main>
}