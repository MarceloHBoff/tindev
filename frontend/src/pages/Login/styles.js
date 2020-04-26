import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    margin: 0 auto;
    width: 150px;
  }

  form {
    width: 100%;
    max-width: 300px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    input {
      font-size: 16px;
      padding: 10px;
      height: 48px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    button {
      margin-top: 10px;
      font-size: 16px;
      color: #fff;
      border: none;
      height: 48px;
      border-radius: 4px;
      background: #ff6600;
      font-weight: bold;

      &:hover {
        background: ${darken(0.05, '#ff6600')};
      }
    }
  }
`;
