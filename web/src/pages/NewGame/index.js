import React from 'react';

import LogoHeader from '../../components/LogoHeader';

import './styles.scss';

const NewGame = () => {
  return (
    <div className='new-game-container'>
      <LogoHeader />
      <h1>Anunciar um jogo</h1>
      <form className='new-game-form'>
        <div className='game-image-input-container'>
          <label htmlFor=''>Imagem do jogo</label>
          <div className='image-input'>
            <p>Clique aqui</p>
          </div>
        </div>
        <div className='input-container'>
          <label htmlFor=''>Título</label>
          <input type='text' />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Breve descrição</label>
          <textarea cols='30' rows='3'></textarea>
        </div>
        <div className='input-container'>
          <label htmlFor=''>Plataforma</label>
          <select defaultValue={'0'}>
            <option value='0' disabled>
              Selecione uma plataforma
            </option>
            <option value=''>Xbox One</option>
          </select>
        </div>
        <div className='checkbox-container'>
          <input type='checkbox' id='checkbox' />
          <label htmlFor='checkbox'>Usar minha localização</label>
        </div>
        <div className='select-input-container'>
          <div className='input-container'>
            <label htmlFor=''>Estado</label>
            <select defaultValue={'0'}>
              <option value='0' disabled>
                UF
              </option>
              <option value=''>GO</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor=''>Cidade</label>
            <select defaultValue={'0'}>
              <option value='0' disabled>
                Cidade
              </option>
              <option value=''>Senador Canedo</option>
            </select>
          </div>
        </div>
        <div className='checkbox-container'>
          <input type='checkbox' id='checkbox' />
          <label htmlFor='checkbox'>Quero realizar uma troca</label>
        </div>
        <div className='input-container'>
          <label htmlFor=''>Jogo de interesse</label>
          <input type='text' disabled />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Preço</label>
          <input type='text' />
        </div>
        <button type='submit' className='new-game-btn'>
          Anunciar
        </button>
      </form>
    </div>
  );
};

export default NewGame;
