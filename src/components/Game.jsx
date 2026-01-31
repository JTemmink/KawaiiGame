import { useState, useCallback } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useClickSound } from '../hooks/useClickSound';
import ScoreDisplay from './ScoreDisplay';
import KawaiiHand from './KawaiiHand';
import ClickCounter from './ClickCounter';
import BonusTimer from './BonusTimer';
import FloatingPoint from './FloatingPoint';
import Particles, { ExplosionFlash, ScreenShake } from './Particles';

function Game() {
  const {
    score,
    clicks,
    bonusActive,
    bonusTimeLeft,
    highScore,
    showExplosion,
    heartScale,
    isShaking,
    isPulsing,
    pointsPerClick,
    handleClick,
  } = useGameState();

  const [floatingPoints, setFloatingPoints] = useState([]);
  const [screenShake, setScreenShake] = useState(false);
  const playClick = useClickSound();

  const onTap = useCallback((event) => {
    // Play click sound
    playClick();

    // Get click position
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX || (event.touches?.[0]?.clientX ?? rect.left + rect.width / 2);
    const y = event.clientY || (event.touches?.[0]?.clientY ?? rect.top);

    const result = handleClick();

    // Add floating point
    const id = Date.now() + Math.random();
    setFloatingPoints((prev) => [...prev, { id, x, y, points: result.points }]);

    // Trigger screen shake on explosion
    if (result.triggered) {
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 300);
    }
  }, [handleClick, playClick]);

  const removeFloatingPoint = useCallback((id) => {
    setFloatingPoints((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ScreenShake shake={screenShake}>
      <div
        className={`min-h-screen min-h-dvh flex flex-col items-center justify-between p-6 transition-all duration-500 ${
          bonusActive
            ? 'bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-50'
            : 'bg-gradient-to-br from-pink-light to-blue-light'
        }`}
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

        {/* Score */}
        <div className="z-10">
          <ScoreDisplay score={score} highScore={highScore} bonusActive={bonusActive} />
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
      </div>
    </ScreenShake>
  );
}

export default Game;
