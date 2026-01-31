import { motion, AnimatePresence } from 'framer-motion';

// New High Score celebration
export function NewHighScoreCelebration({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          initial={{ opacity: 0, y: -50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <motion.div
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 px-6 py-3 rounded-2xl shadow-2xl"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 215, 0, 0.5)',
                '0 0 40px rgba(255, 215, 0, 0.8)',
                '0 0 20px rgba(255, 215, 0, 0.5)',
              ],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <motion.div
              className="flex items-center gap-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <span className="text-3xl">🏆</span>
              <div className="text-center">
                <p className="text-white font-black text-lg leading-tight">NIEUWE</p>
                <p className="text-white font-black text-xl leading-tight">HIGH SCORE!</p>
              </div>
              <span className="text-3xl">🏆</span>
            </motion.div>
          </motion.div>
          
          {/* Sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.cos((i / 8) * Math.PI * 2) * 80,
                y: Math.sin((i / 8) * Math.PI * 2) * 50,
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              style={{ left: '50%', top: '50%' }}
            >
              ✨
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Rank Up celebration
export function RankUpCelebration({ show, newRank, oldRank }) {
  if (!show || newRank >= oldRank) return null;

  const rankEmoji = newRank === 1 ? '🥇' : newRank === 2 ? '🥈' : newRank === 3 ? '🥉' : '🎉';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-40 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ type: 'spring', damping: 15, delay: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-6 py-3 rounded-2xl shadow-2xl"
            animate={{
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.5)',
                '0 0 40px rgba(236, 72, 153, 0.8)',
                '0 0 20px rgba(168, 85, 247, 0.5)',
              ],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <motion.div
              className="flex items-center gap-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <span className="text-3xl">{rankEmoji}</span>
              <div className="text-center">
                <p className="text-white font-black text-sm leading-tight">RANK UP!</p>
                <p className="text-white font-black text-xl leading-tight">#{newRank} in Top 10</p>
              </div>
              <span className="text-3xl">{rankEmoji}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Level Up celebration
export function LevelUpCelebration({ show, level }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: [0, 1.2, 1], rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.p
              className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
              style={{
                textShadow: '0 0 30px rgba(236, 72, 153, 0.5)',
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3, repeat: 3 }}
            >
              LEVEL {level}!
            </motion.p>
            <motion.p
              className="text-2xl text-pink-400 font-bold mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ⭐ Moeilijker & Duurder! ⭐
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
