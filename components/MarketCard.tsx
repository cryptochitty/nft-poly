
import React from 'react';
import { Market } from '../types';

interface MarketCardProps {
  market: Market;
  onChoose: (market: Market, outcome: 'YES' | 'NO') => void;
  disabled: boolean;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onChoose, disabled }) => {
  if (!market) return null;

  return (
    <div className="w-full bg-gray-800 border-2 border-purple-500 rounded-lg shadow-lg text-gray-200">
      <div className="p-3 text-center">
        <img src={market.imageUrl} alt="Market" className="w-16 h-16 object-contain mx-auto mb-2" />
        <h3 className="font-bold text-sm leading-tight">{market.question}</h3>
      </div>
      
      {market.owner ? (
        <div className="p-2 text-center bg-gray-600 text-white text-xs font-bold">
            Position already taken.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-2 bg-gray-900 rounded-b-lg">
            <button
                onClick={() => onChoose(market, 'YES')}
                disabled={disabled}
                className="p-2 bg-green-600 text-white font-bold rounded shadow hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
                Invest YES (${market.outcomePrices.yes})
            </button>
            <button
                onClick={() => onChoose(market, 'NO')}
                disabled={disabled}
                className="p-2 bg-red-600 text-white font-bold rounded shadow hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
                Invest NO (${market.outcomePrices.no})
            </button>
        </div>
      )}
    </div>
  );
};

export default MarketCard;
