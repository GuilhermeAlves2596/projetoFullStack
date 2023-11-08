import React, { useState } from 'react';
import { ErrorMessage } from './ErrorMessageStyledComponent';
import { SearchContainer } from './SearchContainerStyledComponent';
import { SearchInput } from './SearchInputStyledComponent';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    let text = e.target.value;
    setSearchText(text);
    
    if (text.length < 3) {
      setErrorMessage('Please enter a name to search!!');
      onSearch('');
    } else {
      setErrorMessage('');
      onSearch(text);
    }
  };

  return (
    <SearchContainer> {/*Styled component - SearchContainer*/}
      <SearchInput 
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={handleSearchChange}
      /> {/*Styled component - SearchInput*/}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/*Styled component - ErrorMessage*/}
    </SearchContainer>
  );
};

export default SearchBar;
