import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { FaPowerOff, FaPencilAlt, FaTrash } from 'react-icons/fa';

import LogoHeader from '../../components/LogoHeader';

import './styles.scss';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='user-panel-container'>
        <LogoHeader />
        <div className='user-panel'>
          <div className='profile-pic-container'>
            <div className='profile-pic'>
              <img
                src='https://exame.com/wp-content/uploads/2020/06/cristiano-ronaldo-juventus.jpg'
                alt=''
              />
            </div>
            <p>Seja bem vindo, Cristiano!</p>
          </div>
          <div className='navigate-links'>
            <Link to='/user/search' className='home-link'>
              <p>Procurar jogos</p>
              <div className='link-icon'>
                <FiSearch size={30} />
              </div>
            </Link>
            <Link to='' className='home-link'>
              <p>Anunciar um jogo</p>
              <div className='link-icon'>
                <FiPlus size={30} />
              </div>
            </Link>
          </div>
          <button type='button' className='logout'>
            <div className='power-off'>
              <FaPowerOff color='#fff' size={32} />
            </div>
            <p>Sair</p>
          </button>
        </div>
      </div>
      <div className='games-announced'>
        <h1>Meus jogos anunciados</h1>
        <div className='games-container'>
          <div className='game-card'>
            <div className='game-image'>
              <img
                src='https://vgbr.com/wp-content/uploads/2019/06/images-22.jpeg'
                alt=''
              />
            </div>
            <div className='game-info'>
              <div className='game-name-label'>
                <p>Nome</p>
                <span>The Witcher 3</span>
              </div>
              <div className='game-platform-label'>
                <p>Plataforma</p>
                <span style={{ color: '#007E00' }}>Xbox One</span>
              </div>
            </div>
            <div className='game-edit-delete'>
              <div className='edit-btn'>
                <FaPencilAlt color='#fff' size={32} />
              </div>
              <div className='delete-btn'>
                <FaTrash color='#fff' size={32} />
              </div>
            </div>
          </div>
          <div className='game-card'>
            <div className='game-image'>
              <img
                src='https://miro.medium.com/max/2560/1*UA52nS36ni6EpiD7BhfQkg.jpeg'
                alt=''
              />
            </div>
            <div className='game-info'>
              <div className='game-name-label'>
                <p>Nome</p>
                <span>The Last of Us Part II</span>
              </div>
              <div className='game-platform-label'>
                <p>Plataforma</p>
                <span style={{ color: '#0A549C' }}>Playstation 4</span>
              </div>
            </div>
            <div className='game-edit-delete'>
              <div className='edit-btn'>
                <FaPencilAlt color='#fff' size={32} />
              </div>
              <div className='delete-btn'>
                <FaTrash color='#fff' size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
