import { motion } from 'framer-motion';
import HeartSVG from './HeartSVG';

function KawaiiHand({ onTap, heartScale, isShaking, isPulsing, bonusActive }) {
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      onTap={onTap}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Glow ring behind hand */}
      <div 
        className={`absolute inset-0 -m-8 rounded-full transition-opacity duration-300 ${
          bonusActive 
            ? 'bg-gold/30 animate-glow-pulse opacity-100' 
            : 'bg-pink-primary/20 opacity-0 hover:opacity-100'
        }`}
        style={{ filter: 'blur(20px)' }}
      />

      {/* Heart that grows */}
      <HeartSVG 
        scale={heartScale} 
        isShaking={isShaking} 
        isPulsing={isPulsing}
        bonusActive={bonusActive}
      />

      {/* The hand image */}
      <img
        src="/Kawaii hand.jpg"
        alt="Kawaii Hand"
        className="w-48 h-auto relative z-0 pointer-events-none"
        style={{
          filter: bonusActive 
            ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))' 
            : 'drop-shadow(0 8px 24px rgba(255, 105, 180, 0.3))',
        }}
        draggable={false}
      />
    </motion.div>
  );
}

export default KawaiiHand;
