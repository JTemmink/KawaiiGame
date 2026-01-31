import { motion, AnimatePresence } from 'framer-motion';

function GameOverOverlay({ show, score, highScore, earnedCoins, onShowLeaderboard, onRestart }) {
  const isNewHighScore = score >= highScore && score > 0;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onRestart}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 mx-4 text-center shadow-2xl max-w-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.p
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              💔
            </motion.p>
            
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Game Over!
            </h2>
            
            <p className="text-gray-600 mb-4">
              Je was niet snel genoeg...
            </p>

            <div className="bg-pink-light rounded-2xl p-4 mb-3">
              <p className="text-sm text-gray-500 uppercase tracking-wide">Score</p>
              <p className="text-4xl font-black text-pink-primary">{score.toLocaleString()}</p>
              
              {isNewHighScore && (
                <motion.p
                  className="text-gold font-bold mt-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  ⭐ Nieuwe High Score! ⭐
                </motion.p>
              )}
            </div>

            {/* Earned coins */}
            <motion.div 
              className="flex items-center justify-center gap-2 mb-4 py-2 px-4 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <span className="text-xl">💰</span>
              <span className="font-black text-amber-600">+{earnedCoins}</span>
              <span className="text-sm text-amber-600">coins verdiend!</span>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowLeaderboard();
              }}
              className="w-full py-2 mb-2 rounded-xl bg-gradient-to-r from-pink-primary to-pink-dark text-white font-bold hover:scale-105 transition-transform"
            >
              🏆 Bekijk Top 10
            </button>

            <button
              onClick={onRestart}
              className="w-full py-2 mb-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
            >
              🔄 Opnieuw Spelen
            </button>

            <p className="text-gray-400 text-xs">
              Of tik buiten dit venster
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GameOverOverlay;
