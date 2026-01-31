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
} from '../utils/constants';

export function useGameState() {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [bonusActive, setBonusActive] = useState(false);
  const [bonusTimeLeft, setBonusTimeLeft] = useState(0);
  const [highScore, setHighScore] = useLocalStorage(HIGH_SCORE_KEY, 0);
  const [showExplosion, setShowExplosion] = useState(false);

  const bonusIntervalRef = useRef(null);

  // Computed values
  const heartScale = HEART_MIN_SCALE + (clicks / CLICKS_TO_EXPLOSION) * (HEART_MAX_SCALE - HEART_MIN_SCALE);
  const isShaking = clicks >= SHAKE_THRESHOLD && clicks < PULSE_THRESHOLD;
  const isPulsing = clicks >= PULSE_THRESHOLD;
  const pointsPerClick = bonusActive ? BONUS_MULTIPLIER : 1;

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

  // Handle click
  const handleClick = useCallback(() => {
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
    }

    return { points: pointsPerClick, triggered: newClicks >= CLICKS_TO_EXPLOSION };
  }, [clicks, score, pointsPerClick, highScore, setHighScore, startBonusMode]);

  return {
    // State
    score,
    clicks,
    bonusActive,
    bonusTimeLeft,
    highScore,
    showExplosion,
    
    // Computed
    heartScale,
    isShaking,
    isPulsing,
    pointsPerClick,
    
    // Actions
    handleClick,
  };
}
