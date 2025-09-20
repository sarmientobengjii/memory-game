import React from 'react';
import { DIFFICULTY_LEVELS } from '../utils/gameConfig';

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }) => (
  <div className="difficulty-selector" role="radiogroup" aria-label="Select difficulty level">
    <span className="difficulty-label">Difficulty:</span>
    {DIFFICULTY_LEVELS.map((level) => (
      <button
        key={level.id}
        className={`difficulty-btn ${currentDifficulty.id === level.id ? 'active' : ''}`}
        onClick={() => onDifficultyChange(level)}
        role="radio"
        aria-checked={currentDifficulty.id === level.id}
        aria-label={`${level.name} difficulty: ${level.rows} by ${level.cols} grid`}
      >
        {level.name}
      </button>
    ))}
  </div>
);

export default DifficultySelector;