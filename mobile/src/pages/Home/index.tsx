import React from 'react';
import { View, Text } from 'react-native';

const Home = () => {
  return (
    <View
      style={{
        backgroundColor: '#252525',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#fff' }}>Home Page</Text>
    </View>
  );
};

export default Home;
