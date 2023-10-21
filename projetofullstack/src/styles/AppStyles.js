// src/styles/AppStyles.js
import styled from 'styled-components';

export const AppContainer = styled.div`
  background-color: #c3e8bd; /* Cor de fundo verde claro */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  width: 250px;
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 5px;
  }

  h3 {
    font-size: 1.2rem;
    margin: 10px 0;
  }

  p {
    font-size: 1rem;
    margin: 5px 0;
  }
`;
