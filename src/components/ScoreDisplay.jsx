import { motion } from 'framer-motion';

function ScoreDisplay({ score, highScore, bonusActive, level }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 mb-1">
        <p className="text-xs uppercase tracking-widest text-gray-400">Score</p>
        <motion.span
          key={level}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="px-3 py-1 rounded-full bg-pink-primary/20 text-pink-primary text-xs font-bold"
        >
          Level {level}
        </motion.span>
      </div>
      <motion.p
        className={`text-5xl sm:text-6xl font-black bg-clip-text text-transparent ${
          bonusActive
            ? 'bg-gradient-to-b from-gold to-orange-500'
            : 'bg-gradient-to-b from-pink-primary to-pink-dark'
        }`}
        key={score}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.15 }}
        style={{
          filter: bonusActive 
            ? 'drop-shadow(0 2px 8px rgba(255, 215, 0, 0.5))' 
            : 'drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3))',
        }}
      >
        {score.toLocaleString()}
      </motion.p>
      <p className="text-sm text-gray-500 mt-2">
        Best: <span className="text-pink-primary font-bold">{highScore.toLocaleString()}</span>
      </p>
    </div>
  );
}

export default ScoreDisplay;
