import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import LogoHeader from '../../components/LogoHeader';

import './styles.scss';

const Search = () => {
  return (
    <div className='search-container'>
      <LogoHeader />

      <div className='main-search-content'>
        <div className='search-options'>
          <input type='text' placeholder='Nome do jogo' />
          <div className='search-select-input'>
            <select defaultValue={'0'}>
              <option value='0' disabled>
                UF
              </option>
              <option value=''>GO</option>
            </select>
            <select defaultValue={'0'}>
              <option value='0' disabled>
                Cidade
              </option>
              <option value=''>Senador Canedo</option>
            </select>
          </div>
          <Link to='/user/home' className='back-home'>
            <FaArrowLeft size={35} /> <p>Voltar</p>
          </Link>
        </div>
        <div className='search-results'>
          <div className='game-result-card'>
            <div className='game-result-image'>
              <img
                src='https://observatoriodegames.uol.com.br/wp-content/uploads/2020/07/watch-dogs-2.jpg'
                alt=''
              />
            </div>
            <div className='game-result-info'>
              <div className='game-result-label'>
                <p>Nome</p>
                <span>Watch Dogs 2</span>
              </div>
              <div className='game-result-label'>
                <p>Plataforma</p>
                <span style={{ color: '#007e00' }}>Xbox One</span>
              </div>
              <div className='game-result-label'>
                <p>Preço</p>
                <span>R$40,00</span>
              </div>
            </div>
          </div>
          <div className='game-result-card'>
            <div className='game-result-image'>
              <img
                src='https://store.nintendo.com.br/media/catalog/product/cache/1aff59ff6f21b2058ac5563c018426d7/s/p/splatoon2_hero_1_1.jpg'
                alt=''
              />
            </div>
            <div className='game-result-info'>
              <div className='game-result-label'>
                <p>Nome</p>
                <span>Splatoon 2</span>
              </div>
              <div className='game-result-label'>
                <p>Plataforma</p>
                <span style={{ color: '#e70012' }}>Switch</span>
              </div>
              <div className='game-result-label'>
                <p>Interesse</p>
                <span>Super Mario Odyssey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
