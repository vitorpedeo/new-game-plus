import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const Game = ({ children }) => {
  const [image, setImage] = useState('');

  return (
    <GameContext.Provider value={{ image, setImage }}>
      {children}
    </GameContext.Provider>
  );
};
