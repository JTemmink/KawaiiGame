import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qsnunuffovduwoxmpvsh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbnVudWZmb3ZkdXdveG1wdnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NTcxNTAsImV4cCI6MjA4NTQzMzE1MH0.EfKDOkscdp6M-g-FAUbSD1zMuc4PHdBVIcHES9LkrS0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get top 10 highscores
export async function getTopHighscores() {
  const { data, error } = await supabase
    .from('highscores')
    .select('player_name, score, level, created_at')
    .order('score', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching highscores:', error);
    return [];
  }
  return data;
}

// Submit a new highscore
export async function submitHighscore(playerName, score, level) {
  const { data, error } = await supabase
    .from('highscores')
    .insert([{ player_name: playerName, score, level }])
    .select();

  if (error) {
    console.error('Error submitting highscore:', error);
    return null;
  }
  return data[0];
}

// Check if score qualifies for top 10
export async function checkIfTopScore(score) {
  const { data, error } = await supabase
    .from('highscores')
    .select('score')
    .order('score', { ascending: false })
    .limit(10);

  if (error || !data) return true; // If error, allow submission
  if (data.length < 10) return true; // Less than 10 scores, always qualifies
  
  const lowestTopScore = data[data.length - 1].score;
  return score > lowestTopScore;
}
