import React from 'react';
import { Card } from './CardStyledComponent.js';

const CharacterCard = ({ character }) => {
  return (
    <Card> {/*Styled component - Card*/}
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </Card>
  );
};

export default CharacterCard;
