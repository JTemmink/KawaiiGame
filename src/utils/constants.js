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

// LocalStorage key
export const HIGH_SCORE_KEY = 'kawaii-high-score';

// Shrink mechanic - heart shrinks if you don't click fast enough
export const BASE_SHRINK_INTERVAL_MS = 1000; // Base time before shrink
export const SHRINK_AMOUNT = 2; // Clicks lost per shrink
export const SPEED_INCREASE_THRESHOLD = 250; // Every 250 points, speed up
export const SPEED_INCREASE_FACTOR = 0.85; // Multiply interval by this factor
export const MIN_SHRINK_INTERVAL_MS = 300; // Minimum interval (fastest speed)
