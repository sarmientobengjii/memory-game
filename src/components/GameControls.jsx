import React from 'react';
import { RotateCcw, Clock, Target, Trophy } from 'lucide-react';

const Timer = ({ seconds, formatTime }) => (
  <div className="game-stat">
    <Clock size={20} />
    <span aria-live="polite" aria-label={`Time: ${formatTime(seconds)}`}>
      {formatTime(seconds)}
    </span>
  </div>
);

const MoveCounter = ({ moves }) => (
  <div className="game-stat">
    <Target size={20} />
    <span aria-live="polite" aria-label={`Moves: ${moves}`}>
      Moves: {moves}
    </span>
  </div>
);

const BestScore = ({ bestScore }) => {
  if (!bestScore) return null;
  
  return (
    <div className="game-stat best-score">
      <Trophy size={20} />
      <span>
        Best: {bestScore.moves} moves ({Math.floor(bestScore.time / 60)}:{(bestScore.time % 60).toString().padStart(2, '0')})
      </span>
    </div>
  );
};

const GameControls = ({ moves, seconds, formatTime, onRestart, gameComplete, bestScore }) => (
  <div className="game-controls">
    <div className="game-stats">
      <MoveCounter moves={moves} />
      <Timer seconds={seconds} formatTime={formatTime} />
      {bestScore && <BestScore bestScore={bestScore} />}
    </div>
    
    {gameComplete && (
      <div className="completion-message" role="alert" aria-live="assertive">
        🎉 Congratulations! You completed the game in {moves} moves!
      </div>
    )}
    
    <button 
      className="restart-btn"
      onClick={onRestart}
      aria-label="Restart game"
    >
      <RotateCcw size={20} />
      Restart Game
    </button>
  </div>
);

export default GameControls;