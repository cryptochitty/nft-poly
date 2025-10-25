import React from 'react';
import { useWeb3 } from '../context/Web3Context';

interface HomePageProps {
  onStartGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
  const { isConnected } = useWeb3();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          Crypto Poly
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          The ultimate NFT trading game where you can predict market movements, 
          trade virtual properties, and mint exclusive NFTs based on your predictions.
        </p>
        
        {isConnected ? (
          <button
            onClick={onStartGame}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            🎮 Start Playing
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-yellow-400">⚠️ Connect your wallet to start playing</p>
            <p className="text-sm text-gray-400">You need a Web3 wallet to participate in the game</p>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-3xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-3">Prediction Markets</h3>
          <p className="text-gray-300">
            Make predictions on crypto prices, market trends, and events. 
            Your accuracy determines your rewards and NFT rarity.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-3xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold mb-3">Virtual Properties</h3>
          <p className="text-gray-300">
            Buy, sell, and trade virtual properties on the game board. 
            Each property represents different market sectors and crypto assets.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-3xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-3">NFT Collection</h3>
          <p className="text-gray-300">
            Mint unique NFTs based on your trading performance and predictions. 
            Collect rare digital assets that represent your achievements.
          </p>
        </div>
      </div>

      {/* How to Play */}
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How to Play</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">1. Connect & Predict</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Connect your Web3 wallet</li>
              <li>• Make predictions on market movements</li>
              <li>• Use your knowledge to forecast trends</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">2. Trade & Earn</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Buy and sell virtual properties</li>
              <li>• Earn rewards for accurate predictions</li>
              <li>• Build your trading portfolio</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">3. Mint NFTs</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Convert achievements into NFTs</li>
              <li>• Collect rare digital assets</li>
              <li>• Show off your trading skills</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">4. Compete</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Climb the leaderboards</li>
              <li>• Compete with other traders</li>
              <li>• Become a crypto prediction master</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400">1,234</div>
          <div className="text-sm text-gray-400">Active Players</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-400">5,678</div>
          <div className="text-sm text-gray-400">NFTs Minted</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">$12.3K</div>
          <div className="text-sm text-gray-400">Total Volume</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-400">89%</div>
          <div className="text-sm text-gray-400">Accuracy Rate</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;