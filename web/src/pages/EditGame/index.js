import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import api from '../../utils/api';
import { getCookie } from '../../utils/cookies';
import { GameContext } from '../../context/GameContext';

import LogoHeader from '../../components/LogoHeader';
import GameInputImage from '../../components/GameImageInput';
import { successToast, errorToast } from '../../utils/toasts';

import './styles.scss';

const NewGame = () => {
  const { id } = useParams();

  const { image } = useContext(GameContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('0');
  const [useMyLocalization, setUseMyLocalization] = useState(false);
  const [isTradeable, setIsTradeable] = useState(false);
  const [wantedGame, setWantedGame] = useState('');
  const [price, setPrice] = useState('');

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);

  const history = useHistory();

  const token = getCookie('token');

  useEffect(() => {
    api
      .get(`game/show-mine/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        const { title, description, platform } = data;

        setTitle(title);
        setDescription(description);
        setPlatform(platform);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  useEffect(() => {
    axios
      .get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      )
      .then((res) => {
        const ufsInitials = res.data.map((uf) => uf.sigla);

        setUfs(ufsInitials);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`
      )
      .then((res) => {
        const citiesName = res.data.map((city) => city.nome);

        setCities(citiesName);
      })
      .catch((err) => console.log(err));
  }, [selectedUf]);

  const handleEditGame = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('platform', platform);
    formData.append('useMyLocalization', useMyLocalization);
    formData.append('uf', selectedUf);
    formData.append('city', selectedCity);
    formData.append('isTradeable', isTradeable);
    formData.append('wantedGame', wantedGame);
    formData.append('price', price);

    try {
      const res = await api.put(`game/update/${id}`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const successMessage = res.data.message;

      successToast(successMessage);

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
    <div className='new-game-container'>
      <LogoHeader />
      <h1>Editar meu anúncio</h1>
      <form className='new-game-form' onSubmit={handleEditGame}>
        <GameInputImage />
        <div className='input-container'>
          <label htmlFor=''>Título</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Breve descrição</label>
          <textarea
            cols='30'
            rows='3'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className='input-container'>
          <label htmlFor=''>Plataforma</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value='0' disabled>
              Selecione uma plataforma
            </option>
            <option value='Xbox 360'>Xbox 360</option>
            <option value='Xbox One'>Xbox One</option>
            <option value='Xbox Series X'>Xbox Series X</option>
            <option value='Playstation 3'>Playstation 3</option>
            <option value='Playstation 4'>Playstation 4</option>
            <option value='Playstation 5'>Playstation 5</option>
            <option value='Nintendo Switch'>Nintendo Switch</option>
          </select>
        </div>
        <div className='checkbox-container'>
          <input
            type='checkbox'
            id='checkbox'
            value={useMyLocalization}
            onChange={() => setUseMyLocalization(!useMyLocalization)}
          />
          <label htmlFor='checkbox'>Usar minha localização</label>
        </div>
        <div className='select-input-container'>
          <div className='input-container'>
            <label htmlFor=''>Estado</label>
            <select
              value={selectedUf}
              onChange={(e) => setSelectedUf(e.target.value)}
              disabled={useMyLocalization}
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
              disabled={useMyLocalization}
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
        <div className='checkbox-container'>
          <input
            type='checkbox'
            id='checkbox'
            value={isTradeable}
            onChange={() => setIsTradeable(!isTradeable)}
          />
          <label htmlFor='checkbox'>Quero realizar uma troca</label>
        </div>
        <div className='input-container'>
          <label htmlFor=''>Jogo de interesse</label>
          <input
            type='text'
            value={wantedGame}
            onChange={(e) => setWantedGame(e.target.value)}
            disabled={!isTradeable}
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Preço</label>
          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isTradeable}
          />
        </div>
        <button type='submit' className='new-game-btn'>
          Editar
        </button>
      </form>
    </div>
  );
};

export default NewGame;
