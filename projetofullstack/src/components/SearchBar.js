import React, { useState } from 'react';
import { ErrorMessage, SearchContainer, SearchInput } from '../styles/AppStyles';


const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    let text = e.target.value;
    setSearchText(text);

    if (text.trim() === '') {
      setErrorMessage('Please enter a name to search.');
      onSearch('');
    } else {
      setErrorMessage('');
      onSearch(text);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={handleSearchChange}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </SearchContainer>
  );
};

export default SearchBar;
