import { useCallback, useRef } from 'react';

// Sound effects using Web Audio API - no external files needed
export function useClickSound() {
  const audioContextRef = useRef(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Soft pop for regular clicks
  const playClick = useCallback(() => {
    try {
      const ctx = getContext();

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Soft, high-pitched pop
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      oscillator.type = 'sine';

      // Quick fade out for soft sound
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Audio not supported, fail silently
    }
  }, [getContext]);

  // C-E-G chord for bonus clicks
  const playBonusClick = useCallback(() => {
    try {
      const ctx = getContext();
      const notes = [523, 659, 784]; // C5, E5, G5

      notes.forEach((freq) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
      });
    } catch (e) {
      // Audio not supported, fail silently
    }
  }, [getContext]);

  // Coin/power-up sound for bonus mode start
  const playBonusStart = useCallback(() => {
    try {
      const ctx = getContext();

      // Classic coin sound - quick ascending pitch
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(988, ctx.currentTime); // B5
      oscillator.frequency.setValueAtTime(1319, ctx.currentTime + 0.08); // E6

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Audio not supported, fail silently
    }
  }, [getContext]);

  // Game over sound
  const playGameOver = useCallback(() => {
    try {
      const ctx = getContext();

      // Descending sad sound
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.4);

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Audio not supported, fail silently
    }
  }, [getContext]);

  return { playClick, playBonusClick, playBonusStart, playGameOver };
}
