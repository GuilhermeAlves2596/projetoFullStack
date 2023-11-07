import React, { createContext, useContext, useReducer } from 'react';

const RickAndMortyContext = createContext();

const initialState = {
  characters: [],
  currentPage: 1,
  searchText: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return { ...state, characters: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload };
    default:
      return state;
  }
};

const RickAndMortyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RickAndMortyContext.Provider value={{ state, dispatch }}>
      {children}
    </RickAndMortyContext.Provider>
  );
};

const useRickAndMorty = () => {
  const context = useContext(RickAndMortyContext);
  if (!context) {
    throw new Error('useRickAndMorty must be used within a RickAndMortyProvider');
  }
  return context;
};

export { RickAndMortyProvider, useRickAndMorty };

