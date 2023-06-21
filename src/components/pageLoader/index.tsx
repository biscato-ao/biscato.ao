import React from 'react';
import './style.scss'
import BounceLoader from "react-spinners/BounceLoader";

export const PageLoader: React.FC = () => {

  return <main className='d-flex pageLoader justify-content-center align-items-center'>
    <section>
      <div className="container d-flex  justify-content-center align-items-center">
      <BounceLoader
        size={30}
        color="#4E9F3D"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </section>
  </main>
}