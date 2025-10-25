import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import Board from '../components/Board';
import GameInfoPanel from '../components/GameInfoPanel';
import MarketCard from '../components/MarketCard';
import PolymarketCard from '../components/PolymarketCard';
import TokenGrid from '../components/TokenGrid';
import Modal from '../components/Modal';
import { useGameLogic } from '../hooks/useGameLogic';
import { usePolymarket } from '../hooks/usePolymarket';
import { NFT } from '../types';

const GamePage: React.FC = () => {
  const { isConnected, account, signPrediction } = useWeb3();
  const {
    gameState,
    playerPosition,
    playerBalance,
    properties,
    rollDice,
    buyProperty,
    sellProperty,
    makePrediction,
    mintNFT
  } = useGameLogic(signPrediction);

  const { markets, loading: polymarketLoading, getTopMarkets } = usePolymarket();

  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [activeTab, setActiveTab] = useState<'game' | 'nfts' | 'polymarket'>('game');
  const [userPredictions, setUserPredictions] = useState<{ [marketId: string]: string }>({});

  const handlePolymarketPrediction = (marketId: string, outcome: string) => {
    setUserPredictions(prev => ({ ...prev, [marketId]: outcome }));
    makePrediction(marketId, outcome);
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Wallet Required</h2>
        <p className="text-gray-400 mb-6">Please connect your wallet to play the game</p>
        <div className="text-6xl">🔗</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('game')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'game'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🎮 Game Board
        </button>
        <button
          onClick={() => setActiveTab('polymarket')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'polymarket'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          📊 Polymarket ({markets.length})
        </button>
        <button
          onClick={() => setActiveTab('nfts')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'nfts'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🎨 NFT Collection ({nfts.length})
        </button>
      </div>

      {activeTab === 'game' ? (
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center">Crypto Poly Game Board</h2>
              <Board
                properties={properties}
                playerPosition={playerPosition}
                onPropertyClick={setSelectedProperty}
                selectedProperty={selectedProperty}
              />
            </div>
          </div>

          {/* Game Info Panel */}
          <div className="lg:col-span-1">
            <GameInfoPanel
              playerBalance={playerBalance}
              playerPosition={playerPosition}
              gameState={gameState}
              onRollDice={rollDice}
              onBuyProperty={() => selectedProperty && buyProperty(selectedProperty)}
              onSellProperty={() => selectedProperty && sellProperty(selectedProperty)}
              onMakePrediction={() => setShowMarketModal(true)}
              onMintNFT={mintNFT}
              selectedProperty={selectedProperty}
              properties={properties}
            />
          </div>
        </div>
      ) : activeTab === 'polymarket' ? (
        <div className="space-y-6">
          {/* Polymarket Header */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Live Polymarket Predictions</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Live Data</span>
              </div>
            </div>
            <p className="text-gray-300">
              Make predictions on real crypto markets and earn rewards based on accuracy. 
              Data powered by Polymarket.
            </p>
          </div>

          {/* Polymarket Cards */}
          {polymarketLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded mb-4"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTopMarkets(6).map((market) => (
                <PolymarketCard
                  key={market.id}
                  market={market}
                  onPredict={handlePolymarketPrediction}
                  userPredictions={userPredictions}
                />
              ))}
            </div>
          )}

          {/* Polymarket Stats */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Your Polymarket Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{Object.keys(userPredictions).length}</div>
                <div className="text-sm text-gray-400">Predictions Made</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{gameState.accuracy}%</div>
                <div className="text-sm text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{gameState.predictionsMade}</div>
                <div className="text-sm text-gray-400">Total Predictions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{gameState.nftsOwned}</div>
                <div className="text-sm text-gray-400">NFTs Earned</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <TokenGrid
            nfts={nfts}
            title="Your NFT Collection"
            onNFTClick={(nft) => {
              setSelectedNFT(nft);
              setShowNFTModal(true);
            }}
          />
        </div>
      )}

      {/* Market Predictions */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Live Market Predictions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MarketCard
            title="Bitcoin Price"
            currentPrice="$43,250"
            prediction="Will BTC reach $50K this week?"
            options={["Yes", "No"]}
            onPredict={(option) => makePrediction("BTC_50K", option)}
          />
          <MarketCard
            title="Ethereum"
            currentPrice="$2,650"
            prediction="Will ETH outperform BTC?"
            options={["Yes", "No"]}
            onPredict={(option) => makePrediction("ETH_BTC", option)}
          />
          <MarketCard
            title="DeFi TVL"
            currentPrice="$45.2B"
            prediction="Will DeFi TVL hit $50B?"
            options={["Yes", "No"]}
            onPredict={(option) => makePrediction("DEFI_50B", option)}
          />
        </div>
      </div>

      {/* Player Stats */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Your Trading Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{gameState.predictionsMade}</div>
            <div className="text-sm text-gray-400">Predictions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{gameState.accuracy}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{gameState.nftsOwned}</div>
            <div className="text-sm text-gray-400">NFTs Owned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{gameState.propertiesOwned}</div>
            <div className="text-sm text-gray-400">Properties</div>
          </div>
        </div>
      </div>

      {/* NFT Detail Modal */}
      <Modal
        isOpen={showNFTModal}
        onClose={() => setShowNFTModal(false)}
        title={selectedNFT?.name || 'NFT Details'}
        size="lg"
      >
        {selectedNFT && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img 
                  src={selectedNFT.image} 
                  alt={selectedNFT.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedNFT.name}</h3>
                  <p className="text-gray-300 mt-2">{selectedNFT.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Accuracy</div>
                    <div className="text-lg font-semibold text-green-400">{selectedNFT.attributes.accuracy}%</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Predictions</div>
                    <div className="text-lg font-semibold text-blue-400">{selectedNFT.attributes.predictions}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Properties</div>
                    <div className="text-lg font-semibold text-purple-400">{selectedNFT.attributes.properties}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Rarity</div>
                    <div className="text-lg font-semibold text-yellow-400 capitalize">{selectedNFT.rarity}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNFT.attributes.achievements.map((achievement, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  Minted: {new Date(selectedNFT.mintedAt).toLocaleString()}
                </div>
              </div>
            </div>
        </div>
        )}
      </Modal>
    </div>
  );
};

export default GamePage;