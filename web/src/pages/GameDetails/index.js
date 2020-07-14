import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';

import LogoHeader from '../../components/LogoHeader';

import './styles.scss';

const GameDetails = () => {
  return (
    <div className='game-detail-container'>
      <LogoHeader />
      <div className='game-detail-content'>
        <Link to='/user/search' className='back-search'>
          <FaArrowLeft size={35} /> <p>Voltar</p>
        </Link>
        <div className='game-detail-image'>
          <img
            src='https://store-images.s-microsoft.com/image/apps.43376.65636291532456667.5893b5ba-43c6-42b7-afce-10638cd992d8.1f1dc21e-bc18-40e0-9394-e8fd6f4a85d2?mode=scale&q=90&h=1080&w=1920'
            alt=''
          />
        </div>
        <div className='game-detail-info'>
          <h1>Metal Gear Solid V: Phantom Pain</h1>
          <p className='game-desc'>Versão Day One, sem nenhum detalhe.</p>
          <p className='game-platform' style={{ color: '#0a549c' }}>
            Playstation 4
          </p>
          <p className='game-announcer'>Anunciado por Lionel Messi</p>
          <p className='game-value'>
            Interesse <span>Fallout 4</span>
          </p>

          <button type='button'>
            Mensagem <FaWhatsapp size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
