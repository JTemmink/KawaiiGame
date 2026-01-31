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
export const COINS_KEY = 'kawaii-coins';
export const UPGRADES_KEY = 'kawaii-upgrades';
export const COSMETICS_KEY = 'kawaii-cosmetics';
export const SELECTED_CHARACTER_KEY = 'kawaii-selected-character';
export const SELECTED_HEART_KEY = 'kawaii-selected-heart';

// Upgrade items (base prices - scale with level)
export const SHOP_UPGRADES = [
  {
    id: 'double_tap',
    name: 'Double Tap',
    description: 'Elke klik telt als 2 kliks!',
    emoji: '✌️',
    basePrice: 100,
    effect: { type: 'click_multiplier', value: 2 },
  },
  {
    id: 'slow_shrink',
    name: 'Slow Motion',
    description: 'Hartje krimpt 30% langzamer',
    emoji: '🐢',
    basePrice: 150,
    effect: { type: 'shrink_slow', value: 0.7 },
  },
  {
    id: 'bonus_extend',
    name: 'Bonus Boost',
    description: 'Bonus duurt 4 seconden langer',
    emoji: '⏰',
    basePrice: 200,
    effect: { type: 'bonus_extend', value: 4 },
  },
  {
    id: 'triple_bonus',
    name: 'Triple Bonus',
    description: '3x punten tijdens bonus (ipv 2x)',
    emoji: '🔥',
    basePrice: 300,
    effect: { type: 'bonus_multiplier', value: 3 },
  },
  {
    id: 'auto_click',
    name: 'Auto Clicker',
    description: 'Automatisch 1 klik per seconde',
    emoji: '🤖',
    basePrice: 500,
    effect: { type: 'auto_click', value: 1 },
  },
  {
    id: 'mega_explosion',
    name: 'Mega Explosion',
    description: 'Explosion geeft +50 bonus punten',
    emoji: '💥',
    basePrice: 400,
    effect: { type: 'explosion_bonus', value: 50 },
  },
];

// Kawaii Characters (skins)
export const SHOP_CHARACTERS = [
  {
    id: 'default_hand',
    name: 'Korean Heart',
    description: 'De klassieke finger heart',
    preview: '🤞',
    price: 0,
    unlocked: true,
  },
  {
    id: 'cat_paw',
    name: 'Kitty Paw',
    description: 'Schattige kattenpootje',
    preview: '🐱',
    price: 2500,
  },
  {
    id: 'bunny',
    name: 'Bunny Love',
    description: 'Lief konijntje',
    preview: '🐰',
    price: 5000,
  },
  {
    id: 'panda',
    name: 'Panda Hug',
    description: 'Knuffelbare panda',
    preview: '🐼',
    price: 10000,
  },
  {
    id: 'unicorn',
    name: 'Magic Unicorn',
    description: 'Magische eenhoorn',
    preview: '🦄',
    price: 25000,
  },
  {
    id: 'angel',
    name: 'Angel Baby',
    description: 'Hemelse engel',
    preview: '👼',
    price: 50000,
  },
  {
    id: 'fairy',
    name: 'Fairy Princess',
    description: 'Betoverende fee',
    preview: '🧚',
    price: 100000,
  },
  {
    id: 'star',
    name: 'Superstar',
    description: 'Schitterende ster',
    preview: '⭐',
    price: 250000,
  },
  {
    id: 'diamond',
    name: 'Diamond Queen',
    description: 'Zeldzame diamant',
    preview: '💎',
    price: 500000,
  },
  {
    id: 'rainbow',
    name: 'Rainbow Legend',
    description: 'Legendarische regenboog',
    preview: '🌈',
    price: 1000000,
  },
];

// Heart styles
export const SHOP_HEARTS = [
  {
    id: 'default_heart',
    name: 'Classic Pink',
    description: 'Het originele roze hartje',
    preview: '💖',
    color: '#FF69B4',
    price: 0,
    unlocked: true,
  },
  {
    id: 'red_heart',
    name: 'True Red',
    description: 'Vurig rood hart',
    preview: '❤️',
    color: '#FF0000',
    price: 2500,
  },
  {
    id: 'orange_heart',
    name: 'Sunset Orange',
    description: 'Warme zonsondergang',
    preview: '🧡',
    color: '#FF8C00',
    price: 5000,
  },
  {
    id: 'yellow_heart',
    name: 'Sunny Yellow',
    description: 'Vrolijk geel',
    preview: '💛',
    color: '#FFD700',
    price: 7500,
  },
  {
    id: 'green_heart',
    name: 'Nature Green',
    description: 'Fris groen',
    preview: '💚',
    color: '#32CD32',
    price: 10000,
  },
  {
    id: 'blue_heart',
    name: 'Ocean Blue',
    description: 'Diepzee blauw',
    preview: '💙',
    color: '#1E90FF',
    price: 15000,
  },
  {
    id: 'purple_heart',
    name: 'Royal Purple',
    description: 'Koninklijk paars',
    preview: '💜',
    color: '#9370DB',
    price: 25000,
  },
  {
    id: 'black_heart',
    name: 'Dark Soul',
    description: 'Mysterieus zwart',
    preview: '🖤',
    color: '#2D2D2D',
    price: 50000,
  },
  {
    id: 'white_heart',
    name: 'Pure White',
    description: 'Puur en zuiver',
    preview: '🤍',
    color: '#FFFFFF',
    price: 75000,
  },
  {
    id: 'rainbow_heart',
    name: 'Rainbow Sparkle',
    description: 'Alle kleuren!',
    preview: '🌈',
    color: 'rainbow',
    price: 500000,
  },
];

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

// Price multiplier per level (prices increase as you level up)
export const PRICE_MULTIPLIER_PER_LEVEL = 1.15;
