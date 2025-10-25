import React, { useState } from 'react';
import { PolymarketMarket } from '../api/polymarket';

interface PolymarketCardProps {
  market: PolymarketMarket;
  onPredict: (marketId: string, outcome: string) => void;
  userPredictions?: { [marketId: string]: string };
  isSigning?: boolean;
}

const PolymarketCard: React.FC<PolymarketCardProps> = ({
  market,
  onPredict,
  userPredictions = {},
  isSigning = false
}) => {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [hasPredicted, setHasPredicted] = useState(false);

  const yesPrice = market.outcome_tokens.find(t => t.outcome === 'Yes')?.price || 0;
  const noPrice = market.outcome_tokens.find(t => t.outcome === 'No')?.price || 0;
  const yesProbability = Math.round(yesPrice * 100);
  const noProbability = Math.round(noPrice * 100);

  const userPrediction = userPredictions[market.id];
  const isUserPrediction = userPrediction !== undefined;

  const handlePredict = (outcome: string) => {
    setSelectedOutcome(outcome);
    setHasPredicted(true);
    onPredict(market.id, outcome);
  };

  const formatVolume = (volume: number): string => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  const getTimeRemaining = (endDate: number): string => {
    const now = Date.now() / 1000;
    const timeLeft = endDate - now;
    
    if (timeLeft <= 0) return 'Ended';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getMarketStatusColor = (): string => {
    if (market.closed) return 'text-red-400';
    if (market.active) return 'text-green-400';
    return 'text-gray-400';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
      {/* Market Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {market.question}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {market.description}
          </p>
        </div>
        {market.image && (
          <img 
            src={market.image} 
            alt="Market"
            className="w-12 h-12 rounded-lg ml-4 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <div className="text-gray-400">Volume</div>
          <div className="text-blue-400 font-semibold">{formatVolume(market.volume)}</div>
        </div>
        <div>
          <div className="text-gray-400">Liquidity</div>
          <div className="text-purple-400 font-semibold">{formatVolume(market.liquidity)}</div>
        </div>
        <div>
          <div className="text-gray-400">Time Left</div>
          <div className={`font-semibold ${getMarketStatusColor()}`}>
            {getTimeRemaining(market.end_date)}
          </div>
        </div>
      </div>

      {/* Prediction Options */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handlePredict('Yes')}
            disabled={hasPredicted || market.closed || isSigning}
            className={`p-3 rounded-lg transition-colors text-sm font-medium ${
              hasPredicted
                ? selectedOutcome === 'Yes'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : isUserPrediction && userPrediction === 'Yes'
                ? 'bg-green-700 text-green-100 border border-green-500'
                : isSigning
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>Yes</span>
              <span className="text-xs opacity-75">{yesProbability}%</span>
            </div>
            <div className="text-xs opacity-75">${yesPrice.toFixed(2)}</div>
          </button>

          <button
            onClick={() => handlePredict('No')}
            disabled={hasPredicted || market.closed || isSigning}
            className={`p-3 rounded-lg transition-colors text-sm font-medium ${
              hasPredicted
                ? selectedOutcome === 'No'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : isUserPrediction && userPrediction === 'No'
                ? 'bg-red-700 text-red-100 border border-red-500'
                : isSigning
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>No</span>
              <span className="text-xs opacity-75">{noProbability}%</span>
            </div>
            <div className="text-xs opacity-75">${noPrice.toFixed(2)}</div>
          </button>
        </div>
      </div>

      {/* User Prediction Status */}
      {isUserPrediction && (
        <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600 rounded-lg">
          <p className="text-sm text-blue-400">
            ✓ You predicted: <span className="font-semibold">{userPrediction}</span>
          </p>
        </div>
      )}

      {hasPredicted && !isUserPrediction && (
        <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded-lg">
          <p className="text-sm text-green-400">
            ✓ Prediction submitted! Check back later for results.
          </p>
        </div>
      )}

      {isSigning && (
        <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600 rounded-lg">
          <p className="text-sm text-blue-400 flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing prediction with wallet...
          </p>
        </div>
      )}

      {/* Market Link */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <a
          href={`https://polymarket.com/event/${market.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
        >
          View on Polymarket
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PolymarketCard;
