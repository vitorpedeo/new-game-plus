import React from 'react';

import logo from '../../assets/logo.svg';

import './styles.scss';

const LogoHeader = () => {
  return (
    <header>
      <div>
        <img src={logo} alt='' />
      </div>
    </header>
  );
};

export default LogoHeader;
