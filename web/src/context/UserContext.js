import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const User = ({ children }) => {
  const [avatar, setAvatar] = useState('');

  return (
    <UserContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </UserContext.Provider>
  );
};
