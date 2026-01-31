import { motion, AnimatePresence } from 'framer-motion';

function BonusTimer({ active, timeLeft }) {
  return (
    <div className="h-20 flex items-center justify-center">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="flex items-center gap-3"
          >
            <span className="text-3xl">⭐</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gold">BONUS:</span>
              <motion.span
                key={timeLeft}
                className="text-5xl font-black text-gold"
                initial={{ scale: 1.3, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ 
                  textShadow: '0 2px 15px rgba(255, 215, 0, 0.6)',
                  minWidth: '60px',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
              >
                {timeLeft}
              </motion.span>
              <span className="text-2xl font-bold text-gold">s</span>
            </div>
            <span className="text-3xl">⭐</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BonusTimer;
