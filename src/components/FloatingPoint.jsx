import { motion } from 'framer-motion';

function FloatingPoint({ x, y, points, id, onComplete }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-50 font-black text-2xl"
      style={{ 
        left: x, 
        top: y,
        color: points > 1 ? '#FFD700' : '#FF69B4',
        textShadow: points > 1 
          ? '0 2px 8px rgba(255, 215, 0, 0.5)' 
          : '0 2px 4px rgba(255, 105, 180, 0.3)',
      }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -60, scale: 0.5 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onAnimationComplete={() => onComplete(id)}
    >
      +{points}
    </motion.div>
  );
}

export default FloatingPoint;
