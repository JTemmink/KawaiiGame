import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  CLICKS_TO_EXPLOSION,
  BONUS_DURATION_SECONDS,
  BONUS_MULTIPLIER,
  HEART_MIN_SCALE,
  HEART_MAX_SCALE,
  SHAKE_THRESHOLD,
  PULSE_THRESHOLD,
  HIGH_SCORE_KEY,
  BASE_SHRINK_INTERVAL_MS,
  SHRINK_AMOUNT,
  SPEED_INCREASE_THRESHOLD,
  SPEED_INCREASE_FACTOR,
  MIN_SHRINK_INTERVAL_MS,
} from '../utils/constants';

export function useGameState() {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [bonusActive, setBonusActive] = useState(false);
  const [bonusTimeLeft, setBonusTimeLeft] = useState(0);
  const [highScore, setHighScore] = useLocalStorage(HIGH_SCORE_KEY, 0);
  const [showExplosion, setShowExplosion] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const bonusIntervalRef = useRef(null);
  const shrinkIntervalRef = useRef(null);
  const lastClickTimeRef = useRef(Date.now());

  // Calculate shrink interval based on score
  const getShrinkInterval = useCallback((currentScore) => {
    const speedLevel = Math.floor(currentScore / SPEED_INCREASE_THRESHOLD);
    const interval = BASE_SHRINK_INTERVAL_MS * Math.pow(SPEED_INCREASE_FACTOR, speedLevel);
    return Math.max(interval, MIN_SHRINK_INTERVAL_MS);
  }, []);

  // Computed values
  const heartScale = HEART_MIN_SCALE + (clicks / CLICKS_TO_EXPLOSION) * (HEART_MAX_SCALE - HEART_MIN_SCALE);
  const isShaking = clicks >= SHAKE_THRESHOLD && clicks < PULSE_THRESHOLD;
  const isPulsing = clicks >= PULSE_THRESHOLD;
  const pointsPerClick = bonusActive ? BONUS_MULTIPLIER : 1;

  // Reset game
  const resetGame = useCallback(() => {
    setScore(0);
    setClicks(0);
    setBonusActive(false);
    setBonusTimeLeft(0);
    setGameOver(false);
    lastClickTimeRef.current = Date.now();
  }, []);

  // Start bonus mode
  const startBonusMode = useCallback(() => {
    if (bonusActive) return; // Don't reset if already active
    
    setBonusActive(true);
    setBonusTimeLeft(BONUS_DURATION_SECONDS);
  }, [bonusActive]);

  // Bonus timer countdown
  useEffect(() => {
    if (!bonusActive) return;

    bonusIntervalRef.current = setInterval(() => {
      setBonusTimeLeft((prev) => {
        if (prev <= 1) {
          setBonusActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (bonusIntervalRef.current) {
        clearInterval(bonusIntervalRef.current);
      }
    };
  }, [bonusActive]);

  // Shrink mechanic - heart shrinks if you don't click fast enough
  useEffect(() => {
    if (gameOver) return;

    const checkShrink = () => {
      const now = Date.now();
      const timeSinceLastClick = now - lastClickTimeRef.current;
      const currentInterval = getShrinkInterval(score);

      if (timeSinceLastClick >= currentInterval) {
        setClicks((prev) => {
          const newClicks = Math.max(0, prev - SHRINK_AMOUNT);
          
          // Game over if clicks reach 0 and we had some progress
          if (newClicks === 0 && score > 0) {
            setGameOver(true);
          }
          
          return newClicks;
        });
        lastClickTimeRef.current = now;
      }
    };

    // Check more frequently than the shrink interval
    shrinkIntervalRef.current = setInterval(checkShrink, 100);

    return () => {
      if (shrinkIntervalRef.current) {
        clearInterval(shrinkIntervalRef.current);
      }
    };
  }, [score, gameOver, getShrinkInterval]);

  // Handle click
  const handleClick = useCallback(() => {
    if (gameOver) {
      resetGame();
      return { points: 0, triggered: false, isBonus: false, wasGameOver: true };
    }

    lastClickTimeRef.current = Date.now();
    
    const newClicks = clicks + 1;
    const newScore = score + pointsPerClick;

    setScore(newScore);
    setClicks(newClicks);

    // Update high score
    if (newScore > highScore) {
      setHighScore(newScore);
    }

    // Check for explosion
    if (newClicks >= CLICKS_TO_EXPLOSION) {
      setShowExplosion(true);
      setClicks(0);
      startBonusMode();
      
      // Hide explosion after animation
      setTimeout(() => setShowExplosion(false), 600);
      
      return { points: pointsPerClick, triggered: true, isBonus: bonusActive, wasGameOver: false };
    }

    return { points: pointsPerClick, triggered: false, isBonus: bonusActive, wasGameOver: false };
  }, [clicks, score, pointsPerClick, highScore, setHighScore, startBonusMode, bonusActive, gameOver, resetGame]);

  return {
    // State
    score,
    clicks,
    bonusActive,
    bonusTimeLeft,
    highScore,
    showExplosion,
    gameOver,
    
    // Computed
    heartScale,
    isShaking,
    isPulsing,
    pointsPerClick,
    shrinkInterval: getShrinkInterval(score),
    
    // Actions
    handleClick,
    resetGame,
  };
}
