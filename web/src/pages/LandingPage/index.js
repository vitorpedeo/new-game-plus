import React from 'react';
import { Link } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';

import landingImage from '../../assets/landingImage.png';

import './styles.scss';

const LandingPage = () => {
  return (
    <div className='landing-container'>
      <LogoHeader />
      <div className='landing-content'>
        <div className='landing-info'>
          <h1>
            Venda ou troque seus jogos e <span> começe uma nova aventura!</span>{' '}
          </h1>
          <p>
            New Game + é uma marketplace feito de gamer para gamer, com objetivo
            de auxiliar pessoas a encontrarem ou venderem seus jogos.
          </p>
          <div className='landing-links'>
            <Link to='/register'>Começar</Link>
            <Link to='/login'>Entrar</Link>
          </div>
        </div>
        <div className='landing-image'>
          <img src={landingImage} alt='' />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
