import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../../context/UserContext';

import AvatarInput from '../../components/AvatarInput';
import LogoHeader from '../../components/LogoHeader';

import './styles.scss';

const Register = () => {
  const { avatar } = useContext(UserContext);
  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('0');

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

  return (
    <div className='register-container'>
      <LogoHeader />
      <h1>Criar conta</h1>
      <form className='register-form'>
        <AvatarInput />
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
