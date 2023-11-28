import React from 'react';
import { Card } from './CardStyledComponent.js';

const CharacterCard = ({ card }) => {
  return (
    <Card> {/*Styled component - Card*/}
      <img src={card.image} alt={card.name} />
      <h3>{card.name}</h3>
      <p>Status: {card.status}</p>
      <p>Species: {card.species}</p>
      <p>Gender: {card.gender}</p>
    </Card>
  );
};

export default CharacterCard;
