import React, { useEffect, useState } from 'react';
import {
  AppWrapper,
  FormContainer,
  FormControl,
  Header,
  ResultContainer,
  SubmitButton,
} from './AppStyles';

function App() {
  const [tipoVeiculo, setTipoVeiculo] = useState('carro');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [resultado, setResultado] = useState('');
  const [marcasDisponiveis, setMarcasDisponiveis] = useState([]);
  const [modelosDisponiveis, setModelosDisponiveis] = useState([]);
  const [marcasFiltradas, setMarcasFiltradas] = useState([]);
  

  const anos = ['2022', '2021', '2020', '2019', '2018', '2017'];

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const url = `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}s/marcas`;

        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setMarcasDisponiveis(data);
          // Ao atualizar as marcas, também atualize as marcas filtradas
          setMarcasFiltradas(data);
        } else if (typeof data === 'object') {
          const marcasArray = Object.keys(data).map((key) => data[key]);
          setMarcasDisponiveis(marcasArray);
          // Ao atualizar as marcas, também atualize as marcas filtradas
          setMarcasFiltradas(marcasArray);
        }
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
      }
    };

    fetchMarcas();
  }, [tipoVeiculo]);

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        if (marca) {
          const url = `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}s/marcas/${marca}/modelos`;
  
          const response = await fetch(url);
          const data = await response.json();
  
          if (data.modelos) {
            const modelosArray = data.modelos.map((modeloOption) => ({
              codigo: modeloOption.codigo,
              nome: modeloOption.nome,
            }));
            setModelosDisponiveis(modelosArray);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar modelos:', error);
      }
    };
  
    fetchModelos();
  }, [marca]);

  const handleMarcaInputChange = (event) => {
    setMarca(event.target.value);

    const filtro = event.target.value.toLowerCase();
    // Filtre as marcas disponíveis com base no filtro de pesquisa
    setMarcasFiltradas(
      marcasDisponiveis.filter((marcaOption) =>
        marcaOption.nome.toLowerCase().includes(filtro)
      )
    );
  };

  const handleModeloInputChange = (event) => {
    setModelo(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'tipoVeiculo':
        setTipoVeiculo(value);
        break;
      case 'marca':
        setMarca(value);
        break;
      case 'modelo':
        setModelo(value);
        break;
      case 'ano':
        setAno(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // Lógica para enviar a solicitação à API da Tabela Fipe e atualizar o estado com os dados recebidos
  };

  return (
    <AppWrapper>
      <Header>
        <h1>Consulta de Veículos - Tabela Fipe</h1>
      </Header>
      <FormContainer>
        <FormControl>
          <label>Tipo de Veículo:</label>
          <select name="tipoVeiculo" onChange={handleChange} value={tipoVeiculo}>
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
            <option value="caminhoe">Caminhão</option>
          </select>
        </FormControl>
        <FormControl>
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={marca}
            onChange={handleMarcaInputChange}
            placeholder="Pesquise uma marca"
          />
          <select name="marca" onChange={handleChange} value={marca}>
            {marcasFiltradas.map((marcaOption) => (
              <option key={marcaOption.codigo} value={marcaOption.nome}>
                {marcaOption.nome}
              </option>
            ))}
          </select>
        </FormControl>
        <FormControl>
          <label>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={modelo}
            onChange={handleModeloInputChange}
            placeholder="Pesquise um modelo"
          />
          <select>
            {modelosDisponiveis
              .filter((modeloOption) => modeloOption && modeloOption.nome && modeloOption.nome.toLowerCase().includes(modelo.toLowerCase()))
              .map((filteredOption) => (
                <option key={filteredOption.codigo} value={filteredOption.nome}>
                  {filteredOption.nome}
                </option>
              ))}
          </select>
        </FormControl>
        <FormControl>
          <label>Ano:</label>
          <select name="ano" onChange={handleChange} value={ano}>
            {anos.map((anoOption) => (
              <option key={anoOption} value={anoOption}>
                {anoOption}
              </option>
            ))}
          </select>
        </FormControl>
        <SubmitButton onClick={handleSubmit}>Pesquisar</SubmitButton>
      </FormContainer>
      <ResultContainer>
        <h2>Dados Recebidos:</h2>
        <pre>{resultado}</pre>
      </ResultContainer>
    </AppWrapper>
  );
}

export default App;
