import { motion } from 'framer-motion';

function ScoreDisplay({ score, highScore, bonusActive, level, coins, onOpenShop }) {
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

      {/* Level badge - more prominent */}
      <motion.div
        key={level}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-3 font-black text-lg shadow-lg ${
          bonusActive 
            ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white' 
            : 'bg-gradient-to-r from-pink-400 to-pink-600 text-white'
        }`}
        style={{
          boxShadow: bonusActive
            ? '0 4px 15px rgba(255, 215, 0, 0.5)'
            : '0 4px 15px rgba(255, 105, 180, 0.4)',
        }}
      >
        <span className="text-xl">⭐</span>
        <span>Level {level}</span>
        <span className="text-xl">⭐</span>
      </motion.div>

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

      {/* High score and Coins row */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm">
          <span className="text-xs text-gray-500">🏆</span>
          <span className="text-sm font-black text-pink-primary">{highScore.toLocaleString()}</span>
        </div>
        
        {/* Coins / Shop button */}
        <button
          onClick={onOpenShop}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-md hover:scale-105 transition-transform"
        >
          <span className="text-sm">💰</span>
          <span className="text-sm font-black text-white">{coins.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
}

export default ScoreDisplay;
