import React, { useState, useContext } from 'react';

import { GameContext } from '../../context/GameContext';

import { errorToast } from '../../utils/toasts';

import './styles.scss';

const GameImageInput = () => {
  const { setImage } = useContext(GameContext);
  const [preview, setPreview] = useState('');

  const activateUpload = () => {
    document.getElementById('game-image-upload').click();
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];

    if (!image) {
      setPreview('');
      return;
    }

    const acceptedImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!acceptedImageTypes.includes(image.type)) {
      errorToast('Imagem inválida!');
      setPreview('');
      return;
    }

    setImage(image);

    const imagePreview = URL.createObjectURL(image);
    setPreview(imagePreview);
  };

  return (
    <div className='game-image-input-container'>
      <label htmlFor=''>Imagem do jogo</label>
      <div className='image-input' onClick={activateUpload}>
        <input
          type='file'
          accept='image/*'
          id='game-image-upload'
          onChange={handleImageUpload}
        />
        {preview ? <img src={preview} alt='' /> : <p>Clique aqui</p>}
      </div>
    </div>
  );
};

export default GameImageInput;
