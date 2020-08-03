import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { FaPowerOff, FaPencilAlt, FaTrash } from 'react-icons/fa';

import api from '../../utils/api';
import { getCookie, removeCookie } from '../../utils/cookies';
import { successToast, errorToast } from '../../utils/toasts';

import LogoHeader from '../../components/LogoHeader';
import MobileHomeHeader from '../../components/MobileHomeHeader';

import './styles.scss';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userGames, setUserGames] = useState([]);

  const history = useHistory();
  const token = getCookie('token');

  useEffect(() => {
    api
      .get('auth/get-user-info', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        const { userName, userAvatar, userGames } = data;

        setUserName(userName);
        setUserAvatar(userAvatar);
        setUserGames(userGames);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const handleGameDelete = (id) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Essa ação é irreversível!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#06d6a0',
      cancelButtonColor: '#e63946',
    }).then((result) => {
      if (result.value) {
        api
          .delete(`game/delete/${id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const updatedGames = userGames.filter((game) => game.id !== id);
            setUserGames(updatedGames);

            const successMessage = res.data.message;
            successToast(successMessage);
          })
          .catch((error) => {
            const errorMessage = error.response.data.message;

            errorToast(errorMessage);
          });
      }
    });
  };

  const logout = () => {
    removeCookie('token');
    successToast('Até mais!');

    history.push('/login');
  };

  return (
    <div className='home-container'>
      <MobileHomeHeader
        userName={userName}
        userAvatar={userAvatar}
        logout={logout}
      />

      <div className='user-panel-container'>
        <LogoHeader />
        <div className='user-panel'>
          <div className='profile-pic-container'>
            <div className='profile-pic'>
              <img src={`http://192.168.1.6:5000/${userAvatar}`} alt='' />
            </div>
            <p>Seja bem vindo, {userName}!</p>
          </div>
          <div className='navigate-links'>
            <Link to='/user/search' className='home-link'>
              <p>Procurar jogos</p>
              <div className='link-icon'>
                <FiSearch size={30} />
              </div>
            </Link>
            <Link to='/user/new-game' className='home-link'>
              <p>Anunciar um jogo</p>
              <div className='link-icon'>
                <FiPlus size={30} />
              </div>
            </Link>
          </div>
          <button type='button' className='logout' onClick={logout}>
            <div className='power-off'>
              <FaPowerOff color='#fff' size={32} />
            </div>
            <p>Sair</p>
          </button>
        </div>
      </div>
      <div className='games-announced'>
        <h1>Meus jogos anunciados</h1>
        <div className='games-container'>
          {userGames.length !== 0 ? (
            userGames.map((game) => (
              <div className='game-card' key={game.id}>
                <div className='game-image'>
                  <img src={`http://192.168.1.6:5000/${game.image}`} alt='' />
                </div>
                <div className='game-info'>
                  <div className='game-name-label'>
                    <p>Nome</p>
                    <span>{game.title}</span>
                  </div>
                  <div className='game-platform-label'>
                    <p>Plataforma</p>

                    {game.platform.includes('Xbox') ? (
                      <span style={{ color: '#007E00' }}>{game.platform}</span>
                    ) : game.platform.includes('Playstation') ? (
                      <span style={{ color: '#0A549C' }}>{game.platform}</span>
                    ) : (
                      <span style={{ color: '#E70012' }}>{game.platform}</span>
                    )}
                  </div>
                </div>
                <div className='game-edit-delete'>
                  <Link to={`/user/edit-game/${game.id}`} className='edit-btn'>
                    <FaPencilAlt color='#fff' size={32} />
                  </Link>
                  <div
                    className='delete-btn'
                    onClick={() => handleGameDelete(game.id)}
                  >
                    <FaTrash color='#fff' size={32} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 style={{ textAlign: 'center' }}>
              Nenhum jogo anunciado ainda!
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
