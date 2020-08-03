import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';

import api from '../../utils/api';
import { getCookie } from '../../utils/cookies';

import LogoHeader from '../../components/LogoHeader';

import './styles.scss';

const GameDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [userName, setUserName] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [isTradeable, setIsTradeable] = useState(false);
  const [wantedGame, setWantedGame] = useState('');
  const [price, setPrice] = useState('');

  const token = getCookie('token');

  useEffect(() => {
    api
      .get(`game/show/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const game = res.data.data;
        const {
          image,
          title,
          description,
          platform,
          isTradeable,
          wantedGame,
          price,
        } = game;
        const userName = game.User.name;
        const whatsApp = game.User.whatsApp;

        setImage(image);
        setTitle(title);
        setDescription(description);
        setPlatform(platform);
        setUserName(userName);
        setWhatsApp(whatsApp);
        setIsTradeable(isTradeable);
        setWantedGame(wantedGame);
        setPrice(price);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  return (
    <div className='game-detail-container'>
      <LogoHeader />
      <div className='game-detail-content'>
        <Link to='/user/search' className='back-search'>
          <FaArrowLeft size={35} /> <p>Voltar</p>
        </Link>
        <div className='game-detail-image'>
          <img src={`http://192.168.1.6:5000/${image}`} alt='' />
        </div>
        <div className='game-detail-info'>
          <h1>{title}</h1>
          <p className='game-desc'>{description}</p>
          {platform.includes('Xbox') ? (
            <p className='game-platform' style={{ color: '#007E00' }}>
              {platform}
            </p>
          ) : platform.includes('Playstation') ? (
            <p className='game-platform' style={{ color: '#0A549C' }}>
              {platform}
            </p>
          ) : (
            <p className='game-platform' style={{ color: '#E70012' }}>
              {platform}
            </p>
          )}
          <p className='game-announcer'>Anunciado por {userName}</p>
          <p className='game-value'>
            {isTradeable === true ? (
              <>
                Interesse <span>{wantedGame}</span>
              </>
            ) : (
              <>
                Preço{' '}
                <span>
                  {Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(price)}
                </span>
              </>
            )}
          </p>

          <a
            href={`https://api.whatsapp.com/send?phone=${whatsApp}&text=Olá,%20tenho%20interesse%20no%20jogo%20anunciado.`}
          >
            Mensagem <FaWhatsapp size={25} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
