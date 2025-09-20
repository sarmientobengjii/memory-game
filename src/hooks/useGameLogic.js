import { useState, useCallback, useEffect } from 'react';
import { CARD_ASSETS } from '../utils/cardAssets';

export const useGameLogic = (difficulty) => {
  const [gameState, setGameState] = useState(() => ({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    gameStarted: false,
    gameComplete: false
  }));

  // Create and shuffle cards for the game
  const createCards = useCallback((difficulty) => {
    const totalCards = difficulty.rows * difficulty.cols;
    const pairsNeeded = totalCards / 2;
    
    // Select required number of card assets
    const selectedAssets = CARD_ASSETS.slice(0, pairsNeeded);
    
    // Create pairs by duplicating each asset
    const cardPairs = [...selectedAssets, ...selectedAssets];
    
    // Fisher-Yates shuffle algorithm
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    // Create card objects with unique IDs
    return cardPairs.map((asset, index) => ({
      id: `card-${index}`,
      assetId: asset.id,
      symbol: asset.symbol, // Remove this when using SVGs
      name: asset.name,
      src: asset.src, // Will be used when you have SVG imports
      isFlipped: false,
      isMatched: false
    }));
  }, []);

  // Initialize/reset game state
  const initializeGame = useCallback(() => {
    const cards = createCards(difficulty);
    setGameState({
      cards,
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      gameStarted: false,
      gameComplete: false
    });
  }, [difficulty, createCards]);

  // Handle card flip logic
  const flipCard = useCallback((cardId) => {
    setGameState(prevState => {
      const { cards, flippedCards, moves, gameStarted, gameComplete } = prevState;
      
      // Don't allow flips if game is complete or too many cards are flipped
      if (gameComplete || flippedCards.length >= 2) return prevState;
      
      // Don't flip if card is already flipped or matched
      const card = cards.find(c => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return prevState;

      // Flip the card
      const newCards = cards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      );
      
      const newFlippedCards = [...flippedCards, card];
      const newGameStarted = !gameStarted;

      // Check for match when 2 cards are flipped
      if (newFlippedCards.length === 2) {
        const [firstCard, secondCard] = newFlippedCards;
        const isMatch = firstCard.assetId === secondCard.assetId;
        const newMoves = moves + 1;

        if (isMatch) {
          // Match found - mark cards as matched
          const matchedCards = newCards.map(c => 
            (c.id === firstCard.id || c.id === secondCard.id) 
              ? { ...c, isMatched: true } 
              : c
          );
          
          const newMatchedPairs = prevState.matchedPairs + 1;
          const totalPairs = difficulty.rows * difficulty.cols / 2;
          const gameComplete = newMatchedPairs === totalPairs;

          return {
            cards: matchedCards,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            moves: newMoves,
            gameStarted: newGameStarted,
            gameComplete
          };
        } else {
          // No match - flip cards back after delay
          setTimeout(() => {
            setGameState(state => ({
              ...state,
              cards: state.cards.map(c => 
                (c.id === firstCard.id || c.id === secondCard.id) 
                  ? { ...c, isFlipped: false } 
                  : c
              ),
              flippedCards: []
            }));
          }, 1000);

          return {
            ...prevState,
            cards: newCards,
            flippedCards: newFlippedCards,
            moves: newMoves,
            gameStarted: newGameStarted
          };
        }
      }

      // First card flipped
      return {
        ...prevState,
        cards: newCards,
        flippedCards: newFlippedCards,
        gameStarted: newGameStarted
      };
    });
  }, [difficulty]);

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Initialize game when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    ...gameState,
    flipCard,
    resetGame
  };
};