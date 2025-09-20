import { useState, useEffect } from 'react';

export const useTimer = (isActive, isComplete) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId = null;
    
    if (isActive && !isComplete) {
      intervalId = setInterval(() => setSeconds(prev => prev + 1), 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, isComplete]);

  const reset = () => setSeconds(0);
  
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return { seconds, reset, formatTime };
};