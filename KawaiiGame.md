# KawaiiGame - Game Design Document

## Overzicht

Een verslavend clicker-spel met een kawaii Korean finger heart als hoofdelement. Het spel combineert Cookie Clicker mechanica met explosive bonus momenten en premium visuele feedback.

---

## Tech Stack

| Tool | Doel |
|------|------|
| **React 18** | UI componenten en state management |
| **Vite** | Build tool en dev server |
| **Framer Motion** | Animaties en transities |
| **Tailwind CSS** | Styling |

### Waarom deze stack?

- **React**: Declaratieve UI, makkelijke state updates bij elke klik
- **Framer Motion**: Spring-based animaties voelen natuurlijk aan, geen handmatige keyframes
- **Tailwind**: Snelle styling zonder CSS files, responsive utilities
- **Vite**: Hot reload in <100ms, snelle builds

---

## Visueel Concept

### Het Hartje Mechanisme

De hand-afbeelding (`Kawaii hand.jpg`) dient als **referentie** voor de stijl. In het spel gebruiken we:

1. **De hand** als statische achtergrond/basis
2. **Een SVG hartje** dat boven de vingers zweeft
3. Het **SVG hartje groeit** bij elke klik (niet de hand)

```
     💖  ← Dit hartje groeit (SVG, animated)
    🤞   ← De hand blijft constant (afbeelding of SVG)
```

### Waarom SVG voor het hartje?

- Schaalt perfect zonder pixelation
- Makkelijk te animeren (scale, glow, color)
- Kan gradient fills en filters hebben
- Lightweight

---

## Core Gameplay

### Basis Mechanica

- Speler klikt op de kawaii hand (center screen)
- Elke klik:
  - Geeft +1 punt (of +2 tijdens Bonus Mode)
  - Laat het hartje boven de hand groter worden
  - Toont floating "+1" animatie
  - Telt mee naar explosion (x/50)

### Explosion Mechanica

Na 50 kliks:
- Hartje "explodeert" met particle effect
- Bonus Mode activeert voor 10 seconden
- Tijdens Bonus Mode: 2x punten per klik
- Hartje reset naar normale grootte
- Klik-teller reset naar 0/50

**Let op**: Als je 50 kliks bereikt terwijl Bonus Mode al actief is, wordt de timer NIET gereset. De huidige bonus loopt gewoon door.

### Progress Feedback

| Kliks | Effect |
|-------|--------|
| 0-39 | Hartje groeit geleidelijk (scale 1.0 → 1.4) |
| 40-47 | Hartje begint te shaken (warning) |
| 48-50 | Hartje pulseert snel (bijna explosion) |

---

## UI Layout

```
┌─────────────────────────────────┐
│                                 │
│         SCORE: 1,234            │
│        Best: 5,678              │
│                                 │
│              💖                 │  ← Groeiend hartje (SVG)
│             🤞                  │  ← Kawaii hand
│                                 │
│          23/50 kliks            │
│         [████████░░░░]          │  ← Progress bar
│                                 │
│         ⭐ BONUS: 7s ⭐          │  ← Alleen tijdens Bonus Mode
│                                 │
└─────────────────────────────────┘
```

---

## Visuele Effecten

### Per Klik
- Hartje scale pulse (quick bounce via spring animation)
- Floating "+1" of "+2" tekst die omhoog fades
- Subtle ripple effect vanaf klik positie

### Bij Explosion (50 kliks)
- Witte flash overlay (200ms)
- 20-30 kleine hartjes spatten in alle richtingen
- Screen shake (subtle, 300ms)
- Hartje burst animation voordat het reset

### Bonus Mode Actief
- Achtergrond krijgt gouden glow/tint
- Hartje heeft gouden outline/glow
- Sparkle particles rond het hartje
- Timer pulseert zachtjes

---

## Styling

### Kleurenpalet

```css
--bg-gradient-start: #FFE5E5    /* Zacht roze */
--bg-gradient-end: #E5F3FF      /* Zacht blauw */
--pink-primary: #FF69B4         /* Hot pink */
--pink-dark: #FF1493            /* Deep pink */
--gold: #FFD700                 /* Bonus mode */
--gold-glow: rgba(255, 215, 0, 0.4)
```

### Fonts
- **Score**: Nunito Black (900) - groot, rond, kawaii
- **UI tekst**: Nunito Bold (700)

### Animatie Timing
- Klik bounce: 150ms spring
- Float-up tekst: 800ms ease-out
- Explosion particles: 600ms cubic-bezier
- Screen shake: 300ms
- Hartje scale: 100ms spring

---

## State Management

```typescript
interface GameState {
  score: number;           // Totaal punten
  clicks: number;          // Huidige kliks (0-50)
  bonusActive: boolean;    // Is Bonus Mode aan?
  bonusTimeLeft: number;   // Seconden remaining (0-10)
  highScore: number;       // Uit localStorage
}
```

### Afgeleide State (computed)
- `heartScale`: Gebaseerd op clicks (1.0 tot 1.5)
- `isShaking`: clicks >= 40 && clicks < 48
- `isPulsing`: clicks >= 48
- `pointsPerClick`: bonusActive ? 2 : 1

---

## Project Structuur

```
kawaigame/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── kawaii-hand.jpg        # Referentie afbeelding
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css              # Tailwind imports
    ├── components/
    │   ├── Game.jsx           # Main game container
    │   ├── ScoreDisplay.jsx   # Score + high score
    │   ├── KawaiiHand.jsx     # Hand + hartje SVG
    │   ├── HeartSVG.jsx       # Animated SVG hartje
    │   ├── ClickCounter.jsx   # x/50 + progress bar
    │   ├── BonusTimer.jsx     # Bonus countdown
    │   ├── FloatingPoint.jsx  # +1/+2 animatie
    │   └── Particles.jsx      # Explosion particles
    ├── hooks/
    │   ├── useGameState.js    # Game logic hook
    │   └── useLocalStorage.js # High score persistence
    └── utils/
        └── constants.js       # Magic numbers
```

---

## Constants

```javascript
// src/utils/constants.js
export const CLICKS_TO_EXPLOSION = 50;
export const BONUS_DURATION_SECONDS = 10;
export const BONUS_MULTIPLIER = 2;

export const HEART_MIN_SCALE = 1.0;
export const HEART_MAX_SCALE = 1.5;

export const SHAKE_THRESHOLD = 40;
export const PULSE_THRESHOLD = 48;

export const EXPLOSION_PARTICLE_COUNT = 25;
```

---

## Development Fases

### Fase 1: Setup & Core (MVP)
1. Vite + React + Tailwind setup
2. Basic layout componenten
3. SVG hartje component
4. Klik detectie en score tellen
5. Hartje scale animatie (Framer Motion)
6. localStorage high score

### Fase 2: Explosion & Bonus
1. 50-kliks detectie en reset
2. Bonus Mode timer (10 sec countdown)
3. 2x punten tijdens bonus
4. Explosion particle effect
5. Screen shake
6. Flash overlay

### Fase 3: Polish
1. Shake animatie (40+ kliks)
2. Pulse animatie (48+ kliks)
3. Floating "+1" tekst
4. Bonus Mode gouden theme
5. Ambient particles
6. Mobile touch optimization

### Fase 4: Audio (Optioneel)
1. Klik geluid
2. Explosion geluid  
3. Bonus Mode jingle
4. Mute button

---

## Success Criteria

Het spel is af wanneer:

- [ ] Hartje is klikbaar en reageert visueel
- [ ] Score telt correct op (+1 normaal, +2 bonus)
- [ ] Klik teller werkt (0-50) met progress bar
- [ ] Hartje groeit geleidelijk naar 50 kliks
- [ ] Shake effect bij 40+ kliks
- [ ] Pulse effect bij 48+ kliks
- [ ] Explosion triggert op 50 kliks met particles
- [ ] Bonus Mode werkt (10 sec timer)
- [ ] Bonus timer NIET resetten bij nieuwe explosion
- [ ] High score wordt opgeslagen in localStorage
- [ ] Responsive: werkt op mobile en desktop
- [ ] 60fps animaties, geen jank

---

## Developer Notes

- Mobile-first approach (touch events prioriteit)
- Gebruik Framer Motion's `useSpring` voor natuurlijke animaties
- Test op echte devices, niet alleen Chrome DevTools
- Houd components klein en gefocust
- Alle magic numbers in constants.js
- Geen audio in eerste versie

---

## Assets

- `kawaii-hand.jpg`: Referentie voor stijl (Korean finger heart)
- SVG hartje: Zelf maken of van een icon library (Lucide, Heroicons)
