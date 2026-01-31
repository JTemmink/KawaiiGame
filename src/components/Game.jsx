import { useState, useCallback, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useClickSound } from '../hooks/useClickSound';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { submitHighscore, checkIfTopScore, getTopHighscores } from '../lib/supabase';
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
import BonusAnnouncement from './BonusAnnouncement';
import Shop from './Shop';
import CollectionBook from './CollectionBook';
import { NewHighScoreCelebration, RankUpCelebration, LevelUpCelebration } from './Celebrations';

function Game() {
  const {
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
    level,
    levelColors,
    heartScale,
    isShaking,
    isPulsing,
    handleClick,
    resetGame,
    purchaseUpgrade,
    purchaseCosmetic,
    setSelectedCharacter,
    setSelectedHeart,
  } = useGameState();

  const [floatingPoints, setFloatingPoints] = useState([]);
  const [screenShake, setScreenShake] = useState(false);
  const [playerName, setPlayerName] = useLocalStorage(PLAYER_NAME_KEY, '');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [showBonusAnnouncement, setShowBonusAnnouncement] = useState(false);
  const [showHighScoreCelebration, setShowHighScoreCelebration] = useState(false);
  const [rankUp, setRankUp] = useState({ show: false, newRank: 0, oldRank: 0 });
  const prevBonusActive = useRef(false);
  const prevHighScoreRef = useRef(highScore);
  const previousRankRef = useRef(null);
  
  const { playClick, playBonusClick, playBonusStart, playGameOver } = useClickSound();

  // Show bonus announcement when bonus starts
  useEffect(() => {
    if (bonusActive && !prevBonusActive.current) {
      setShowBonusAnnouncement(true);
      setTimeout(() => setShowBonusAnnouncement(false), 1500);
    }
    prevBonusActive.current = bonusActive;
  }, [bonusActive]);

  // Show high score celebration
  useEffect(() => {
    if (isNewHighScore && score > prevHighScoreRef.current && !showHighScoreCelebration) {
      setShowHighScoreCelebration(true);
      setTimeout(() => setShowHighScoreCelebration(false), 3000);
    }
    prevHighScoreRef.current = highScore;
  }, [isNewHighScore, score, highScore, showHighScoreCelebration]);

  // Handle name submission
  const handleNameSubmit = (name) => {
    setPlayerName(name);
  };

  // Submit score and check rank when game over
  useEffect(() => {
    if (gameOver && playerName && score > 0 && !scoreSubmitted) {
      playGameOver();
      
      // Get current rank before submitting
      getTopHighscores().then((scores) => {
        const currentRank = scores.findIndex(s => s.player_name === playerName) + 1;
        previousRankRef.current = currentRank > 0 ? currentRank : 11;
      });
      
      // Check if score qualifies for top 10 and submit
      checkIfTopScore(score).then((qualifies) => {
        if (qualifies) {
          submitHighscore(playerName, score, level).then(() => {
            // Check new rank after submitting
            getTopHighscores().then((scores) => {
              const newRank = scores.findIndex(s => s.player_name === playerName && s.score === score) + 1;
              if (newRank > 0 && newRank < previousRankRef.current) {
                setRankUp({ show: true, newRank, oldRank: previousRankRef.current });
                setTimeout(() => setRankUp({ show: false, newRank: 0, oldRank: 0 }), 4000);
              }
            });
          });
        }
      });
      setScoreSubmitted(true);
    }
  }, [gameOver, playerName, score, level, scoreSubmitted, playGameOver]);

  // Reset scoreSubmitted when starting new game
  useEffect(() => {
    if (!gameOver) {
      setScoreSubmitted(false);
      setShowHighScoreCelebration(false);
    }
  }, [gameOver]);

  const onTap = useCallback((event) => {
    const result = handleClick();

    if (result.wasGameOver) return;

    if (result.isBonus) {
      playBonusClick();
    } else {
      playClick();
    }

    const rect = event.target.getBoundingClientRect();
    const x = event.clientX || (event.touches?.[0]?.clientX ?? rect.left + rect.width / 2);
    const y = event.clientY || (event.touches?.[0]?.clientY ?? rect.top);

    if (result.points > 0) {
      const id = Date.now() + Math.random();
      setFloatingPoints((prev) => [...prev, { id, x, y, points: result.points }]);
    }

    if (result.triggered) {
      setScreenShake(true);
      playBonusStart();
      setTimeout(() => setScreenShake(false), 300);
    }
  }, [handleClick, playClick, playBonusClick, playBonusStart]);

  const removeFloatingPoint = useCallback((id) => {
    setFloatingPoints((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handlePurchaseUpgrade = useCallback((item, price) => {
    purchaseUpgrade(item, price);
  }, [purchaseUpgrade]);

  const handlePurchaseCosmetic = useCallback((type, item) => {
    purchaseCosmetic(type, item);
  }, [purchaseCosmetic]);

  return (
    <>
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
          {bonusActive && (
            <div 
              className="fixed inset-0 pointer-events-none animate-glow-pulse z-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
              }}
            />
          )}

          {/* Top buttons */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={() => setShowCollection(true)}
              className="p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors text-xl"
              title="Verzamelboek"
            >
              📖
            </button>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors text-xl"
              title="Leaderboard"
            >
              🏆
            </button>
          </div>

          <div className="z-10">
            <ScoreDisplay 
              score={score} 
              highScore={highScore} 
              bonusActive={bonusActive} 
              level={level}
              coins={coins}
              onOpenShop={() => setShowShop(true)}
            />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center z-10">
            <KawaiiHand
              onTap={onTap}
              heartScale={heartScale}
              isShaking={isShaking}
              isPulsing={isPulsing}
              bonusActive={bonusActive}
              selectedCharacter={selectedCharacter}
              selectedHeart={selectedHeart}
            />
            <ClickCounter clicks={clicks} bonusActive={bonusActive} />
          </div>

          <div className="z-10">
            <BonusTimer active={bonusActive} timeLeft={bonusTimeLeft} />
          </div>

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

          <ExplosionFlash show={showExplosion} />
          <Particles show={showExplosion} />
          <BonusAnnouncement show={showBonusAnnouncement} />
          <NewHighScoreCelebration show={showHighScoreCelebration} />
          <RankUpCelebration show={rankUp.show} newRank={rankUp.newRank} oldRank={rankUp.oldRank} />
          <LevelUpCelebration show={showLevelUp} level={level} />

          <GameOverOverlay 
            show={gameOver} 
            score={score} 
            highScore={highScore}
            earnedCoins={Math.floor(score * 0.1)}
            onShowLeaderboard={() => setShowLeaderboard(true)}
            onRestart={resetGame}
          />
        </div>
      </ScreenShake>

      <Leaderboard 
        show={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)}
        currentPlayerName={playerName}
      />

      <Shop
        show={showShop}
        onClose={() => setShowShop(false)}
        coins={coins}
        level={level}
        ownedUpgrades={ownedUpgrades}
        ownedCosmetics={ownedCosmetics}
        selectedCharacter={selectedCharacter}
        selectedHeart={selectedHeart}
        onPurchaseUpgrade={handlePurchaseUpgrade}
        onPurchaseCosmetic={handlePurchaseCosmetic}
        onSelectCharacter={setSelectedCharacter}
        onSelectHeart={setSelectedHeart}
      />

      <CollectionBook
        show={showCollection}
        onClose={() => setShowCollection(false)}
        ownedCosmetics={ownedCosmetics}
      />
    </>
  );
}

export default Game;
