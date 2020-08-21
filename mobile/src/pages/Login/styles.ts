import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  register?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const GradientComponent = styled(LinearGradient)`
  margin-bottom: 40px;
  padding: 40px 0 20px 0;
  height: 36%;
  align-items: center;
  justify-content: center;
`;

export const PageHeader = styled.View`
  width: 320px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  max-width: 160px;
  color: #fff;
  font-family: 'Poppins_700Bold';
  font-size: 30px;
`;

export const InputBlock = styled.View`
  margin: 15px auto;
  width: 320px;
  height: 60px;
  border-radius: 10px;
  background-color: #fff;
  flex-direction: row;
`;

export const InputIcon = styled.View`
  width: 50px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #2478ff;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  padding-left: 10px;
  color: #252525;
  font-family: 'Poppins_400Regular';
  font-size: 18px;
  flex: 1;
`;

export const Button = styled(RectButton)<ButtonProps>`
  margin: ${(props) => (props.register ? '0 auto' : '30px auto 0 auto')};
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

export const LoginOrRegister = styled.View`
  margin: 8px auto;
  width: 270px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Line = styled.View`
  width: 40%;
  height: 2px;
  background-color: #8f8f8f;
`;

export const LoginOrRegisterText = styled.Text`
  color: #8f8f8f;
  font-family: 'Poppins_700Bold';
  font-size: 18px;
`;
