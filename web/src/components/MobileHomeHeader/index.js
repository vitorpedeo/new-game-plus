import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const MobileHomeHeader = ({ userName, userAvatar, logout }) => {
  return (
    <>
      <div className='mobile-header'>
        <div className='mobile-profile-pic'>
          <img src={`http://localhost:5000/${userAvatar}`} alt='' />
        </div>
        <p>Olá, {userName}!</p>

        <div
          className='hamburguer'
          onClick={() =>
            document.getElementById('mobile-menu').classList.toggle('active')
          }
        >
          <div className='line'></div>
        </div>
      </div>

      <div className='mobile-menu' id='mobile-menu'>
        <ul>
          <li>
            <Link to='/user/search'>Procurar jogos</Link>{' '}
          </li>
          <li>
            <Link to='/user/new-game'>Anunciar um jogo</Link>{' '}
          </li>
          <li onClick={logout}>Sair</li>
        </ul>
      </div>
    </>
  );
};

export default MobileHomeHeader;
