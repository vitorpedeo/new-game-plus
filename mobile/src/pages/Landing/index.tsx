import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import landingImage from '../../assets/landingImage.png';

import {
  Container,
  GradientComponent,
  Circle,
  LandingInfo,
  LandingTitle,
  LandingDescription,
  Button,
  ButtonText,
} from './styles';

const Landing = () => {
  const { navigate } = useNavigation();

  const navigateToLoginPage = () => {
    navigate('Login');
  };

  return (
    <Container>
      <GradientComponent colors={['#3B38FF', '#2478FF']}>
        <Circle>
          <Image source={landingImage} resizeMode='contain' />
        </Circle>
      </GradientComponent>
      <LandingInfo>
        <LandingTitle>Está afim de novas aventuras?</LandingTitle>
        <LandingDescription>
          Venda, troca e compra de jogos. Tudo facilitado para você encontrar
          sua próxima grande expêriencia!
        </LandingDescription>
        <Button onPress={navigateToLoginPage}>
          <ButtonText>Começar agora</ButtonText>
        </Button>
      </LandingInfo>
    </Container>
  );
};

export default Landing;
