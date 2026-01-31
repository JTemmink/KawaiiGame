import { motion } from 'framer-motion';
import { useMemo } from 'react';

function HeartSVG({ scale = 1, isShaking, isPulsing, bonusActive, heartColor = '#FF69B4' }) {
  const baseSize = 62;

  // Generate gradient colors based on heart color
  const gradientColors = useMemo(() => {
    if (heartColor === 'rainbow') {
      return { start: '#FF69B4', end: '#9370DB', isRainbow: true };
    }
    if (heartColor === 'galaxy') {
      return { start: '#4B0082', end: '#9400D3', isGalaxy: true };
    }
    if (heartColor === 'crystal') {
      return { start: '#E0FFFF', end: '#87CEEB', isCrystal: true };
    }
    // Darken the color for gradient end
    const darken = (hex) => {
      const num = parseInt(hex.replace('#', ''), 16);
      const r = Math.max(0, (num >> 16) - 40);
      const g = Math.max(0, ((num >> 8) & 0x00FF) - 40);
      const b = Math.max(0, (num & 0x0000FF) - 40);
      return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    };
    return { start: heartColor, end: darken(heartColor), isRainbow: false };
  }, [heartColor]);

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
          {/* Custom heart gradient */}
          <linearGradient id="heartGradientCustom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.start} />
            <stop offset="100%" stopColor={gradientColors.end} />
          </linearGradient>
          
          {/* Rainbow gradient */}
          <linearGradient id="heartGradientRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="20%" stopColor="#FF8C00" />
            <stop offset="40%" stopColor="#FFD700" />
            <stop offset="60%" stopColor="#32CD32" />
            <stop offset="80%" stopColor="#1E90FF" />
            <stop offset="100%" stopColor="#9370DB" />
          </linearGradient>
          
          {/* Galaxy gradient */}
          <linearGradient id="heartGradientGalaxy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D0221" />
            <stop offset="30%" stopColor="#4B0082" />
            <stop offset="60%" stopColor="#9400D3" />
            <stop offset="100%" stopColor="#FF1493" />
          </linearGradient>
          
          {/* Crystal gradient */}
          <linearGradient id="heartGradientCrystal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E0FFFF" />
            <stop offset="60%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#ADD8E6" />
          </linearGradient>
          
          {/* Bonus gold gradient */}
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
          fill={
            bonusActive 
              ? 'url(#heartGradientGold)' 
              : gradientColors.isRainbow 
                ? 'url(#heartGradientRainbow)'
                : gradientColors.isGalaxy
                  ? 'url(#heartGradientGalaxy)'
                  : gradientColors.isCrystal
                    ? 'url(#heartGradientCrystal)'
                    : 'url(#heartGradientCustom)'
          }
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
        
        {/* Extra sparkle for special hearts */}
        {(gradientColors.isRainbow || gradientColors.isCrystal) && (
          <motion.ellipse
            cx="15"
            cy="10"
            rx="1"
            ry="0.8"
            fill="rgba(255,255,255,0.6)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.svg>
    </motion.div>
  );
}

export default HeartSVG;
