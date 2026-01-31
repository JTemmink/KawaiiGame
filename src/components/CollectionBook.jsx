import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOP_CHARACTERS, SHOP_HEARTS, RARITY_COLORS, CATEGORIES } from '../utils/constants';

function CollectionBook({ show, onClose, ownedCosmetics, collection, onPlaceCharacter }) {
  const [activeTab, setActiveTab] = useState('characters');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'room'

  const ownedCharacters = SHOP_CHARACTERS.filter(
    c => ownedCosmetics.includes(c.id) || c.unlocked
  );
  const ownedHearts = SHOP_HEARTS.filter(
    h => ownedCosmetics.includes(h.id) || h.unlocked
  );

  const totalCharacters = SHOP_CHARACTERS.length;
  const totalHearts = SHOP_HEARTS.length;
  const collectedCharacters = ownedCharacters.length;
  const collectedHearts = ownedHearts.length;

  const categories = ['all', ...Object.keys(CATEGORIES)];

  const filteredCharacters = selectedCategory === 'all' 
    ? SHOP_CHARACTERS 
    : SHOP_CHARACTERS.filter(c => c.category === selectedCategory);

  const getRarityStyle = (rarity) => RARITY_COLORS[rarity] || RARITY_COLORS.common;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl w-full max-w-lg shadow-2xl max-h-[95vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Book Cover Header */}
            <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 p-4 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute text-white text-xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  >
                    ✨
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-black text-white drop-shadow-lg relative z-10">
                📖 Kawaii Verzamelboek
              </h2>
              <p className="text-pink-100 text-sm font-bold relative z-10">
                Jouw schattige collectie!
              </p>
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white/80 hover:text-white text-2xl z-10"
              >
                ×
              </button>
            </div>

            {/* Progress Stats */}
            <div className="flex gap-2 p-3 bg-white/50">
              <div className="flex-1 text-center p-2 rounded-xl bg-pink-100">
                <p className="text-xs text-pink-600 font-bold">Poppetjes</p>
                <p className="text-lg font-black text-pink-700">
                  {collectedCharacters}/{totalCharacters}
                </p>
                <div className="h-1.5 bg-pink-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all"
                    style={{ width: `${(collectedCharacters / totalCharacters) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex-1 text-center p-2 rounded-xl bg-purple-100">
                <p className="text-xs text-purple-600 font-bold">Hartjes</p>
                <p className="text-lg font-black text-purple-700">
                  {collectedHearts}/{totalHearts}
                </p>
                <div className="h-1.5 bg-purple-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${(collectedHearts / totalHearts) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-3 pt-2">
              <button
                onClick={() => setActiveTab('characters')}
                className={`flex-1 py-2 rounded-t-xl font-bold text-sm transition-all ${
                  activeTab === 'characters'
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'bg-pink-100 text-pink-400'
                }`}
              >
                🎭 Poppetjes
              </button>
              <button
                onClick={() => setActiveTab('hearts')}
                className={`flex-1 py-2 rounded-t-xl font-bold text-sm transition-all ${
                  activeTab === 'hearts'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'bg-purple-100 text-purple-400'
                }`}
              >
                💖 Hartjes
              </button>
              <button
                onClick={() => setActiveTab('room')}
                className={`flex-1 py-2 rounded-t-xl font-bold text-sm transition-all ${
                  activeTab === 'room'
                    ? 'bg-white text-amber-600 shadow-md'
                    : 'bg-amber-100 text-amber-400'
                }`}
              >
                🏠 Kamertje
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-white rounded-b-xl mx-3 mb-3 p-3">
              {/* Characters Tab */}
              {activeTab === 'characters' && (
                <>
                  {/* Category Filter */}
                  <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                        selectedCategory === 'all'
                          ? 'bg-pink-500 text-white'
                          : 'bg-pink-100 text-pink-600'
                      }`}
                    >
                      Alles
                    </button>
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          selectedCategory === key
                            ? 'bg-pink-500 text-white'
                            : 'bg-pink-100 text-pink-600'
                        }`}
                      >
                        {cat.emoji} {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Characters Grid */}
                  <div className="grid grid-cols-5 gap-2">
                    {filteredCharacters.map((char) => {
                      const owned = ownedCosmetics.includes(char.id) || char.unlocked;
                      const rarityStyle = getRarityStyle(char.rarity);

                      return (
                        <motion.div
                          key={char.id}
                          whileHover={owned ? { scale: 1.1 } : {}}
                          whileTap={owned ? { scale: 0.95 } : {}}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 transition-all cursor-pointer ${
                            owned
                              ? 'shadow-md'
                              : 'bg-gray-100 border-gray-200 opacity-40'
                          }`}
                          style={owned ? {
                            backgroundColor: rarityStyle.bg,
                            borderColor: rarityStyle.border,
                          } : {}}
                          title={owned ? `${char.name}: ${char.description}` : '???'}
                        >
                          <span className={`text-2xl ${!owned && 'grayscale blur-sm'}`}>
                            {owned ? char.preview : '❓'}
                          </span>
                          {owned && (
                            <span className="text-[8px] font-bold truncate w-full text-center" style={{ color: rarityStyle.text }}>
                              {char.name.split(' ')[0]}
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Hearts Tab */}
              {activeTab === 'hearts' && (
                <div className="grid grid-cols-4 gap-3">
                  {SHOP_HEARTS.map((heart) => {
                    const owned = ownedCosmetics.includes(heart.id) || heart.unlocked;
                    const rarityStyle = getRarityStyle(heart.rarity);

                    return (
                      <motion.div
                        key={heart.id}
                        whileHover={owned ? { scale: 1.05 } : {}}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border-2 ${
                          owned
                            ? 'shadow-lg'
                            : 'bg-gray-100 border-gray-200 opacity-40'
                        }`}
                        style={owned ? {
                          backgroundColor: rarityStyle.bg,
                          borderColor: rarityStyle.border,
                        } : {}}
                      >
                        <span className={`text-3xl ${!owned && 'grayscale blur-sm'}`}>
                          {owned ? heart.preview : '❓'}
                        </span>
                        {owned && (
                          <>
                            <span className="text-[10px] font-bold text-center leading-tight" style={{ color: rarityStyle.text }}>
                              {heart.name}
                            </span>
                            <span className="text-[8px] text-gray-500">
                              {heart.face}
                            </span>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Room Tab - Kawaii Room to display collection */}
              {activeTab === 'room' && (
                <div className="relative">
                  {/* Room Background */}
                  <div 
                    className="rounded-2xl p-4 min-h-[300px] relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(to bottom, #FDF2F8 0%, #FCE7F3 50%, #FBCFE8 100%)',
                    }}
                  >
                    {/* Wall decorations */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-4xl">🖼️</div>
                    <div className="absolute top-2 left-4 text-2xl">🪟</div>
                    <div className="absolute top-2 right-4 text-2xl">🪟</div>
                    
                    {/* Shelf */}
                    <div className="absolute top-16 left-0 right-0 h-12 bg-gradient-to-b from-amber-200 to-amber-300 border-b-4 border-amber-400 flex items-end justify-center gap-3 px-4 pb-1">
                      {ownedCharacters.slice(0, 8).map((char, i) => (
                        <motion.span
                          key={char.id}
                          className="text-2xl cursor-pointer"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                          title={char.name}
                        >
                          {char.preview}
                        </motion.span>
                      ))}
                    </div>

                    {/* Floor area with more characters */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-pink-200 to-transparent">
                      {/* Rug */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 rounded-full opacity-60" />
                      
                      {/* Characters on floor */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 flex-wrap px-4">
                        {ownedCharacters.slice(8, 20).map((char, i) => (
                          <motion.span
                            key={char.id}
                            className="text-xl cursor-pointer"
                            animate={{ 
                              y: [0, -5, 0],
                              rotate: [0, i % 2 === 0 ? 5 : -5, 0]
                            }}
                            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                            title={char.name}
                          >
                            {char.preview}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Bed with plushies */}
                    <div className="absolute bottom-20 right-2 text-3xl">🛏️</div>
                    <div className="absolute bottom-24 right-6 flex gap-1">
                      {ownedCharacters.slice(20, 23).map((char) => (
                        <span key={char.id} className="text-lg">{char.preview}</span>
                      ))}
                    </div>

                    {/* Desk area */}
                    <div className="absolute bottom-16 left-2 text-2xl">🪑</div>
                    <div className="absolute bottom-20 left-6 text-xl">💻</div>

                    {/* Hearts floating */}
                    {ownedHearts.slice(0, 5).map((heart, i) => (
                      <motion.span
                        key={heart.id}
                        className="absolute text-xl"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 3) * 10}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
                      >
                        {heart.preview}
                      </motion.span>
                    ))}
                  </div>

                  {/* Room info */}
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600">
                      Je hebt <span className="font-bold text-pink-600">{ownedCharacters.length}</span> poppetjes in je kamertje!
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Verzamel meer om je kamer te vullen ✨
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 text-center">
              <p className="text-xs text-gray-500">
                Totaal verzameld: {collectedCharacters + collectedHearts} / {totalCharacters + totalHearts} items
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CollectionBook;
