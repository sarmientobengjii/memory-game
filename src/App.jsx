import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import DifficultySelector from './components/DifficultySelector';
import { useTimer } from './hooks/useTimer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGameLogic } from './hooks/useGameLogic';
import { DIFFICULTY_LEVELS } from './utils/gameConfig';
import './App.css';

const MemoryCardGame = () => {
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS[1]); // Default to Medium
  const [bestScores, setBestScores] = useLocalStorage('memory-game-scores', {});
  const [isShuffling, setIsShuffling] = useState(false);
  
  const gameLogic = useGameLogic(difficulty);
  const timer = useTimer(gameLogic.gameStarted, gameLogic.gameComplete);
  
  const currentBestScore = bestScores[difficulty.id];

  // Handle game completion and score tracking
  useEffect(() => {
    if (gameLogic.gameComplete && gameLogic.moves > 0) {
      const currentScore = {
        moves: gameLogic.moves,
        time: timer.seconds,
        difficulty: difficulty.name
      };

      // Check if this is a new best score
      const isNewBest = !currentBestScore || 
        gameLogic.moves < currentBestScore.moves ||
        (gameLogic.moves === currentBestScore.moves && timer.seconds < currentBestScore.time);

      if (isNewBest) {
        setBestScores(prev => ({
          ...prev,
          [difficulty.id]: currentScore
        }));
      }
    }
  }, [gameLogic.gameComplete, gameLogic.moves, timer.seconds, difficulty, currentBestScore, setBestScores]);

  const handleDifficultyChange = (newDifficulty) => {
    setIsShuffling(true);
    setTimeout(() => {
      setDifficulty(newDifficulty);
      timer.reset();
      setIsShuffling(false);
    }, 600); // Match shuffle animation duration
  };

  const handleRestart = () => {
    setIsShuffling(true);
    setTimeout(() => {
      gameLogic.resetGame();
      timer.reset();
      setIsShuffling(false);
    }, 600); // Match shuffle animation duration
  };

  const isDisabled = gameLogic.flippedCards.length >= 2 || gameLogic.gameComplete || isShuffling;

  return (
    <div className="memory-game">
      <header className="game-header">
        <h1>Memory Card Game</h1>
        <p>Match all pairs to win!</p>
      </header>

      <main className="game-main">
        <DifficultySelector 
          currentDifficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
        />
        
        <GameControls
          moves={gameLogic.moves}
          seconds={timer.seconds}
          formatTime={timer.formatTime}
          onRestart={handleRestart}
          gameComplete={gameLogic.gameComplete}
          bestScore={currentBestScore}
        />

        <GameBoard
          cards={gameLogic.cards}
          onCardClick={gameLogic.flipCard}
          difficulty={difficulty}
          isDisabled={isDisabled}
          isShuffling={isShuffling}
        />
      </main>
    </div>
  );
};

export default MemoryCardGame;