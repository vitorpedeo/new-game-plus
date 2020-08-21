import React, { useState, useContext } from 'react';
import { Image, Alert } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import api from '../../services/api';
import { AuthContext } from '../../context/auth';

import logoAlt from '../../assets/logoAlt.png';

import {
  Container,
  GradientComponent,
  PageHeader,
  Title,
  InputBlock,
  InputIcon,
  Input,
  Button,
  ButtonText,
  LoginOrRegister,
  Line,
  LoginOrRegisterText,
} from './styles';

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    signIn(email, password);
  };

  const redirectToRegisterPage = () => {
    Linking.openURL('http://192.168.1.6:3000/register');
  };

  return (
    <Container>
      <GradientComponent colors={['#3B38FF', '#2478FF']}>
        <PageHeader>
          <Title> Entre na sua conta </Title>
          <Image source={logoAlt} resizeMode='contain' />
        </PageHeader>
      </GradientComponent>

      <InputBlock>
        <InputIcon>
          <Ionicons name='ios-at' color='#7BAEFF' size={24} />
        </InputIcon>
        <Input
          placeholder='Email'
          placeholderTextColor='#8F8F8F'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </InputBlock>

      <InputBlock>
        <InputIcon>
          <MaterialIcons name='vpn-key' color='#7BAEFF' size={24} />
        </InputIcon>
        <Input
          placeholder='Senha'
          placeholderTextColor='#8F8F8F'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </InputBlock>

      <Button onPress={login}>
        <ButtonText>Entrar</ButtonText>
      </Button>
      <LoginOrRegister>
        <Line />
        <LoginOrRegisterText>ou</LoginOrRegisterText>
        <Line />
      </LoginOrRegister>
      <Button register onPress={redirectToRegisterPage}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
    </Container>
  );
};

export default Login;
