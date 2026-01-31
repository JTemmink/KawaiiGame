import { motion } from 'framer-motion';

function ScoreDisplay({ score, highScore, bonusActive, level }) {
  return (
    <div className="text-center">
      {/* Level badge */}
      <motion.div
        key={level}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`inline-block px-4 py-1 rounded-full mb-2 font-bold text-sm ${
          bonusActive 
            ? 'bg-gold/30 text-amber-700' 
            : 'bg-pink-primary/20 text-pink-dark'
        }`}
      >
        ⭐ Level {level}
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

      {/* High score */}
      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm">
        <span className="text-xs text-gray-500">🏆 Best:</span>
        <span className="text-sm font-black text-pink-primary">{highScore.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default ScoreDisplay;
