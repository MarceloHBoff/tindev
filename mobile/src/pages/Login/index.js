import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import { Container, Logo, UserName, Button, ButtonText } from './styles';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('@user').then(id => {
      if (id) navigation.navigate('Dashboard', { user: id });
    });
  });

  async function handleLogin() {
    const response = await api.post('/devs', { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Dashboard', { user: _id });
  }

  return (
    <Container behavior="padding" enabled={Platform.OS === 'ios'}>
      <Logo source={logo} size={40} />
      <UserName
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no GitHub"
        value={user}
        onChangeText={setUser}
      />
      <Button onPress={handleLogin}>
        <ButtonText>Enviar</ButtonText>
      </Button>
    </Container>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
