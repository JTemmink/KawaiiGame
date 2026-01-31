import { motion } from 'framer-motion';

function HeartSVG({ scale = 1, isShaking, isPulsing, bonusActive }) {
  const baseSize = 62;

  return (
    <motion.div
      className="absolute top-[8px] left-[35%] -translate-x-1/2 z-10"
      animate={{
        scale,
        x: isShaking ? [0, -3, 3, -3, 3, 0] : 0,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        x: { duration: 0.1, repeat: isShaking ? Infinity : 0 },
      }}
    >
      <motion.svg
        width={baseSize}
        height={baseSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`drop-shadow-lg ${isPulsing ? 'animate-pulse-fast' : ''}`}
        animate={bonusActive ? { 
          filter: ['drop-shadow(0 0 8px #FFD700)', 'drop-shadow(0 0 20px #FFD700)', 'drop-shadow(0 0 8px #FFD700)']
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF69B4" />
            <stop offset="100%" stopColor="#FF1493" />
          </linearGradient>
          <linearGradient id="heartGradientGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={bonusActive ? 'url(#heartGradientGold)' : 'url(#heartGradient)'}
          filter="url(#glow)"
        />
        {/* Shine effect */}
        <ellipse
          cx="8"
          cy="8"
          rx="2"
          ry="1.5"
          fill="rgba(255,255,255,0.4)"
          transform="rotate(-30 8 8)"
        />
      </motion.svg>
    </motion.div>
  );
}

export default HeartSVG;
