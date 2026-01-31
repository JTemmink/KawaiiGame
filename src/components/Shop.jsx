import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOP_UPGRADES, SHOP_CHARACTERS, SHOP_HEARTS, PRICE_MULTIPLIER_PER_LEVEL } from '../utils/constants';

function Shop({ show, onClose, coins, level, ownedUpgrades, ownedCosmetics, selectedCharacter, selectedHeart, onPurchaseUpgrade, onPurchaseCosmetic, onSelectCharacter, onSelectHeart }) {
  const [activeTab, setActiveTab] = useState('upgrades');

  const getScaledPrice = (basePrice) => {
    return Math.floor(basePrice * Math.pow(PRICE_MULTIPLIER_PER_LEVEL, level - 1));
  };

  const isUpgradeOwned = (itemId) => ownedUpgrades.includes(itemId);
  const isCosmeticOwned = (itemId) => ownedCosmetics.includes(itemId) || itemId === 'default_hand' || itemId === 'default_heart';
  const canAfford = (price) => coins >= price;

  const tabs = [
    { id: 'upgrades', label: '⚡ Upgrades', emoji: '⚡' },
    { id: 'characters', label: '🎭 Poppetjes', emoji: '🎭' },
    { id: 'hearts', label: '💖 Hartjes', emoji: '💖' },
  ];

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
            className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-2xl font-black text-gray-800">🛍️ Shop</h2>
                <p className="text-xs text-gray-500">Level {level} - Prijzen schalen mee!</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none p-2"
              >
                ×
              </button>
            </div>

            {/* Coins display */}
            <div className="flex items-center justify-center gap-2 mb-3 py-2 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100">
              <span className="text-2xl">💰</span>
              <span className="text-2xl font-black text-amber-600">{coins.toLocaleString()}</span>
              <span className="text-sm text-amber-600 font-bold">coins</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-3 bg-gray-100 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-2 rounded-lg font-bold text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-white shadow-md text-pink-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {/* Upgrades Tab */}
              {activeTab === 'upgrades' && SHOP_UPGRADES.map((item, index) => {
                const owned = isUpgradeOwned(item.id);
                const price = getScaledPrice(item.basePrice);
                const affordable = canAfford(price);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`p-3 rounded-2xl border-2 transition-all ${
                      owned
                        ? 'bg-green-50 border-green-300'
                        : affordable
                        ? 'bg-white border-pink-200 hover:border-pink-400 hover:shadow-md cursor-pointer'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                    onClick={() => !owned && affordable && onPurchaseUpgrade(item, price)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{item.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                          {owned && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-white font-bold">✓</span>}
                        </div>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      {!owned && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full font-bold text-xs ${
                          affordable ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <span>💰</span>
                          <span>{price.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Characters Tab */}
              {activeTab === 'characters' && (
                <div className="grid grid-cols-2 gap-2">
                  {SHOP_CHARACTERS.map((item, index) => {
                    const owned = isCosmeticOwned(item.id);
                    const affordable = canAfford(item.price);
                    const isSelected = selectedCharacter === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className={`p-3 rounded-2xl border-2 transition-all text-center ${
                          isSelected
                            ? 'bg-pink-100 border-pink-400 shadow-lg'
                            : owned
                            ? 'bg-green-50 border-green-300 cursor-pointer hover:border-green-400'
                            : affordable
                            ? 'bg-white border-gray-200 hover:border-pink-300 cursor-pointer'
                            : 'bg-gray-50 border-gray-200 opacity-50'
                        }`}
                        onClick={() => {
                          if (owned) {
                            onSelectCharacter(item.id);
                          } else if (affordable) {
                            onPurchaseCosmetic('character', item);
                          }
                        }}
                      >
                        <div className="text-4xl mb-1">{item.preview}</div>
                        <h3 className="font-bold text-xs text-gray-800">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                        {isSelected ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500 text-white font-bold">Actief</span>
                        ) : owned ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-white font-bold">Gekocht</span>
                        ) : (
                          <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-600">
                            <span>💰</span>
                            <span>{item.price.toLocaleString()}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Hearts Tab */}
              {activeTab === 'hearts' && (
                <div className="grid grid-cols-2 gap-2">
                  {SHOP_HEARTS.map((item, index) => {
                    const owned = isCosmeticOwned(item.id);
                    const affordable = canAfford(item.price);
                    const isSelected = selectedHeart === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className={`p-3 rounded-2xl border-2 transition-all text-center ${
                          isSelected
                            ? 'bg-pink-100 border-pink-400 shadow-lg'
                            : owned
                            ? 'bg-green-50 border-green-300 cursor-pointer hover:border-green-400'
                            : affordable
                            ? 'bg-white border-gray-200 hover:border-pink-300 cursor-pointer'
                            : 'bg-gray-50 border-gray-200 opacity-50'
                        }`}
                        onClick={() => {
                          if (owned) {
                            onSelectHeart(item.id);
                          } else if (affordable) {
                            onPurchaseCosmetic('heart', item);
                          }
                        }}
                      >
                        <div className="text-4xl mb-1">{item.preview}</div>
                        <h3 className="font-bold text-xs text-gray-800">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                        {isSelected ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500 text-white font-bold">Actief</span>
                        ) : owned ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-white font-bold">Gekocht</span>
                        ) : (
                          <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-600">
                            <span>💰</span>
                            <span>{item.price.toLocaleString()}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Sluiten
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Shop;
