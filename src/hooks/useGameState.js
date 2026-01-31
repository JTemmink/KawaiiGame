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
  COINS_KEY,
  UPGRADES_KEY,
  COSMETICS_KEY,
  SELECTED_CHARACTER_KEY,
  SELECTED_HEART_KEY,
  BASE_SHRINK_INTERVAL_MS,
  SHRINK_AMOUNT,
  SPEED_INCREASE_THRESHOLD,
  SPEED_INCREASE_FACTOR,
  MIN_SHRINK_INTERVAL_MS,
  LEVEL_COLORS,
  SHOP_UPGRADES,
  PRICE_MULTIPLIER_PER_LEVEL,
} from '../utils/constants';

export function useGameState() {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [bonusActive, setBonusActive] = useState(false);
  const [bonusTimeLeft, setBonusTimeLeft] = useState(0);
  const [highScore, setHighScore] = useLocalStorage(HIGH_SCORE_KEY, 0);
  const [coins, setCoins] = useLocalStorage(COINS_KEY, 0);
  const [ownedUpgrades, setOwnedUpgrades] = useLocalStorage(UPGRADES_KEY, []);
  const [ownedCosmetics, setOwnedCosmetics] = useLocalStorage(COSMETICS_KEY, []);
  const [selectedCharacter, setSelectedCharacter] = useLocalStorage(SELECTED_CHARACTER_KEY, 'default_hand');
  const [selectedHeart, setSelectedHeart] = useLocalStorage(SELECTED_HEART_KEY, 'default_heart');
  const [showExplosion, setShowExplosion] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const bonusIntervalRef = useRef(null);
  const shrinkIntervalRef = useRef(null);
  const autoClickIntervalRef = useRef(null);
  const lastClickTimeRef = useRef(Date.now());
  const previousLevelRef = useRef(1);

  // Get upgrade effect value
  const getUpgradeValue = useCallback((effectType, defaultValue) => {
    const upgrade = SHOP_UPGRADES.find(
      item => ownedUpgrades.includes(item.id) && item.effect.type === effectType
    );
    return upgrade ? upgrade.effect.value : defaultValue;
  }, [ownedUpgrades]);

  // Computed upgrade effects
  const clickMultiplier = getUpgradeValue('click_multiplier', 1);
  const shrinkSlowFactor = getUpgradeValue('shrink_slow', 1);
  const bonusExtend = getUpgradeValue('bonus_extend', 0);
  const bonusMultiplier = getUpgradeValue('bonus_multiplier', BONUS_MULTIPLIER);
  const autoClickRate = getUpgradeValue('auto_click', 0);
  const explosionBonus = getUpgradeValue('explosion_bonus', 0);

  // Calculate shrink interval based on score and upgrades
  const getShrinkInterval = useCallback((currentScore) => {
    const speedLevel = Math.floor(currentScore / SPEED_INCREASE_THRESHOLD);
    const baseInterval = BASE_SHRINK_INTERVAL_MS * Math.pow(SPEED_INCREASE_FACTOR, speedLevel);
    const interval = baseInterval / shrinkSlowFactor;
    return Math.max(interval, MIN_SHRINK_INTERVAL_MS);
  }, [shrinkSlowFactor]);

  // Computed values
  const level = Math.floor(score / SPEED_INCREASE_THRESHOLD) + 1;
  const levelColors = LEVEL_COLORS[Math.min(level - 1, LEVEL_COLORS.length - 1)];
  const heartScale = HEART_MIN_SCALE + (clicks / CLICKS_TO_EXPLOSION) * (HEART_MAX_SCALE - HEART_MIN_SCALE);
  const isShaking = clicks >= SHAKE_THRESHOLD && clicks < PULSE_THRESHOLD;
  const isPulsing = clicks >= PULSE_THRESHOLD;
  const pointsPerClick = bonusActive ? bonusMultiplier : 1;

  // Check for level up
  useEffect(() => {
    if (level > previousLevelRef.current && score > 0) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
    previousLevelRef.current = level;
  }, [level, score]);

  // Get scaled price for upgrades
  const getScaledPrice = useCallback((basePrice) => {
    return Math.floor(basePrice * Math.pow(PRICE_MULTIPLIER_PER_LEVEL, level - 1));
  }, [level]);

  // Purchase upgrade
  const purchaseUpgrade = useCallback((item, price) => {
    if (coins >= price && !ownedUpgrades.includes(item.id)) {
      setCoins(coins - price);
      setOwnedUpgrades([...ownedUpgrades, item.id]);
      return true;
    }
    return false;
  }, [coins, ownedUpgrades, setCoins, setOwnedUpgrades]);

  // Purchase cosmetic
  const purchaseCosmetic = useCallback((type, item) => {
    if (coins >= item.price && !ownedCosmetics.includes(item.id)) {
      setCoins(coins - item.price);
      setOwnedCosmetics([...ownedCosmetics, item.id]);
      // Auto-select after purchase
      if (type === 'character') {
        setSelectedCharacter(item.id);
      } else if (type === 'heart') {
        setSelectedHeart(item.id);
      }
      return true;
    }
    return false;
  }, [coins, ownedCosmetics, setCoins, setOwnedCosmetics, setSelectedCharacter, setSelectedHeart]);

  // Reset game
  const resetGame = useCallback(() => {
    setScore(0);
    setClicks(0);
    setBonusActive(false);
    setBonusTimeLeft(0);
    setGameOver(false);
    setIsNewHighScore(false);
    lastClickTimeRef.current = Date.now();
    previousLevelRef.current = 1;
  }, []);

  // Start bonus mode
  const startBonusMode = useCallback(() => {
    if (bonusActive) return;
    
    setBonusActive(true);
    setBonusTimeLeft(BONUS_DURATION_SECONDS + bonusExtend);
  }, [bonusActive, bonusExtend]);

  // Bonus timer countdown
  useEffect(() => {
    if (!bonusActive) return;

    bonusIntervalRef.current = setInterval(() => {
      setBonusTimeLeft((prev) => {
        if (prev <= 1) {
          setBonusActive(false);
          setClicks(0);
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

  // Auto clicker upgrade
  useEffect(() => {
    if (autoClickRate <= 0 || gameOver) return;

    autoClickIntervalRef.current = setInterval(() => {
      lastClickTimeRef.current = Date.now();
      setClicks((prev) => {
        const newClicks = prev + 1;
        if (newClicks >= CLICKS_TO_EXPLOSION) {
          setShowExplosion(true);
          startBonusMode();
          setTimeout(() => setShowExplosion(false), 600);
          return 0;
        }
        return newClicks;
      });
      setScore((prev) => {
        const newScore = prev + (bonusActive ? bonusMultiplier : 1);
        if (newScore > highScore) {
          setHighScore(newScore);
          setIsNewHighScore(true);
        }
        return newScore;
      });
    }, 1000 / autoClickRate);

    return () => {
      if (autoClickIntervalRef.current) {
        clearInterval(autoClickIntervalRef.current);
      }
    };
  }, [autoClickRate, gameOver, bonusActive, bonusMultiplier, highScore, setHighScore, startBonusMode]);

  // Shrink mechanic
  useEffect(() => {
    if (gameOver) return;

    const checkShrink = () => {
      const now = Date.now();
      const timeSinceLastClick = now - lastClickTimeRef.current;
      const currentInterval = getShrinkInterval(score);

      if (timeSinceLastClick >= currentInterval) {
        setClicks((prev) => {
          const newClicks = Math.max(0, prev - SHRINK_AMOUNT);
          
          if (newClicks === 0 && score > 0) {
            setGameOver(true);
          }
          
          return newClicks;
        });
        lastClickTimeRef.current = now;
      }
    };

    shrinkIntervalRef.current = setInterval(checkShrink, 100);

    return () => {
      if (shrinkIntervalRef.current) {
        clearInterval(shrinkIntervalRef.current);
      }
    };
  }, [score, gameOver, getShrinkInterval]);

  // Award coins on game over (10% of score)
  useEffect(() => {
    if (gameOver && score > 0) {
      const earnedCoins = Math.floor(score * 0.1);
      setCoins((prev) => prev + earnedCoins);
    }
  }, [gameOver, score, setCoins]);

  // Handle click
  const handleClick = useCallback(() => {
    if (gameOver) {
      resetGame();
      return { points: 0, triggered: false, isBonus: false, wasGameOver: true };
    }

    lastClickTimeRef.current = Date.now();
    
    const clicksToAdd = clickMultiplier;
    const newClicks = clicks + clicksToAdd;
    const newScore = score + pointsPerClick;

    setScore(newScore);
    setClicks(Math.min(newClicks, CLICKS_TO_EXPLOSION));

    // Check for new high score
    if (newScore > highScore) {
      setHighScore(newScore);
      if (!isNewHighScore) {
        setIsNewHighScore(true);
      }
    }

    // Check for explosion
    if (newClicks >= CLICKS_TO_EXPLOSION) {
      setShowExplosion(true);
      setClicks(0);
      startBonusMode();
      
      if (explosionBonus > 0) {
        setScore((prev) => prev + explosionBonus);
      }
      
      setTimeout(() => setShowExplosion(false), 600);
      
      return { points: pointsPerClick, triggered: true, isBonus: bonusActive, wasGameOver: false };
    }

    return { points: pointsPerClick, triggered: false, isBonus: bonusActive, wasGameOver: false };
  }, [clicks, score, pointsPerClick, highScore, setHighScore, startBonusMode, bonusActive, gameOver, resetGame, clickMultiplier, explosionBonus, isNewHighScore]);

  return {
    // State
    score,
    clicks,
    bonusActive,
    bonusTimeLeft,
    highScore,
    coins,
    ownedUpgrades,
    ownedCosmetics,
    selectedCharacter,
    selectedHeart,
    showExplosion,
    gameOver,
    isNewHighScore,
    showLevelUp,
    
    // Computed
    level,
    levelColors,
    heartScale,
    isShaking,
    isPulsing,
    pointsPerClick,
    shrinkInterval: getShrinkInterval(score),
    
    // Actions
    handleClick,
    resetGame,
    purchaseUpgrade,
    purchaseCosmetic,
    setSelectedCharacter,
    setSelectedHeart,
    getScaledPrice,
  };
}
