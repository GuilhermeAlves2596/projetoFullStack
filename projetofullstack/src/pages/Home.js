import Pagination from '@mui/material/Pagination';
import React, { useEffect, useMemo, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import { useRickAndMorty } from '../context/RickAndMortyContext'; // Context.API
import { AppContainer, CardContainer, PaginationDiv, Title } from '../styles/AppStyles';

const Home = () => {
  const { state, dispatch } = useRickAndMorty(); // Context.API
  const { characters } = state;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchCharacters = async (page) => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        if (!response.ok) {
          throw new Error('No data available.');
        }
        const data = await response.json();
        // Atualize o estado do contexto com os personagens
        dispatch({ type: 'SET_CHARACTERS', payload: data.results }); // Context.API
      } catch (error) {
        console.error(error);
      }
    };

    const handleFetchCharacters = async () => {
      await fetchCharacters(currentPage);
    };

    handleFetchCharacters();

  }, [currentPage, dispatch]);

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [characters, searchText]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContainer>
      <Title>Rick and Morty Characters </Title> {/*Styled component - Title*/}
      <SearchBar onSearch={(text) => setSearchText(text)} />
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
