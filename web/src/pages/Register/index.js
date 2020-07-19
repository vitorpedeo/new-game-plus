import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../../context/UserContext';
import api from '../../utils/api';

import { successToast, errorToast } from '../../utils/toasts';

import AvatarInput from '../../components/AvatarInput';
import LogoHeader from '../../components/LogoHeader';

import './styles.scss';

const Register = () => {
  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('0');

  const { avatar } = useContext(UserContext);
  const [name, setName] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      )
      .then((res) => {
        const ufs = res.data;

        const ufsInitial = ufs.map((uf) => uf.sigla);

        setUfs(ufsInitial);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`
      )
      .then((res) => {
        const cities = res.data;

        const citiesName = cities.map((city) => city.nome);

        setCities(citiesName);
      })
      .catch((err) => console.log(err));
  }, [selectedUf]);

  const handleRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('avatar', avatar);
    formData.append('name', name);
    formData.append('whatsApp', whatsApp);
    formData.append('uf', selectedUf);
    formData.append('city', selectedCity);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await api.post('auth/sign-up', formData);

      successToast(res.data.message);

      history.push('/login');
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
    <div className='register-container'>
      <LogoHeader />
      <h1>Criar conta</h1>
      <form className='register-form' onSubmit={handleRegistration}>
        <AvatarInput />
        <div className='input-container'>
          <label htmlFor=''>Nome</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>WhatsApp</label>
          <input
            type='text'
            value={whatsApp}
            onChange={(e) => setWhatsApp(e.target.value)}
          />
        </div>
        <div className='select-input-container'>
          <div className='input-container'>
            <label htmlFor=''>Estado</label>
            <select
              value={selectedUf}
              onChange={(e) => setSelectedUf(e.target.value)}
            >
              <option value='0' disabled>
                UF
              </option>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor=''>Cidade</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value='0' disabled>
                Cidade
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
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

        <button className='submit-btn' type='submit'>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
