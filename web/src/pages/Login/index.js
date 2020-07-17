import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../utils/api';
import { successToast, errorToast } from '../../utils/toasts';

import LogoHeader from '../../components/LogoHeader';

import xboxLogo from '../../assets/consoles/xbox.png';
import playstationLogo from '../../assets/consoles/playstation.png';
import switchLogo from '../../assets/consoles/switch.png';

import './styles.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const res = await api.post('auth/sign-in', data);
      const message = res.data.message;
      const metadata = res.data.metadata;

      localStorage.setItem('token', metadata.token);

      successToast(message);

      history.push('/user/home');
    } catch (error) {
      const errorMessages = error.response.data.data
        ? error.response.data.data.errors
        : error.response.data.message;

      Array.isArray(errorMessages)
        ? errorMessages.forEach((message) => errorToast(message))
        : errorToast(errorMessages);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form-container'>
        <LogoHeader />
        <div className='one-more-container'>
          <form className='login-form' onSubmit={handleLogin}>
            <h2>Login</h2>

            <div className='input-container'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='input-container'>
              <label htmlFor=''>Senha</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='checkbox-container'>
              <input type='checkbox' id='checkbox' />
              <label htmlFor='checkbox'>Me manter conectado</label>
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
