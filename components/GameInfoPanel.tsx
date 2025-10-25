import React from 'react';
import { Property } from '../types';

interface GameInfoPanelProps {
  playerBalance: number;
  playerPosition: number;
  gameState: {
    predictionsMade: number;
    accuracy: number;
    nftsOwned: number;
    propertiesOwned: number;
  };
  onRollDice: () => void;
  onBuyProperty: () => void;
  onSellProperty: () => void;
  onMakePrediction: () => void;
  onMintNFT: () => void;
  selectedProperty: number | null;
  properties: Property[];
}

const GameInfoPanel: React.FC<GameInfoPanelProps> = ({
  playerBalance,
  playerPosition,
  gameState,
  onRollDice,
  onBuyProperty,
  onSellProperty,
  onMakePrediction,
  onMintNFT,
  selectedProperty,
  properties
}) => {
  const selectedProp = selectedProperty !== null ? properties[selectedProperty] : null;

  return (
    <div className="space-y-6">
      {/* Player Stats */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-blue-400">Player Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Balance:</span>
            <span className="text-green-400 font-semibold">${playerBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Position:</span>
            <span className="text-blue-400 font-semibold">{playerPosition + 1}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Properties:</span>
            <span className="text-purple-400 font-semibold">{gameState.propertiesOwned}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">NFTs:</span>
            <span className="text-yellow-400 font-semibold">{gameState.nftsOwned}</span>
          </div>
        </div>
      </div>

      {/* Game Actions */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-green-400">Game Actions</h3>
        <div className="space-y-3">
          <button
            onClick={onRollDice}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
          >
            🎲 Roll Dice
          </button>
          
          <button
            onClick={onMakePrediction}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
          >
            🎯 Make Prediction
          </button>
          
          <button
            onClick={onMintNFT}
            className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors font-semibold"
          >
            🎨 Mint NFT
          </button>
        </div>
      </div>

      {/* Property Actions */}
      {selectedProp && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold mb-4 text-orange-400">Property Actions</h3>
          <div className="mb-4">
            <h4 className="font-semibold text-white">{selectedProp.name}</h4>
            <p className="text-sm text-gray-300">Type: {selectedProp.type}</p>
            {selectedProp.price && (
              <p className="text-sm text-gray-300">Price: ${selectedProp.price.toLocaleString()}</p>
            )}
            {selectedProp.rent && (
              <p className="text-sm text-gray-300">Rent: ${selectedProp.rent}</p>
            )}
            {selectedProp.owner && (
              <p className="text-sm text-gray-300">
                Owner: {selectedProp.owner === 'player' ? 'You' : 'Other Player'}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            {!selectedProp.owner && selectedProp.price && playerBalance >= selectedProp.price && (
              <button
                onClick={onBuyProperty}
                className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
              >
                Buy Property
              </button>
            )}
            
            {selectedProp.owner === 'player' && (
              <button
                onClick={onSellProperty}
                className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
              >
                Sell Property
              </button>
            )}
          </div>
        </div>
      )}

      {/* Trading Stats */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-cyan-400">Trading Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Predictions:</span>
            <span className="text-blue-400 font-semibold">{gameState.predictionsMade}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Accuracy:</span>
            <span className="text-green-400 font-semibold">{gameState.accuracy}%</span>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-pink-400">Quick Tips</h3>
        <div className="text-sm text-gray-300 space-y-2">
          <p>• Click on properties to see details</p>
          <p>• Make accurate predictions to earn rewards</p>
          <p>• Buy properties to collect rent</p>
          <p>• Mint NFTs to showcase achievements</p>
        </div>
      </div>
    </div>
  );
};

export default GameInfoPanel;