import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import io from 'socket.io-client';

import api from '../../services/api';
import { Container, Empty, MatchContainer, Avatar } from './styles';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import itsamatch from '../../assets/itsamatch.png';

export default function Dashboard({ match }) {
  const { id } = match.params;
  const [devs, setDevs] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('devs', { headers: { user: id } });
      setDevs(response.data);
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

  async function handleLike(devId) {
    await api.post(`devs/${devId}/likes`, null, { headers: { user: id } });

    setDevs(devs.filter(user => user._id !== devId));
  }

  async function handleDislike(devId) {
    await api.post(`devs/${devId}/dislikes`, null, {
      headers: { user: id },
    });

    setDevs(devs.filter(user => user._id !== devId));
  }

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="tindev" />
      </Link>
      {devs.length > 0 ? (
        <ul>
          {devs.map(dev => (
            <li key={dev._id}>
              <img src={dev.avatar} alt={dev.name} />
              <footer>
                <strong>{dev.name}</strong>
                <p>{dev.bio}</p>
              </footer>
              <div>
                <button type="button" onClick={() => handleDislike(dev._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(dev._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Acabou :(</Empty>
      )}
      {matchDev && (
        <MatchContainer>
          <img src={itsamatch} alt="It's a match" />
          <Avatar src={matchDev.avatar} />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(null)}>
            Fechar
          </button>
        </MatchContainer>
      )}
    </Container>
  );
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
