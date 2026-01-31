import { motion, AnimatePresence } from 'framer-motion';
import { EXPLOSION_PARTICLE_COUNT } from '../utils/constants';

const HEARTS = ['💖', '💗', '💕', '💓', '💝', '✨', '⭐', '🌟'];

function Particle({ emoji, delay, angle, distance }) {
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;
  const rotation = (Math.random() - 0.5) * 720;

  return (
    <motion.span
      className="fixed text-2xl pointer-events-none z-40"
      style={{ left: '50%', top: '50%' }}
      initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      animate={{ 
        opacity: 0, 
        x: tx, 
        y: ty, 
        scale: 0,
        rotate: rotation,
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {emoji}
    </motion.span>
  );
}

function Particles({ show, onComplete }) {
  if (!show) return null;

  const particles = Array.from({ length: EXPLOSION_PARTICLE_COUNT }, (_, i) => ({
    id: i,
    emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
    angle: (i / EXPLOSION_PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5,
    distance: 100 + Math.random() * 100,
    delay: i * 0.02,
  }));

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </AnimatePresence>
  );
}

// Flash overlay
export function ExplosionFlash({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 70%)',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </AnimatePresence>
  );
}

// Screen shake wrapper
export function ScreenShake({ shake, children }) {
  return (
    <motion.div
      className="h-full"
      animate={shake ? {
        x: [0, -5, 5, -5, 5, -3, 3, -1, 1, 0],
        y: [0, -5, -5, 5, 5, -3, -3, 1, 1, 0],
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default Particles;
