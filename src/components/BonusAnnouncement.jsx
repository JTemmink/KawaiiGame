import { motion, AnimatePresence } from 'framer-motion';

function BonusAnnouncement({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ 
              scale: [0, 1.3, 1],
              rotate: [-20, 10, 0],
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            transition={{ 
              duration: 0.5,
              times: [0, 0.6, 1],
              ease: "easeOut"
            }}
          >
            {/* Glow background */}
            <motion.div
              className="absolute inset-0 -m-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
              }}
            />

            {/* Stars */}
            <motion.span
              className="absolute -top-8 -left-8 text-4xl"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              ⭐
            </motion.span>
            <motion.span
              className="absolute -top-8 -right-8 text-4xl"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              ⭐
            </motion.span>
            <motion.span
              className="absolute -bottom-8 -left-4 text-3xl"
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: 2 }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute -bottom-8 -right-4 text-3xl"
              animate={{ rotate: -360, scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: 2 }}
            >
              ✨
            </motion.span>

            {/* Main text */}
            <motion.h1
              className="text-6xl sm:text-8xl font-black relative"
              style={{
                color: '#FFD700',
                textShadow: `
                  0 0 20px rgba(255, 215, 0, 0.8),
                  0 0 40px rgba(255, 215, 0, 0.6),
                  0 0 60px rgba(255, 215, 0, 0.4),
                  0 4px 0 #b45309,
                  0 8px 20px rgba(0,0,0,0.3)
                `,
                WebkitTextStroke: '3px #b45309',
                paintOrder: 'stroke fill',
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 0.3,
                repeat: 4,
              }}
            >
              BONUS!
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl sm:text-2xl font-bold text-amber-700 mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              2x PUNTEN! 🔥
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BonusAnnouncement;
