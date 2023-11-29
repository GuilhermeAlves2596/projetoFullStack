import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from '../components/AppContainerStyledComponent';
import { CardContainer } from '../components/CardContainerStyledComponent';
import CardForm from '../components/CardForm';
import CharacterCard from '../components/CharacterCard';
import { ContainerButton } from '../components/ContainerButtonComponent';
import CustomModal from '../components/CustomModal';
import { PaginationDiv } from '../components/PaginationDivStyledComponent';
import SearchBar from '../components/SearchBar';
import { Title } from '../components/TitleStyledComponent';
import { useRickAndMorty } from '../context/RickAndMortyContext'; // Context.API

const Home = () => {
  const { state, dispatch } = useRickAndMorty();
  const { characters, currentPage, searchText } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFetchCharacters = async () => {
    try {
      const response = await fetch(`http://localhost:3001/card`);
      if (!response.ok) {
        throw new Error('No data available.');
      }
      const data = await response.json();
      dispatch({ type: 'SET_CHARACTERS', payload: data.cartas });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardSubmit = async (name, image, status, species, gender) => {
    try {
      const response = await fetch('http://localhost:3001/card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image,
          status,
          species,
          gender,
        }),
      });

      if(!response.ok){
        console.log('Erro ao salvar o card: ')
        throw new Error('Falha ao salvar o card');
      }

      toast.success('Carta salva com sucesso!', { position: toast.POSITION.TOP_RIGHT });

      dispatch({ type: 'SET_CHARACTERS', payload: [...characters, { name, image, status, species, gender }] });
    } catch (error) {
      console.error('Erro ao salvar o card: ', error)
      toast.error('Erro ao salvar o card. Por favor, preencha todos os campos.', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  useEffect(() => {
    handleFetchCharacters();
  }, [currentPage, dispatch]);

  const filteredCharacters = useMemo(() => {
    if (!characters) {
      return [];
    }

    return characters.filter((character) =>
      character.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [characters, searchText]);

  const handlePageChange = (event, value) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AppContainer>
      <Title>Rick and Morty Characters </Title> {/*Styled component - Title*/}
      <ContainerButton>
        <Button variant="contained" style={{ marginRight: '20px', backgroundColor: '#ADFF2F', color: 'black', width: '10rem' }}
                onClick={handleOpenModal}>Nova carta</Button>
        <Button variant="contained" style={{ backgroundColor: 'red' }}>Sair</Button>
      </ContainerButton>
      <SearchBar onSearch={(text) => {
        dispatch({ type: 'SET_SEARCH_TEXT', payload: text });
      }}
      />
      <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <CardForm onSubmit={handleCardSubmit} onClose={handleCloseModal}></CardForm>
      </CustomModal>
      <CardContainer> {/*Styled component - CardContainer*/}
        {filteredCharacters.map((card) => (
          <CharacterCard key={card.id} card={card} />
        ))} {/*Styled component - Card*/}
      </CardContainer>
      <PaginationDiv> {/*Styled component - PaginationDiv*/}
        <Pagination
          count={20}
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </PaginationDiv>
    </AppContainer>
  );
};

export default Home;
