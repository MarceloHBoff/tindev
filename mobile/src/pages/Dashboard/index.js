import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import like from '../../assets/like.png';
import itsamatch from '../../assets/itsamatch.png';
import dislike from '../../assets/dislike.png';
import {
  Container,
  Logo,
  CardsContainer,
  Card,
  Avatar,
  Footer,
  Name,
  Bio,
  ButtonContainer,
  Button,
  ImageButton,
  Empty,
  MatchContainer,
  MatchLogo,
  MatchAvatar,
  MatchName,
  MatchBio,
  CloseButton,
  CloseButtonText,
} from './styles';

export default function Dashboard({ navigation }) {
  const id = navigation.getParam('user');
  const [devs, setDevs] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadDevs() {
      try {
        const response = await api.get('devs', { headers: { user: id } });
        setDevs(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadDevs();
  }, [id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: id },
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [id]);

  async function handleLike() {
    const [dev, ...rest] = devs;
    await api.post(`devs/${dev._id}/likes`, null, { headers: { user: id } });

    setDevs(rest);
  }

  async function handleDislike() {
    const [dev, ...rest] = devs;
    await api.post(`devs/${dev._id}/dislikes`, null, {
      headers: { user: id },
    });

    setDevs(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleLogout}>
        <Logo source={logo} size={40} />
      </TouchableOpacity>
      <CardsContainer>
        {devs.length === 0 ? (
          <Empty>Acabou :(</Empty>
        ) : (
          devs.map((dev, index) => (
            <Card key={dev._id} zIndex={devs.length - index}>
              <Avatar source={{ uri: dev.avatar }} />
              <Footer>
                <Name>{dev.name}</Name>
                <Bio>{dev.bio}</Bio>
              </Footer>
            </Card>
          ))
        )}
      </CardsContainer>
      {devs.length > 0 && (
        <ButtonContainer>
          <Button onPress={handleDislike}>
            <ImageButton source={dislike} size={60} />
          </Button>
          <Button onPress={handleLike}>
            <ImageButton source={like} size={60} />
          </Button>
        </ButtonContainer>
      )}
      {matchDev && (
        <MatchContainer>
          <MatchLogo source={itsamatch} />
          <MatchAvatar source={{ uri: matchDev.avatar }} />
          <MatchName>{matchDev.name}</MatchName>
          <MatchBio>{matchDev.bio}</MatchBio>

          <CloseButton onPress={() => setMatchDev(null)}>
            <CloseButtonText>Fechar</CloseButtonText>
          </CloseButton>
        </MatchContainer>
      )}
    </Container>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
