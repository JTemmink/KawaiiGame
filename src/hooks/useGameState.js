import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  BASE_CLICKS_TO_BONUS,
  BONUS_DURATION_SECONDS,
  BONUS_MULTIPLIER,
  HEART_MIN_SCALE,
  HEART_MAX_SCALE,
  SHAKE_THRESHOLD_PERCENT,
  PULSE_THRESHOLD_PERCENT,
  HIGH_SCORE_KEY,
  COINS_KEY,
  UPGRADES_KEY,
  PERMANENT_UPGRADES_KEY,
  COSMETICS_KEY,
  SELECTED_CHARACTER_KEY,
  SELECTED_HEART_KEY,
  CURRENT_NIVEAU_KEY,
  POINTS_PER_LEVEL,
  LEVELS_PER_NIVEAU,
  NIVEAU_THRESHOLDS,
  BASE_SHRINK_INTERVAL_MS,
  SHRINK_AMOUNT,
  SHRINK_SPEED_FACTOR_PER_LEVEL,
  MIN_SHRINK_INTERVAL_MS,
  LEVEL_COLORS,
  SHOP_UPGRADES,
  SHOP_HEARTS,
} from '../utils/constants';

export function useGameState() {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [bonusActive, setBonusActive] = useState(false);
  const [bonusTimeLeft, setBonusTimeLeft] = useState(0);
  const [highScore, setHighScore] = useLocalStorage(HIGH_SCORE_KEY, 0);
  const [coins, setCoins] = useLocalStorage(COINS_KEY, 0);
  
  // Current niveau upgrades (reset when niveau changes)
  const [currentNiveauUpgrades, setCurrentNiveauUpgrades] = useLocalStorage(UPGRADES_KEY, []);
  // Permanent stacked upgrades (count per upgrade type across all niveaus)
  const [permanentUpgrades, setPermanentUpgrades] = useLocalStorage(PERMANENT_UPGRADES_KEY, {});
  // Current niveau (persisted)
  const [savedNiveau, setSavedNiveau] = useLocalStorage(CURRENT_NIVEAU_KEY, 1);
  
  const [ownedCosmetics, setOwnedCosmetics] = useLocalStorage(COSMETICS_KEY, []);
  const [selectedCharacter, setSelectedCharacter] = useLocalStorage(SELECTED_CHARACTER_KEY, 'default_hand');
  const [selectedHeart, setSelectedHeart] = useLocalStorage(SELECTED_HEART_KEY, 'default_heart');
  const [showExplosion, setShowExplosion] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showNiveauUp, setShowNiveauUp] = useState(false);
  const [bonusBoostUsed, setBonusBoostUsed] = useState(false); // Track if bonus boost was used this bonus

  const bonusIntervalRef = useRef(null);
  const shrinkIntervalRef = useRef(null);
  const autoClickIntervalRef = useRef(null);
  const lastClickTimeRef = useRef(Date.now());
  const previousLevelRef = useRef(1);
  const previousNiveauRef = useRef(savedNiveau);

  // Calculate niveau from score
  const getNiveauFromScore = useCallback((currentScore) => {
    for (let i = NIVEAU_THRESHOLDS.length - 1; i >= 0; i--) {
      if (currentScore >= NIVEAU_THRESHOLDS[i]) {
        return i + 1;
      }
    }
    return 1;
  }, []);

  // Current niveau based on score
  const niveau = getNiveauFromScore(score);
  
  // Level within current play session (resets each game, changes background)
  const level = Math.floor(score / POINTS_PER_LEVEL) + 1;
  
  // Clicks needed for bonus (doubles each niveau)
  const clicksToBonus = BASE_CLICKS_TO_BONUS * Math.pow(2, niveau - 1);
  
  // Get stacked upgrade count (how many times bought across all niveaus)
  const getUpgradeStack = useCallback((upgradeId) => {
    return permanentUpgrades[upgradeId] || 0;
  }, [permanentUpgrades]);

  // Check if upgrade is bought in current niveau
  const hasCurrentNiveauUpgrade = useCallback((upgradeId) => {
    return currentNiveauUpgrades.includes(upgradeId);
  }, [currentNiveauUpgrades]);

  // Calculate stacked effect values
  const clickMultiplier = Math.pow(2, getUpgradeStack('double_tap')); // 2^n: 1, 2, 4, 8...
  const shrinkSlowFactor = Math.pow(0.7, getUpgradeStack('slow_shrink')); // 0.7^n: 1, 0.7, 0.49...
  const bonusMultiplier = Math.pow(3, getUpgradeStack('triple_bonus')) * BONUS_MULTIPLIER; // 3^n * 2
  const autoClickRate = getUpgradeStack('auto_click'); // 1 per stack
  const explosionBonus = getUpgradeStack('mega_explosion') * 50; // +50 per stack
  
  // Bonus extend is single-use per bonus round
  const bonusExtendAvailable = hasCurrentNiveauUpgrade('bonus_extend') && !bonusBoostUsed;
  const bonusExtendSeconds = bonusExtendAvailable ? 2 : 0;

  // Calculate shrink interval based on level
  const getShrinkInterval = useCallback((currentLevel) => {
    const baseInterval = BASE_SHRINK_INTERVAL_MS * Math.pow(SHRINK_SPEED_FACTOR_PER_LEVEL, currentLevel - 1);
    const interval = baseInterval * shrinkSlowFactor;
    return Math.max(interval, MIN_SHRINK_INTERVAL_MS);
  }, [shrinkSlowFactor]);

  // Level colors (cycle through)
  const levelColors = LEVEL_COLORS[(level - 1) % LEVEL_COLORS.length];
  
  // Heart scaling based on clicks to bonus
  const heartScale = HEART_MIN_SCALE + (clicks / clicksToBonus) * (HEART_MAX_SCALE - HEART_MIN_SCALE);
  const shakeThreshold = Math.floor(clicksToBonus * SHAKE_THRESHOLD_PERCENT);
  const pulseThreshold = Math.floor(clicksToBonus * PULSE_THRESHOLD_PERCENT);
  const isShaking = clicks >= shakeThreshold && clicks < pulseThreshold;
  const isPulsing = clicks >= pulseThreshold;
  const pointsPerClick = bonusActive ? bonusMultiplier : 1;

  // Get selected heart color
  const selectedHeartData = SHOP_HEARTS.find(h => h.id === selectedHeart);
  const heartColor = selectedHeartData?.color || '#FF69B4';

  // Check for level up
  useEffect(() => {
    if (level > previousLevelRef.current && score > 0) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
    previousLevelRef.current = level;
  }, [level, score]);

  // Check for niveau up
  useEffect(() => {
    if (niveau > previousNiveauRef.current && score > 0) {
      setShowNiveauUp(true);
      // Reset current niveau upgrades when going up a niveau
      setCurrentNiveauUpgrades([]);
      setSavedNiveau(niveau);
      setTimeout(() => setShowNiveauUp(false), 3000);
    }
    previousNiveauRef.current = niveau;
  }, [niveau, score, setCurrentNiveauUpgrades, setSavedNiveau]);

  // Get price for upgrade at current niveau
  const getUpgradePrice = useCallback((upgrade) => {
    const niveauIndex = Math.min(niveau - 1, upgrade.basePrices.length - 1);
    return upgrade.basePrices[niveauIndex];
  }, [niveau]);

  // Purchase upgrade
  const purchaseUpgrade = useCallback((item, price) => {
    if (coins >= price && !currentNiveauUpgrades.includes(item.id)) {
      setCoins(coins - price);
      // Add to current niveau upgrades
      setCurrentNiveauUpgrades([...currentNiveauUpgrades, item.id]);
      // Add to permanent stacks (except single-use items)
      if (!item.singleUse) {
        setPermanentUpgrades(prev => ({
          ...prev,
          [item.id]: (prev[item.id] || 0) + 1
        }));
      }
      return true;
    }
    return false;
  }, [coins, currentNiveauUpgrades, setCoins, setCurrentNiveauUpgrades, setPermanentUpgrades]);

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
    setBonusBoostUsed(false);
    lastClickTimeRef.current = Date.now();
    previousLevelRef.current = 1;
    previousNiveauRef.current = 1;
    // Reset current niveau upgrades for new game
    setCurrentNiveauUpgrades([]);
  }, [setCurrentNiveauUpgrades]);

  // Start bonus mode
  const startBonusMode = useCallback(() => {
    if (bonusActive) return;
    
    setBonusActive(true);
    setBonusBoostUsed(false); // Reset bonus boost for new bonus round
    const duration = BONUS_DURATION_SECONDS + (bonusExtendAvailable ? 2 : 0);
    setBonusTimeLeft(duration);
    
    // Mark bonus boost as used if we had it
    if (bonusExtendAvailable) {
      setBonusBoostUsed(true);
    }
  }, [bonusActive, bonusExtendAvailable]);

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
        if (newClicks >= clicksToBonus) {
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
  }, [autoClickRate, gameOver, bonusActive, bonusMultiplier, highScore, setHighScore, startBonusMode, clicksToBonus]);

  // Shrink mechanic
  useEffect(() => {
    if (gameOver) return;

    const checkShrink = () => {
      const now = Date.now();
      const timeSinceLastClick = now - lastClickTimeRef.current;
      const currentInterval = getShrinkInterval(level);

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
  }, [score, level, gameOver, getShrinkInterval]);

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
    setClicks(Math.min(newClicks, clicksToBonus));

    // Check for new high score
    if (newScore > highScore) {
      setHighScore(newScore);
      if (!isNewHighScore) {
        setIsNewHighScore(true);
      }
    }

    // Check for bonus trigger
    if (newClicks >= clicksToBonus) {
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
  }, [clicks, score, pointsPerClick, highScore, setHighScore, startBonusMode, bonusActive, gameOver, resetGame, clickMultiplier, explosionBonus, isNewHighScore, clicksToBonus]);

  return {
    // State
    score,
    clicks,
    bonusActive,
    bonusTimeLeft,
    highScore,
    coins,
    currentNiveauUpgrades,
    permanentUpgrades,
    ownedCosmetics,
    selectedCharacter,
    selectedHeart,
    showExplosion,
    gameOver,
    isNewHighScore,
    showLevelUp,
    showNiveauUp,
    
    // Computed
    level,
    niveau,
    levelColors,
    heartScale,
    heartColor,
    isShaking,
    isPulsing,
    pointsPerClick,
    clicksToBonus,
    shrinkInterval: getShrinkInterval(level),
    
    // Upgrade info
    clickMultiplier,
    bonusMultiplier,
    autoClickRate,
    explosionBonus,
    bonusExtendAvailable,
    
    // Actions
    handleClick,
    resetGame,
    purchaseUpgrade,
    purchaseCosmetic,
    setSelectedCharacter,
    setSelectedHeart,
    getUpgradePrice,
    getUpgradeStack,
    hasCurrentNiveauUpgrade,
  };
}
