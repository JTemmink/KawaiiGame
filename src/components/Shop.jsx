import { motion, AnimatePresence } from 'framer-motion';
import { SHOP_ITEMS } from '../utils/constants';

function Shop({ show, onClose, coins, ownedUpgrades, onPurchase }) {
  const isOwned = (itemId) => ownedUpgrades.includes(itemId);
  const canAfford = (price) => coins >= price;

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
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[85vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black text-gray-800">
                  🛍️ Shop
                </h2>
                <p className="text-sm text-gray-500">Koop upgrades met je coins!</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-2"
              >
                ×
              </button>
            </div>

            {/* Coins display */}
            <div className="flex items-center justify-center gap-2 mb-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100">
              <span className="text-2xl">💰</span>
              <span className="text-2xl font-black text-amber-600">{coins.toLocaleString()}</span>
              <span className="text-sm text-amber-600 font-bold">coins</span>
            </div>

            {/* Items grid */}
            <div className="space-y-3 overflow-y-auto max-h-[50vh] pr-2">
              {SHOP_ITEMS.map((item, index) => {
                const owned = isOwned(item.id);
                const affordable = canAfford(item.price);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      owned
                        ? 'bg-green-50 border-green-300'
                        : affordable
                        ? 'bg-white border-pink-200 hover:border-pink-400 hover:shadow-md cursor-pointer'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                    onClick={() => !owned && affordable && onPurchase(item)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Emoji */}
                      <div className="text-3xl">{item.emoji}</div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-800">{item.name}</h3>
                          {owned && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-white font-bold">
                              ✓ Gekocht
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                      </div>

                      {/* Price */}
                      {!owned && (
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold ${
                          affordable
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <span>💰</span>
                          <span>{item.price}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold hover:scale-105 transition-transform shadow-lg"
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
