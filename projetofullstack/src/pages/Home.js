import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useMemo, useState } from 'react';
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
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('No data available.');
      }
      const data = await response.json();
      dispatch({ type: 'SET_CHARACTERS', payload: data.results });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardSubmit = (name, image, status, species, gender) => {
    console.log('Card submitted: ' +name);
    console.log('Card submitted: ' +image);
    console.log('Card submitted: ' +status);
    console.log('Card submitted: ' +species);
    console.log('Card submitted: ' +gender);
    // Lógica para salvar o card (por exemplo, enviar para um servidor)
  };

  useEffect(() => {
    handleFetchCharacters();
  }, [currentPage, dispatch]);

  const filteredCharacters = useMemo(() => {
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
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
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
