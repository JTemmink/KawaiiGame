import { motion } from 'framer-motion';
import { NIVEAU_THRESHOLDS } from '../utils/constants';

function ScoreDisplay({ score, highScore, bonusActive, level, niveau, coins, clicksToBonus, onOpenShop }) {
  // Calculate progress to next niveau
  const currentThreshold = NIVEAU_THRESHOLDS[niveau - 1] || 0;
  const nextThreshold = NIVEAU_THRESHOLDS[niveau] || currentThreshold * 2;
  const progressToNextNiveau = ((score - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return (
    <div className="text-center">
      {/* Game title */}
      <motion.h1
        className="text-2xl font-black mb-2"
        style={{
          background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #FF69B4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 10px rgba(255, 105, 180, 0.3)',
        }}
      >
        ✨ Kawaii Clicker ✨
      </motion.h1>

      {/* Niveau & Level badges */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {/* Niveau badge (major) */}
        <motion.div
          key={`niveau-${niveau}`}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-black text-sm shadow-lg"
        >
          <span>👑</span>
          <span>Niveau {niveau}</span>
        </motion.div>

        {/* Level badge (minor) */}
        <motion.div
          key={`level-${level}`}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm ${
            bonusActive 
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white' 
              : 'bg-gradient-to-r from-pink-400 to-pink-600 text-white'
          }`}
        >
          <span>⭐</span>
          <span>Lv.{level}</span>
        </motion.div>
      </div>

      {/* Progress to next niveau */}
      <div className="mb-2 px-4">
        <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progressToNextNiveau, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-[10px] text-purple-400 mt-0.5">
          {score.toLocaleString()} / {nextThreshold.toLocaleString()} naar niveau {niveau + 1}
        </p>
      </div>

      {/* Score label */}
      <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1 font-bold">
        Score
      </p>

      {/* Main score */}
      <div className="relative">
        <motion.p
          className={`text-6xl sm:text-7xl font-black ${
            bonusActive
              ? 'text-amber-500'
              : 'text-pink-primary'
          }`}
          key={score}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.15 }}
          style={{
            textShadow: bonusActive 
              ? '0 4px 20px rgba(255, 215, 0, 0.5), 0 2px 4px rgba(0,0,0,0.1)' 
              : '0 4px 20px rgba(255, 105, 180, 0.4), 0 2px 4px rgba(0,0,0,0.1)',
            WebkitTextStroke: bonusActive ? '2px #b45309' : '2px #db2777',
            paintOrder: 'stroke fill',
          }}
        >
          {score.toLocaleString()}
        </motion.p>
      </div>

      {/* Clicks to bonus info */}
      <p className="text-xs text-gray-400 mt-1">
        🎯 {clicksToBonus} kliks voor bonus
      </p>

      {/* High score and Coins row */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm">
          <span className="text-xs text-gray-500">🏆</span>
          <span className="text-sm font-black text-pink-primary">{highScore.toLocaleString()}</span>
        </div>
        
        {/* Coins / Shop button - BIGGER */}
        <motion.button
          onClick={onOpenShop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg hover:shadow-xl transition-shadow"
          style={{
            boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)',
          }}
        >
          <span className="text-xl">💰</span>
          <span className="text-lg font-black text-white">{coins.toLocaleString()}</span>
          <span className="text-lg">🛍️</span>
        </motion.button>
      </div>
    </div>
  );
}

export default ScoreDisplay;
