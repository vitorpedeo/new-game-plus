import React, { useState, useContext } from 'react';
import { FaUserAlt } from 'react-icons/fa';

import { UserContext } from '../../context/UserContext';

import { errorToast } from '../../utils/toasts';

import './styles.scss';

const AvatarInput = () => {
  const { setAvatar } = useContext(UserContext);
  const [preview, setPreview] = useState('');

  const activateImageUpload = () => {
    document.getElementById('image-upload').click();
  };

  const handleUpload = (e) => {
    const image = e.target.files[0];

    if (!image) {
      setPreview('');
      return;
    }

    const acceptedImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!acceptedImageTypes.includes(image.type)) {
      errorToast('Foto inválida!');
      setPreview('');
      return;
    }

    setAvatar(image);

    const imagePreview = URL.createObjectURL(image);
    setPreview(imagePreview);
  };

  return (
    <div className='avatar-input-container'>
      <label htmlFor=''>Imagem do Perfil</label>
      <div className='avatar' onClick={activateImageUpload}>
        <input
          type='file'
          id='image-upload'
          accept='image/*'
          onChange={handleUpload}
        />
        {preview ? (
          <img src={preview} alt='' />
        ) : (
          <FaUserAlt color='#fff' size={60} className='avatar-icon' />
        )}
      </div>
    </div>
  );
};

export default AvatarInput;
