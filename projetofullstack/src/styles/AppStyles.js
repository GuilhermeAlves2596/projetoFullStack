import styled from 'styled-components';

export const AppContainer = styled.div`
  background-color: #c3e8bd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-image: url('https://images6.alphacoders.com/909/909641.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  border: 1px solid black;
`;

export const Title = styled.h1`
  font-family: 'Playpen Sans';
  font-size: 36px; 
  color: black;
  text-shadow: 3px 3px 6px #E6E6FA;

`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

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

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

export const SearchInput = styled.input`
  width: 60vh;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Playpen Sans';
  background-color: #E6E6FA;
`;

export const ErrorMessage = styled.p`
  font-family: 'Playpen Sans';
  color: white;
  font-size: 1.1rem;
  margin-left: 20px;
  background-color: red;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
`;

export const PaginationDiv = styled.div`
  margin-top: 10px;
  background-color: #E6E6FA;
  border-radius: 5px;
`;
