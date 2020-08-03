import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

import api from '../../utils/api';
import { getCookie } from '../../utils/cookies';

import LogoHeader from '../../components/LogoHeader';
import { errorToast } from '../../utils/toasts';

import './styles.scss';

const Search = () => {
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);

  const [title, setTitle] = useState('');
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [results, setResults] = useState([]);

  const token = getCookie('token');

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

  const handleSearch = async () => {
    if (selectedUf === '0' || selectedCity === '0' || title === '') {
      errorToast('Preencha todos os campos!');
      return;
    }

    try {
      const res = await api.get(
        `game/list-all?uf=${selectedUf}&city=${selectedCity}&title=${title}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const games = res.data.data;
      setResults(games);
    } catch (error) {
      setResults([]);
    }
  };

  return (
    <div className='search-container'>
      <LogoHeader />

      <div className='main-search-content'>
        <div className='search-options'>
          <input
            type='text'
            placeholder='Nome do jogo'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='search-select-input'>
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
          <button type='button' onClick={handleSearch}>
            Pesquisar
          </button>
          <Link to='/user/home' className='back-home'>
            <FaArrowLeft size={35} /> <p>Voltar</p>
          </Link>
        </div>
        <div className='search-results'>
          {results.length !== 0 ? (
            results.map((result) => (
              <Link
                to={`result/${result.id}`}
                key={result.id}
                className='game-result-card'
              >
                <div className='game-result-image'>
                  <img src={`http://192.168.1.6:5000/${result.image}`} alt='' />
                </div>
                <div className='game-result-info'>
                  <div className='game-result-label'>
                    <p>Nome</p>
                    <span>{result.title}</span>
                  </div>
                  <div className='game-result-label'>
                    <p>Plataforma</p>
                    {result.platform.includes('Xbox') ? (
                      <span style={{ color: '#007E00' }}>
                        {result.platform}
                      </span>
                    ) : result.platform.includes('Playstation') ? (
                      <span style={{ color: '#0A549C' }}>
                        {result.platform}
                      </span>
                    ) : (
                      <span style={{ color: '#E70012' }}>
                        {result.platform}
                      </span>
                    )}
                  </div>
                  <div className='game-result-label'>
                    {result.isTradeable === false ? (
                      <>
                        <p>Preço</p>
                        <span>
                          {Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(result.price)}
                        </span>
                      </>
                    ) : (
                      <>
                        <p>Interesse</p>
                        <span>{result.wantedGame}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h1 style={{ textAlign: 'center', fontSize: '2.25rem' }}>
              Nenhum resultado.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
