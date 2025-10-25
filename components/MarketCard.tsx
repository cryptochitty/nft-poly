import React, { useState } from 'react';

interface MarketCardProps {
  title: string;
  currentPrice: string;
  prediction: string;
  options: string[];
  onPredict: (option: string) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({
  title,
  currentPrice,
  prediction,
  options,
  onPredict
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasPredicted, setHasPredicted] = useState(false);

  const handlePredict = (option: string) => {
    setSelectedOption(option);
    setHasPredicted(true);
    onPredict(option);
  };

  const getPriceChangeColor = () => {
    // Simulate price change
    const change = Math.random() > 0.5 ? 'up' : 'down';
    return change === 'up' ? 'text-green-400' : 'text-red-400';
  };

  const getPriceChangeIcon = () => {
    const change = Math.random() > 0.5 ? 'up' : 'down';
    return change === 'up' ? '↗️' : '↘️';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="text-sm text-gray-400">
          {getPriceChangeIcon()} {getPriceChangeColor()}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-blue-400 mb-2">{currentPrice}</div>
        <p className="text-sm text-gray-300">{prediction}</p>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handlePredict(option)}
            disabled={hasPredicted}
            className={`w-full px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              hasPredicted
                ? selectedOption === option
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {option}
            {hasPredicted && selectedOption === option && (
              <span className="ml-2">✓</span>
            )}
          </button>
        ))}
      </div>

      {hasPredicted && (
        <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded-lg">
          <p className="text-sm text-green-400">
            ✓ Prediction submitted! Check back later for results.
          </p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Volume: ${(Math.random() * 1000000).toLocaleString()}</span>
          <span>24h Change: {Math.random() > 0.5 ? '+' : ''}{(Math.random() * 20 - 10).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;