import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

import Home from '../pages/Home';

const MainApp = () => {
  return (
    <Navigator>
      <Screen name='Home' component={Home} />
    </Navigator>
  );
};

export default MainApp;
