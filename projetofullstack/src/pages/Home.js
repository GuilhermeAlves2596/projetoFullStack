// src/pages/Home.js
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'; // Importe useMemo
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { AppContainer, CardContainer } from '../styles/AppStyles';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        if (!response.data.results) {
          throw new Error('No data available.');
        }
        setCharacters(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const filteredCharacters = useMemo(() => { // Use useMemo para otimizar a filtragem
    if (!searchText) {
      return characters;
    }

    return characters.filter((character) =>
      character.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [characters, searchText]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <AppContainer>
      <h1>API Rick and Morty</h1>
      <SearchBar onSearch={(text) => setSearchText(text)} />
      <CardContainer>
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </CardContainer>
      <Pagination onPageChange={handlePageChange} />
    </AppContainer>
  );
};

export default Home;
