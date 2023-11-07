import styled from 'styled-components';

export const Card = styled.div`
  background-color: #E6E6FA;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  text-align: center;
  font-family: 'Playpen Sans';

  img {
    max-width: 100%;
    border-radius: 5px;
    border: 1px solid black;
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