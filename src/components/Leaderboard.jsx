import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTopHighscores } from '../lib/supabase';

function Leaderboard({ show, onClose, currentPlayerName }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) {
      setLoading(true);
      getTopHighscores().then((data) => {
        setScores(data);
        setLoading(false);
      });
    }
  }, [show]);

  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl max-h-[80vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-gray-800">
                🏆 Top 10
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-gray-500">
                Laden...
              </div>
            ) : scores.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Nog geen scores! Wees de eerste.
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto max-h-[50vh]">
                {scores.map((entry, index) => (
                  <motion.div
                    key={entry.created_at}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      entry.player_name === currentPlayerName
                        ? 'bg-pink-100 border-2 border-pink-primary'
                        : 'bg-gray-50'
                    }`}
                  >
                    <span className="text-xl w-8 text-center">
                      {getMedal(index)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 truncate">
                        {entry.player_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Level {entry.level}
                      </p>
                    </div>
                    <p className="font-black text-pink-primary text-lg">
                      {entry.score.toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full mt-4 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
            >
              Sluiten
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Leaderboard;
