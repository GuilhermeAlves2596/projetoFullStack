import styled from 'styled-components';

export const AppWrapper = styled.div`
  font-family: Arial, sans-serif;
  background-color: #F0F6FF; /* Tom de azul claro para o background */
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  text-align: center;
  h1 {
    font-size: 24px;
    color: #333;
  }
`;

export const FormContainer = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 20px;
`;

export const FormControl = styled.div`
  margin-bottom: 16px;
  label {
    font-weight: 600;
  }
  select, input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #007BFF; /* Tom de azul escuro para o botão */
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

export const ResultContainer = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 20px;
  pre {
    white-space: pre-wrap;
  }
`;
