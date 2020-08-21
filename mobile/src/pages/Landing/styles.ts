import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const GradientComponent = styled(LinearGradient)`
  padding: 40px 0 20px 0;
  height: 45%;
  align-items: center;
  justify-content: center;
`;

export const Circle = styled.View`
  width: 270px;
  height: 270px;
  border-radius: 135px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const LandingInfo = styled.View`
  padding: 40px 0;
  flex: 1;
  align-items: center;
`;

export const LandingTitle = styled.Text`
  max-width: 270px;
  color: #252525;
  font-family: 'Poppins_700Bold';
  font-size: 24px;
  text-align: center;
`;

export const LandingDescription = styled.Text`
  max-width: 270px;
  margin-top: 15px;
  color: #8f8f8f;
  font-family: 'Poppins_400Regular';
  font-size: 18px;
  text-align: center;
`;

export const Button = styled(RectButton)`
  margin-top: 35px;
  padding: 18px 0;
  width: 270px;
  border-radius: 10px;
  background-color: #2478ff;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Poppins_700Bold';
  font-size: 18px;
`;
