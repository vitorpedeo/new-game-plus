import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

import LogoHeader from '../../components/LogoHeader';

import './styles.scss';

const Register = () => {
  return (
    <div className='register-container'>
      <LogoHeader />
      <h1>Criar conta</h1>
      <form className='register-form'>
        <div className='avatar-input-container'>
          <label htmlFor=''>Imagem do Perfil</label>
          <div className='avatar'>
            <FaUserAlt color='#fff' size={60} className='avatar-icon' />
          </div>
        </div>
        <div className='input-container'>
          <label htmlFor=''>Nome</label>
          <input type='text' />
        </div>
        <div className='input-container'>
          <label htmlFor=''>WhatsApp</label>
          <input type='text' />
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
        <div className='input-container'>
          <label htmlFor=''>Email</label>
          <input type='email' />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Senha</label>
          <input type='password' />
        </div>

        <button className='submit-btn' type='submit'>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
