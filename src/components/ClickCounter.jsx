import { CLICKS_TO_EXPLOSION } from '../utils/constants';

function ClickCounter({ clicks, bonusActive }) {
  const progress = (clicks / CLICKS_TO_EXPLOSION) * 100;

  return (
    <div className="text-center mt-6">
      <p className="text-lg font-bold text-gray-600">
        <span className={`text-2xl ${bonusActive ? 'text-gold' : 'text-pink-primary'}`}>
          {clicks}
        </span>
        <span>/{CLICKS_TO_EXPLOSION} kliks</span>
      </p>
      
      {/* Progress bar */}
      <div className="w-64 h-2 bg-white/80 rounded-full mt-3 overflow-hidden shadow-inner mx-auto">
        <div
          className={`h-full rounded-full transition-all duration-150 ease-out relative ${
            bonusActive 
              ? 'bg-gradient-to-r from-gold to-orange-500' 
              : 'bg-gradient-to-r from-pink-primary to-pink-dark'
          }`}
          style={{ width: `${progress}%` }}
        >
          {/* Shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default ClickCounter;
