import { useState, useCallback, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useClickSound } from '../hooks/useClickSound';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { submitHighscore, checkIfTopScore } from '../lib/supabase';
import { PLAYER_NAME_KEY } from '../utils/constants';
import ScoreDisplay from './ScoreDisplay';
import KawaiiHand from './KawaiiHand';
import ClickCounter from './ClickCounter';
import BonusTimer from './BonusTimer';
import FloatingPoint from './FloatingPoint';
import Particles, { ExplosionFlash, ScreenShake } from './Particles';
import GameOverOverlay from './GameOverOverlay';
import NameInputModal from './NameInputModal';
import Leaderboard from './Leaderboard';

function Game() {
  const {
    score,
    clicks,
    bonusActive,
    bonusTimeLeft,
    highScore,
    showExplosion,
    gameOver,
    level,
    levelColors,
    heartScale,
    isShaking,
    isPulsing,
    handleClick,
  } = useGameState();

  const [floatingPoints, setFloatingPoints] = useState([]);
  const [screenShake, setScreenShake] = useState(false);
  const [playerName, setPlayerName] = useLocalStorage(PLAYER_NAME_KEY, '');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  
  const { playClick, playBonusClick, playBonusStart, playGameOver } = useClickSound();

  // Handle name submission
  const handleNameSubmit = (name) => {
    setPlayerName(name);
  };

  // Submit score when game over
  useEffect(() => {
    if (gameOver && playerName && score > 0 && !scoreSubmitted) {
      playGameOver();
      
      // Check if score qualifies for top 10 and submit
      checkIfTopScore(score).then((qualifies) => {
        if (qualifies) {
          submitHighscore(playerName, score, level);
        }
      });
      setScoreSubmitted(true);
    }
  }, [gameOver, playerName, score, level, scoreSubmitted, playGameOver]);

  // Reset scoreSubmitted when starting new game
  useEffect(() => {
    if (!gameOver) {
      setScoreSubmitted(false);
    }
  }, [gameOver]);

  const onTap = useCallback((event) => {
    const result = handleClick();

    // If it was game over, just restart - no sounds/effects
    if (result.wasGameOver) return;

    // Play appropriate click sound
    if (result.isBonus) {
      playBonusClick();
    } else {
      playClick();
    }

    // Get click position
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX || (event.touches?.[0]?.clientX ?? rect.left + rect.width / 2);
    const y = event.clientY || (event.touches?.[0]?.clientY ?? rect.top);

    // Add floating point
    if (result.points > 0) {
      const id = Date.now() + Math.random();
      setFloatingPoints((prev) => [...prev, { id, x, y, points: result.points }]);
    }

    // Trigger screen shake and bonus sound on explosion
    if (result.triggered) {
      setScreenShake(true);
      playBonusStart();
      setTimeout(() => setScreenShake(false), 300);
    }
  }, [handleClick, playClick, playBonusClick, playBonusStart]);

  const removeFloatingPoint = useCallback((id) => {
    setFloatingPoints((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <>
      {/* Name input modal - only shows once */}
      <NameInputModal show={!playerName} onSubmit={handleNameSubmit} />

      <ScreenShake shake={screenShake}>
        <div
          className="min-h-screen min-h-dvh flex flex-col items-center justify-between p-6 transition-all duration-500"
          style={{
            background: bonusActive
              ? 'linear-gradient(to bottom right, #FFFBEB, #FEF3C7, #FFFBEB)'
              : `linear-gradient(to bottom right, ${levelColors.from}, ${levelColors.to})`,
          }}
        >
          {/* Bonus mode glow overlay */}
          {bonusActive && (
            <div 
              className="fixed inset-0 pointer-events-none animate-glow-pulse z-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
              }}
            />
          )}

          {/* Leaderboard button */}
          <button
            onClick={() => setShowLeaderboard(true)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors"
          >
            🏆
          </button>

          {/* Score + Level */}
          <div className="z-10">
            <ScoreDisplay score={score} highScore={highScore} bonusActive={bonusActive} level={level} />
          </div>

          {/* Game area */}
          <div className="flex-1 flex flex-col items-center justify-center z-10">
            <KawaiiHand
              onTap={onTap}
              heartScale={heartScale}
              isShaking={isShaking}
              isPulsing={isPulsing}
              bonusActive={bonusActive}
            />
            <ClickCounter clicks={clicks} bonusActive={bonusActive} />
          </div>

          {/* Bonus timer */}
          <div className="z-10">
            <BonusTimer active={bonusActive} timeLeft={bonusTimeLeft} />
          </div>

          {/* Floating points */}
          {floatingPoints.map((fp) => (
            <FloatingPoint
              key={fp.id}
              id={fp.id}
              x={fp.x}
              y={fp.y}
              points={fp.points}
              onComplete={removeFloatingPoint}
            />
          ))}

          {/* Explosion effects */}
          <ExplosionFlash show={showExplosion} />
          <Particles show={showExplosion} />

          {/* Game Over overlay */}
          <GameOverOverlay 
            show={gameOver} 
            score={score} 
            highScore={highScore}
            onShowLeaderboard={() => setShowLeaderboard(true)}
          />
        </div>
      </ScreenShake>

      {/* Leaderboard modal */}
      <Leaderboard 
        show={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)}
        currentPlayerName={playerName}
      />
    </>
  );
}

export default Game;
