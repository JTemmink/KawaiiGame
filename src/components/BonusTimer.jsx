import { motion, AnimatePresence } from 'framer-motion';

function BonusTimer({ active, timeLeft }) {
  return (
    <div className="h-12 flex items-center justify-center">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">⭐</span>
            <motion.p
              className="text-2xl font-black text-gold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)' }}
            >
              BONUS: {timeLeft}s
            </motion.p>
            <span className="text-2xl">⭐</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BonusTimer;
