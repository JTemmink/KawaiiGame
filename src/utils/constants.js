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
export const COLLECTION_KEY = 'kawaii-collection';

// Upgrade items (base prices - scale with level)
export const SHOP_UPGRADES = [
  {
    id: 'double_tap',
    name: 'Double Tap',
    description: 'Elke klik telt als 2 kliks!',
    emoji: '✌️',
    basePrice: 150,
    effect: { type: 'click_multiplier', value: 2 },
  },
  {
    id: 'slow_shrink',
    name: 'Slow Motion',
    description: 'Hartje krimpt 30% langzamer',
    emoji: '🐢',
    basePrice: 250,
    effect: { type: 'shrink_slow', value: 0.7 },
  },
  {
    id: 'bonus_extend',
    name: 'Bonus Boost',
    description: 'Bonus duurt 4 seconden langer',
    emoji: '⏰',
    basePrice: 350,
    effect: { type: 'bonus_extend', value: 4 },
  },
  {
    id: 'triple_bonus',
    name: 'Triple Bonus',
    description: '3x punten tijdens bonus (ipv 2x)',
    emoji: '🔥',
    basePrice: 500,
    effect: { type: 'bonus_multiplier', value: 3 },
  },
  {
    id: 'auto_click',
    name: 'Auto Clicker',
    description: 'Automatisch 1 klik per seconde',
    emoji: '🤖',
    basePrice: 750,
    effect: { type: 'auto_click', value: 1 },
  },
  {
    id: 'mega_explosion',
    name: 'Mega Explosion',
    description: 'Explosion geeft +50 bonus punten',
    emoji: '💥',
    basePrice: 600,
    effect: { type: 'explosion_bonus', value: 50 },
  },
];

// Kawaii Characters (50+ collectible mascots)
// Categories: Animals, Food, Fantasy, Nature, Objects, Special
export const SHOP_CHARACTERS = [
  // === STARTER (Free) ===
  { id: 'default_hand', name: 'Korean Heart', description: 'De klassieke finger heart', preview: '🤞', price: 0, unlocked: true, category: 'starter', rarity: 'common' },
  
  // === ANIMALS - Cute Pets (150-500) ===
  { id: 'kitty', name: 'Kitty-chan', description: 'Schattig katje zegt miauw~', preview: '🐱', price: 150, category: 'animals', rarity: 'common' },
  { id: 'bunny', name: 'Usagi', description: 'Zacht konijntje met flaporen', preview: '🐰', price: 150, category: 'animals', rarity: 'common' },
  { id: 'puppy', name: 'Wan-chan', description: 'Vrolijke puppy wil spelen!', preview: '🐶', price: 200, category: 'animals', rarity: 'common' },
  { id: 'hamster', name: 'Hamu-Hamu', description: 'Mollige wangetjes vol zaden', preview: '🐹', price: 200, category: 'animals', rarity: 'common' },
  { id: 'bear', name: 'Kuma-kun', description: 'Knuffelbeer houdt van honing', preview: '🐻', price: 250, category: 'animals', rarity: 'common' },
  { id: 'panda', name: 'Pan-Pan', description: 'Bamboe munchende panda', preview: '🐼', price: 300, category: 'animals', rarity: 'common' },
  { id: 'koala', name: 'Koara', description: 'Slaperige eucalyptus vriend', preview: '🐨', price: 300, category: 'animals', rarity: 'common' },
  { id: 'mouse', name: 'Chu-Chu', description: 'Piepklein muisje met kaas', preview: '🐭', price: 200, category: 'animals', rarity: 'common' },
  { id: 'fox', name: 'Kitsune', description: 'Slimme vosje met pluizige staart', preview: '🦊', price: 350, category: 'animals', rarity: 'uncommon' },
  { id: 'penguin', name: 'Pen-Pen', description: 'Waddelende pinguïn op ijs', preview: '🐧', price: 350, category: 'animals', rarity: 'uncommon' },
  { id: 'chick', name: 'Piyo', description: 'Pluizig kuikentje piept vrolijk', preview: '🐥', price: 250, category: 'animals', rarity: 'common' },
  { id: 'frog', name: 'Kero-chan', description: 'Groene kikker op een lelieblad', preview: '🐸', price: 300, category: 'animals', rarity: 'common' },
  { id: 'pig', name: 'Buta-chan', description: 'Roze biggetje met krulstaart', preview: '🐷', price: 250, category: 'animals', rarity: 'common' },
  { id: 'cow', name: 'Moo-chan', description: 'Gevlekte koe zegt boe~', preview: '🐮', price: 300, category: 'animals', rarity: 'common' },
  { id: 'sheep', name: 'Meh-Meh', description: 'Wollig schaapje zo zacht', preview: '🐑', price: 350, category: 'animals', rarity: 'uncommon' },
  
  // === ANIMALS - Ocean & Sky (400-800) ===
  { id: 'dolphin', name: 'Doru-chan', description: 'Speelse dolfijn springt hoog', preview: '🐬', price: 400, category: 'animals', rarity: 'uncommon' },
  { id: 'whale', name: 'Kujira', description: 'Vriendelijke walvis blaast water', preview: '🐳', price: 500, category: 'animals', rarity: 'uncommon' },
  { id: 'octopus', name: 'Tako-chan', description: 'Roze octopus met 8 armpjes', preview: '🐙', price: 450, category: 'animals', rarity: 'uncommon' },
  { id: 'butterfly', name: 'Chocho', description: 'Kleurrijke vlinder fladdert', preview: '🦋', price: 500, category: 'animals', rarity: 'uncommon' },
  { id: 'bee', name: 'Hachi', description: 'Zoem zoem bijtje maakt honing', preview: '🐝', price: 400, category: 'animals', rarity: 'uncommon' },
  { id: 'ladybug', name: 'Tento', description: 'Rood lieveheersbeestje brengt geluk', preview: '🐞', price: 350, category: 'animals', rarity: 'uncommon' },
  { id: 'snail', name: 'Katatsumuri', description: 'Langzame slak met huisje', preview: '🐌', price: 300, category: 'animals', rarity: 'common' },
  { id: 'turtle', name: 'Kame', description: 'Wijze schildpad leeft lang', preview: '🐢', price: 450, category: 'animals', rarity: 'uncommon' },
  { id: 'crab', name: 'Kani-chan', description: 'Knippende krab loopt zijwaarts', preview: '🦀', price: 400, category: 'animals', rarity: 'uncommon' },
  { id: 'fish', name: 'Sakana', description: 'Gouden visje zwemt rond', preview: '🐠', price: 350, category: 'animals', rarity: 'uncommon' },
  
  // === FOOD - Sweet (500-1500) ===
  { id: 'icecream', name: 'Aisu-chan', description: 'Smeltend ijsje zo lekker~', preview: '🍦', price: 500, category: 'food', rarity: 'uncommon' },
  { id: 'donut', name: 'Donatsu', description: 'Roze donut met sprinkles', preview: '🍩', price: 500, category: 'food', rarity: 'uncommon' },
  { id: 'cupcake', name: 'Kappu-chan', description: 'Zoete cupcake met kers', preview: '🧁', price: 600, category: 'food', rarity: 'uncommon' },
  { id: 'candy', name: 'Ame-chan', description: 'Regenboog lolly draait rond', preview: '🍭', price: 450, category: 'food', rarity: 'uncommon' },
  { id: 'cookie', name: 'Kukki', description: 'Knapperig koekje met chips', preview: '🍪', price: 400, category: 'food', rarity: 'uncommon' },
  { id: 'cake', name: 'Keeki', description: 'Verjaardagstaart met kaarsjes', preview: '🎂', price: 800, category: 'food', rarity: 'rare' },
  { id: 'pudding', name: 'Purin', description: 'Wiebelige pudding met karamel', preview: '🍮', price: 700, category: 'food', rarity: 'rare' },
  { id: 'chocolate', name: 'Choko', description: 'Zoete chocolade reep', preview: '🍫', price: 550, category: 'food', rarity: 'uncommon' },
  { id: 'strawberry', name: 'Ichigo', description: 'Sappige aardbei zo zoet', preview: '🍓', price: 600, category: 'food', rarity: 'uncommon' },
  { id: 'cherry', name: 'Sakuranbo', description: 'Tweeling kersen aan steel', preview: '🍒', price: 500, category: 'food', rarity: 'uncommon' },
  
  // === FOOD - Savory (600-1200) ===
  { id: 'onigiri', name: 'Onigiri-kun', description: 'Rijstballetje met nori', preview: '🍙', price: 600, category: 'food', rarity: 'uncommon' },
  { id: 'sushi', name: 'Sushi-chan', description: 'Verse sushi op rijst', preview: '🍣', price: 700, category: 'food', rarity: 'rare' },
  { id: 'ramen', name: 'Ramen-kun', description: 'Dampende kom noedels', preview: '🍜', price: 800, category: 'food', rarity: 'rare' },
  { id: 'bento', name: 'Bento-chan', description: 'Schattige lunchbox', preview: '🍱', price: 900, category: 'food', rarity: 'rare' },
  { id: 'dumpling', name: 'Gyoza', description: 'Knapperige dumpling', preview: '🥟', price: 650, category: 'food', rarity: 'uncommon' },
  { id: 'egg', name: 'Tamago', description: 'Lui gebakken eitje', preview: '🍳', price: 500, category: 'food', rarity: 'uncommon' },
  { id: 'bread', name: 'Pan-kun', description: 'Vers broodje uit de oven', preview: '🍞', price: 450, category: 'food', rarity: 'uncommon' },
  { id: 'pizza', name: 'Piza-chan', description: 'Cheesy pizza slice', preview: '🍕', price: 600, category: 'food', rarity: 'uncommon' },
  
  // === FANTASY - Magical (1000-5000) ===
  { id: 'unicorn', name: 'Yunikon', description: 'Magische eenhoorn met glitter', preview: '🦄', price: 1000, category: 'fantasy', rarity: 'rare' },
  { id: 'dragon', name: 'Ryu-chan', description: 'Schattige baby draak', preview: '🐉', price: 2000, category: 'fantasy', rarity: 'epic' },
  { id: 'fairy', name: 'Yosei', description: 'Glinsterende fee met vleugels', preview: '🧚', price: 1500, category: 'fantasy', rarity: 'rare' },
  { id: 'mermaid', name: 'Ningyo', description: 'Zeemeermin met parelstaart', preview: '🧜‍♀️', price: 2500, category: 'fantasy', rarity: 'epic' },
  { id: 'angel', name: 'Tenshi', description: 'Hemelse engel met halo', preview: '👼', price: 3000, category: 'fantasy', rarity: 'epic' },
  { id: 'ghost', name: 'Obake', description: 'Vriendelijk spookje boe~', preview: '👻', price: 800, category: 'fantasy', rarity: 'rare' },
  { id: 'alien', name: 'Uchuujin', description: 'Groene alien zegt hallo', preview: '👽', price: 1200, category: 'fantasy', rarity: 'rare' },
  { id: 'robot', name: 'Robotto', description: 'Piepende robot vriend', preview: '🤖', price: 1500, category: 'fantasy', rarity: 'rare' },
  { id: 'wizard', name: 'Mahou', description: 'Kleine tovenaar met staf', preview: '🧙', price: 2000, category: 'fantasy', rarity: 'epic' },
  { id: 'princess', name: 'Ohime-sama', description: 'Elegante prinses met kroon', preview: '👸', price: 3500, category: 'fantasy', rarity: 'epic' },
  
  // === NATURE - Plants & Weather (800-2000) ===
  { id: 'sakura', name: 'Sakura', description: 'Roze kersenbloesem bloeit', preview: '🌸', price: 800, category: 'nature', rarity: 'rare' },
  { id: 'sunflower', name: 'Himawari', description: 'Vrolijke zonnebloem lacht', preview: '🌻', price: 700, category: 'nature', rarity: 'rare' },
  { id: 'tulip', name: 'Churippu', description: 'Kleurrijke tulp in bloei', preview: '🌷', price: 600, category: 'nature', rarity: 'uncommon' },
  { id: 'rose', name: 'Bara', description: 'Romantische rode roos', preview: '🌹', price: 900, category: 'nature', rarity: 'rare' },
  { id: 'clover', name: 'Kuroba', description: 'Geluksklaver met 4 blaadjes', preview: '🍀', price: 1000, category: 'nature', rarity: 'rare' },
  { id: 'mushroom', name: 'Kinoko', description: 'Rode paddenstoel met stippen', preview: '🍄', price: 700, category: 'nature', rarity: 'rare' },
  { id: 'rainbow', name: 'Niji', description: 'Kleurrijke regenboog schijnt', preview: '🌈', price: 2000, category: 'nature', rarity: 'epic' },
  { id: 'cloud', name: 'Kumo-chan', description: 'Pluizige wolk zweeft', preview: '☁️', price: 800, category: 'nature', rarity: 'rare' },
  { id: 'sun', name: 'Taiyou', description: 'Stralende zon lacht', preview: '🌞', price: 1200, category: 'nature', rarity: 'rare' },
  { id: 'moon', name: 'Tsuki', description: 'Slapende maan droomt', preview: '🌙', price: 1500, category: 'nature', rarity: 'rare' },
  { id: 'star', name: 'Hoshi', description: 'Twinklende ster aan de hemel', preview: '⭐', price: 1000, category: 'nature', rarity: 'rare' },
  { id: 'snowflake', name: 'Yuki', description: 'Unieke sneeuwvlok dwarrelt', preview: '❄️', price: 900, category: 'nature', rarity: 'rare' },
  
  // === OBJECTS - Cute Things (1000-3000) ===
  { id: 'bow', name: 'Ribon', description: 'Schattig strikje zo kawaii', preview: '🎀', price: 1000, category: 'objects', rarity: 'rare' },
  { id: 'balloon', name: 'Fusen', description: 'Kleurrijke ballon zweeft', preview: '🎈', price: 800, category: 'objects', rarity: 'rare' },
  { id: 'gift', name: 'Purezento', description: 'Ingepakt cadeautje met strik', preview: '🎁', price: 1200, category: 'objects', rarity: 'rare' },
  { id: 'crown', name: 'Oukan', description: 'Koninklijke kroon schittert', preview: '👑', price: 2500, category: 'objects', rarity: 'epic' },
  { id: 'gem', name: 'Houseki', description: 'Fonkelende edelsteen', preview: '💎', price: 3000, category: 'objects', rarity: 'epic' },
  { id: 'bell', name: 'Suzu', description: 'Rinkelend belletje tingelt', preview: '🔔', price: 900, category: 'objects', rarity: 'rare' },
  { id: 'letter', name: 'Tegami', description: 'Liefdesbrief met hartje', preview: '💌', price: 1100, category: 'objects', rarity: 'rare' },
  { id: 'crystal', name: 'Kurisutaru', description: 'Magische kristallen bol', preview: '🔮', price: 2000, category: 'objects', rarity: 'epic' },
  
  // === SPECIAL - Legendary (5000-50000) ===
  { id: 'phoenix', name: 'Fenikkusu', description: 'Legendarische vuurvogel', preview: '🔥', price: 5000, category: 'special', rarity: 'legendary' },
  { id: 'galaxy', name: 'Ginga', description: 'Kosmische melkweg spiraal', preview: '🌌', price: 10000, category: 'special', rarity: 'legendary' },
  { id: 'aurora', name: 'Aurora', description: 'Noorderlicht danst', preview: '✨', price: 15000, category: 'special', rarity: 'legendary' },
  { id: 'diamond_king', name: 'Diamond King', description: 'Ultieme diamanten majesteit', preview: '💠', price: 25000, category: 'special', rarity: 'legendary' },
  { id: 'cosmic_cat', name: 'Cosmic Neko', description: 'Kat uit de sterren', preview: '🐱‍👤', price: 30000, category: 'special', rarity: 'legendary' },
  { id: 'golden_dragon', name: 'Kinryu', description: 'Gouden draak van voorspoed', preview: '🐲', price: 40000, category: 'special', rarity: 'legendary' },
  { id: 'eternal_love', name: 'Eternal Love', description: 'Oneindige liefde symbool', preview: '💕', price: 50000, category: 'special', rarity: 'legendary' },
];

// Kawaii Hearts with faces and personalities (20 hearts)
export const SHOP_HEARTS = [
  // === STARTER ===
  { id: 'default_heart', name: 'Classic Pink', description: 'Het originele roze hartje', preview: '💖', color: '#FF69B4', face: '(◕‿◕)', price: 0, unlocked: true, rarity: 'common' },
  
  // === BASIC COLORS (150-500) ===
  { id: 'red_heart', name: 'Blushing Red', description: 'Verlegen rood hartje bloost', preview: '❤️', color: '#FF0000', face: '(⁄ ⁄>⁄ω⁄<⁄ ⁄)', price: 150, rarity: 'common' },
  { id: 'orange_heart', name: 'Sunny Orange', description: 'Energiek oranje hartje', preview: '🧡', color: '#FF8C00', face: '(☆▽☆)', price: 200, rarity: 'common' },
  { id: 'yellow_heart', name: 'Happy Yellow', description: 'Altijd vrolijk geel hartje', preview: '💛', color: '#FFD700', face: '(◠‿◠)', price: 250, rarity: 'common' },
  { id: 'green_heart', name: 'Nature Green', description: 'Kalm groen hartje ademt', preview: '💚', color: '#32CD32', face: '(｡◕‿◕｡)', price: 300, rarity: 'common' },
  { id: 'blue_heart', name: 'Dreamy Blue', description: 'Dromerig blauw hartje', preview: '💙', color: '#1E90FF', face: '(◡‿◡✿)', price: 350, rarity: 'common' },
  { id: 'purple_heart', name: 'Mystic Purple', description: 'Mysterieus paars hartje', preview: '💜', color: '#9370DB', face: '(✧ω✧)', price: 400, rarity: 'uncommon' },
  
  // === SPECIAL COLORS (500-1500) ===
  { id: 'black_heart', name: 'Edgy Black', description: 'Cool zwart hartje met attitude', preview: '🖤', color: '#2D2D2D', face: '(¬‿¬)', price: 500, rarity: 'uncommon' },
  { id: 'white_heart', name: 'Pure White', description: 'Onschuldig wit hartje', preview: '🤍', color: '#FFFFFF', face: '(◕ᴗ◕✿)', price: 600, rarity: 'uncommon' },
  { id: 'brown_heart', name: 'Choco Heart', description: 'Chocolade hartje zo zoet', preview: '🤎', color: '#8B4513', face: '(っ˘ڡ˘ς)', price: 550, rarity: 'uncommon' },
  { id: 'pink_sparkle', name: 'Sparkle Pink', description: 'Glinsterende roze hartje', preview: '💗', color: '#FF1493', face: '(ノ◕ヮ◕)ノ*:・゚✧', price: 700, rarity: 'uncommon' },
  
  // === EMOTION HEARTS (800-2000) ===
  { id: 'love_eyes', name: 'Love Eyes', description: 'Verliefd hartje met hartjesogen', preview: '😍', color: '#FF69B4', face: '(♥ω♥*)', price: 800, rarity: 'rare' },
  { id: 'sleepy_heart', name: 'Sleepy Heart', description: 'Slaperig hartje gaapt', preview: '😴', color: '#B0C4DE', face: '(－ω－) zzZ', price: 900, rarity: 'rare' },
  { id: 'excited_heart', name: 'Excited Heart', description: 'Super enthousiast hartje!', preview: '🤩', color: '#FFD700', face: '(ﾉ´ヮ`)ﾉ*: ・゚✧', price: 1000, rarity: 'rare' },
  { id: 'shy_heart', name: 'Shy Heart', description: 'Verlegen hartje verstopt zich', preview: '🙈', color: '#FFB6C1', face: '(⁄ ⁄•⁄ω⁄•⁄ ⁄)', price: 1100, rarity: 'rare' },
  { id: 'cool_heart', name: 'Cool Heart', description: 'Stoer hartje met zonnebril', preview: '😎', color: '#4169E1', face: '( •_•)>⌐■-■', price: 1200, rarity: 'rare' },
  
  // === MAGICAL HEARTS (2000-10000) ===
  { id: 'rainbow_heart', name: 'Rainbow Heart', description: 'Alle kleuren van de regenboog!', preview: '🌈', color: 'rainbow', face: '(☆▽☆)', price: 2000, rarity: 'epic' },
  { id: 'galaxy_heart', name: 'Galaxy Heart', description: 'Kosmisch hartje vol sterren', preview: '🌌', color: 'galaxy', face: '(✧∀✧)', price: 5000, rarity: 'epic' },
  { id: 'crystal_heart', name: 'Crystal Heart', description: 'Kristallen hartje schittert', preview: '💎', color: 'crystal', face: '(◇‿◇)', price: 7500, rarity: 'legendary' },
  { id: 'golden_heart', name: 'Golden Heart', description: 'Zeldzaam gouden hartje', preview: '🏆', color: '#FFD700', face: '(★ω★)', price: 10000, rarity: 'legendary' },
];

// Rarity colors for UI
export const RARITY_COLORS = {
  common: { bg: '#E5E7EB', text: '#374151', border: '#9CA3AF' },
  uncommon: { bg: '#D1FAE5', text: '#065F46', border: '#34D399' },
  rare: { bg: '#DBEAFE', text: '#1E40AF', border: '#60A5FA' },
  epic: { bg: '#EDE9FE', text: '#5B21B6', border: '#A78BFA' },
  legendary: { bg: '#FEF3C7', text: '#92400E', border: '#FBBF24' },
};

// Category info for shop tabs
export const CATEGORIES = {
  animals: { name: 'Dieren', emoji: '🐾' },
  food: { name: 'Eten', emoji: '🍰' },
  fantasy: { name: 'Fantasy', emoji: '✨' },
  nature: { name: 'Natuur', emoji: '🌸' },
  objects: { name: 'Objecten', emoji: '🎀' },
  special: { name: 'Speciaal', emoji: '👑' },
};

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
