import React from 'react';
import Card from './Card';

const GameBoard = ({ cards, onCardClick, difficulty, isDisabled }) => {
  return (
    <div 
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${difficulty.cols}, 1fr)`,
        gridTemplateRows: `repeat(${difficulty.rows}, 1fr)`
      }}
      role="grid"
      aria-label={`${difficulty.name} difficulty game board with ${cards.length} cards`}
    >
      {cards.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          onClick={onCardClick}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
};

export default GameBoard;