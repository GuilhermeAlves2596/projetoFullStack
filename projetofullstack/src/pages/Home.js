import Pagination from '@mui/material/Pagination';
import React, { useEffect, useMemo } from 'react';
import { AppContainer } from '../components/AppContainerStyledComponent';
import { CardContainer } from '../components/CardContainerStyledComponent';
import CharacterCard from '../components/CharacterCard';
import { PaginationDiv } from '../components/PaginationDivStyledComponent';
import SearchBar from '../components/SearchBar';
import { Title } from '../components/TitleStyledComponent';
import { useRickAndMorty } from '../context/RickAndMortyContext'; // Context.API

const Home = () => {
  const { state, dispatch } = useRickAndMorty();
  const { characters, currentPage, searchText } = state;

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
      <SearchBar onSearch={(text) => {
        dispatch({ type: 'SET_SEARCH_TEXT', payload: text });
      }}
    />
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
