import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'proptypes';

import api from '../../services/api';
import { Container } from './styles';

import logo from '../../assets/logo.svg';

export default function Login({ history }) {
  const [username] = useState('');

  async function handleSubmit(data) {
    try {
      const response = await api.post('/devs', { username: data.username });
      const { _id } = response.data;

      history.push(`/dashboard/${_id}`);
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <Container>
      <img src={logo} alt="tindev" />
      <Form initialData={username} onSubmit={handleSubmit}>
        <Input name="username" placeholder="Digite seu usuário no GitHub" />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
