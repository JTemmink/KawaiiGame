import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function NameInputModal({ show, onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length >= 2 && trimmedName.length <= 20) {
      onSubmit(trimmedName);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <p className="text-5xl mb-4">💖</p>
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Welkom!
            </h2>
            <p className="text-gray-600 mb-6">
              Wat is je naam of nickname?
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jouw naam..."
                maxLength={20}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-primary focus:outline-none text-center text-lg font-bold text-gray-700 mb-4"
                autoFocus
              />
              <button
                type="submit"
                disabled={name.trim().length < 2}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-primary to-pink-dark text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
              >
                Start Spelen!
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4">
              2-20 karakters
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NameInputModal;
