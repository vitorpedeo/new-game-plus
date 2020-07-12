import React from 'react';
import { Link } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';

import xboxLogo from '../../assets/consoles/xbox.png';
import playstationLogo from '../../assets/consoles/playstation.png';
import switchLogo from '../../assets/consoles/switch.png';

import './styles.scss';

const Login = () => {
  return (
    <div className='login-container'>
      <div className='login-form-container'>
        <LogoHeader />
        <div className='one-more-container'>
          <form className='login-form'>
            <h2>Login</h2>

            <div className='input-container'>
              <label htmlFor=''>Email</label>
              <input type='email' />
            </div>

            <div className='input-container'>
              <label htmlFor=''>Senha</label>
              <input type='password' />
            </div>

            <div className='checkbox-container'>
              <input type='checkbox' />
              <label htmlFor=''>Me manter conectado</label>
            </div>

            <button type='submit'>Entrar</button>
          </form>
          <p>
            Ainda não tem uma conta? <Link to='/register'>Cadastrar agora</Link>
          </p>
        </div>
      </div>
      <div className='login-info-container'>
        <div className='login-info'>
          <h1>Seu próximo jogo está te esperando!</h1>
          <p>
            Vários jogos das principais plataformas estão disponíveis para venda
            ou troca. Confira agora!
          </p>
          <div className='consoles-logo'>
            <img src={xboxLogo} alt='' />
            <img src={playstationLogo} alt='' />
            <img src={switchLogo} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
