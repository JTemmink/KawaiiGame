// Gameplay
export const CLICKS_TO_EXPLOSION = 50;
export const BONUS_DURATION_SECONDS = 8;
export const BONUS_MULTIPLIER = 2;

// Heart scaling
export const HEART_MIN_SCALE = 1.0;
export const HEART_MAX_SCALE = 1.5;

// Animation thresholds
export const SHAKE_THRESHOLD = 40;
export const PULSE_THRESHOLD = 48;

// Particles
export const EXPLOSION_PARTICLE_COUNT = 25;

// LocalStorage keys
export const HIGH_SCORE_KEY = 'kawaii-high-score';
export const PLAYER_NAME_KEY = 'kawaii-player-name';

// Shrink mechanic - heart shrinks if you don't click fast enough
export const BASE_SHRINK_INTERVAL_MS = 1000; // Base time before shrink
export const SHRINK_AMOUNT = 2; // Clicks lost per shrink
export const SPEED_INCREASE_THRESHOLD = 250; // Every 250 points = 1 level up
export const SPEED_INCREASE_FACTOR = 0.85; // Multiply interval by this factor
export const MIN_SHRINK_INTERVAL_MS = 300; // Minimum interval (fastest speed)

// Level colors - different pink shades per level
export const LEVEL_COLORS = [
  { from: '#FFE5E5', to: '#E5F3FF' },   // Level 1: Light pink to light blue (default)
  { from: '#FFD6E0', to: '#E0E5FF' },   // Level 2: Soft rose
  { from: '#FFC4D4', to: '#D4D9FF' },   // Level 3: Rose pink
  { from: '#FFB0C4', to: '#C4CCFF' },   // Level 4: Pink
  { from: '#FF9BB5', to: '#B5BFFF' },   // Level 5: Hot pink light
  { from: '#FF85A5', to: '#A5B0FF' },   // Level 6: Hot pink
  { from: '#FF6F96', to: '#96A0FF' },   // Level 7: Deep pink
  { from: '#FF5A87', to: '#8790FF' },   // Level 8: Magenta pink
  { from: '#FF4578', to: '#7880FF' },   // Level 9: Bright magenta
  { from: '#FF3069', to: '#6970FF' },   // Level 10+: Intense magenta
];
