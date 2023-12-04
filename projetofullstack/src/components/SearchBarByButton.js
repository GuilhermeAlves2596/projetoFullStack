import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CharacterCard from '../components/CharacterCard';
import CustomModal from '../components/CustomModal';
import { ErrorMessage } from './ErrorMessageStyledComponent';
import { SearchContainer } from './SearchContainerStyledComponent';
import { SearchInput } from './SearchInputStyledComponent';


const SearchBarByButton = () => {
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const token = localStorage.getItem('token')
  
  const handleSearchChange = (e) => {
    let text = e.target.value;
    setSearchText(text);

    if (text.length < 3) {
      setErrorMessage('Please enter a name to search!!');
    } else {
      setErrorMessage('');
    }
  };

  const handleSearchClick = () => {
    if (searchText.length >= 3 && !showModal) {
      const endpoint = `http://localhost:3001/card/${searchText}`;

      // Usando a função fetch
      fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': token,
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if(data.status === true){
            setModalData(data);
            setShowModal(true);
          } else {
            toast.error('Carta não encontrada, digite o nome completo!', { position: toast.POSITION.TOP_RIGHT });
          }
        })
        .catch(error => {
          console.error('Erro ao buscar a carta:', error);
        });

    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearchChange}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SearchContainer>

      <div
        style={{
          backgroundColor: '#E6E6FA',
          height: '2.75rem', width: '2.75rem',
          border: '1px solid black', borderRadius: '10%',
          display: 'flex', alignItems: 'center', paddingLeft: '10px',
          cursor: 'pointer'
        }}
        onClick={handleSearchClick}
      >
        <SearchIcon fontSize='large'></SearchIcon>
        <CustomModal
          isOpen={showModal}
          onRequestClose={closeModal}>
          {modalData && modalData.result && (
            <CharacterCard key={modalData.result.id} card={modalData.result} />
          )}
        </CustomModal>
      </div>
    </div>
  );
};

export default SearchBarByButton;