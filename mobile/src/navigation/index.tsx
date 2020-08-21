import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppIntro from './AppIntro';
import MainApp from './MainApp';

import { AuthContext } from '../context/auth';

const MainNavigation = () => {
  const { isLogged, loading } = useContext(AuthContext);

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#2478ff' }} />;
  }

  return (
    <NavigationContainer>
      {isLogged ? <MainApp /> : <AppIntro />}
    </NavigationContainer>
  );
};

export default MainNavigation;
