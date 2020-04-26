import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #ccc;
  padding: 30px;
`;

export const Logo = styled.Image``;

export const UserName = styled.TextInput`
  height: 48px;
  margin-top: 20px;
  font-size: 16px;
  align-self: stretch;
  border-radius: 5px;
  border: 1px solid #999;
  background: #fff;
  padding: 10px;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 5px;
  height: 48px;
  border-radius: 5px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  background: #ff6600;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
