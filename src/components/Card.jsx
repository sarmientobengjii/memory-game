import React from 'react';

const Card = ({ card, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) onClick(card.id);
  };

  const handleKeyPress = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
      e.preventDefault();
      onClick(card.id);
    }
  };

  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <button
      className={`memory-card ${isRevealed ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      disabled={isDisabled || card.isMatched}
      aria-pressed={isRevealed}
      aria-label={isRevealed ? `${card.name} card` : `Face down card`}
    >
      <div className="card-inner">
        <div className="card-front">
          <span>?</span>
        </div>
        <div className="card-back">
          {/* TODO: Replace with <img src={card.src} alt={card.name} /> when using SVGs */}
          {card.src ? (
            <img src={card.src} alt={card.name} />
          ) : (
            <span role="img" aria-label={card.name}>
              {card.symbol}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default Card;