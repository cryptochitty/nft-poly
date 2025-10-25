import React from 'react';
import { NFT } from '../types';

interface NFTCardProps {
  nft: NFT;
  onClick?: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onClick }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500 bg-yellow-900/20';
      case 'epic': return 'border-purple-500 bg-purple-900/20';
      case 'rare': return 'border-blue-500 bg-blue-900/20';
      default: return 'border-gray-500 bg-gray-900/20';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'Legendary';
      case 'epic': return 'Epic';
      case 'rare': return 'Rare';
      default: return 'Common';
    }
  };

  return (
    <div 
      className={`bg-gray-800 rounded-lg border-2 ${getRarityColor(nft.rarity)} p-4 cursor-pointer hover:scale-105 transition-transform`}
      onClick={onClick}
    >
      {/* NFT Image */}
      <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nft.id}`;
          }}
        />
      </div>

      {/* NFT Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white truncate">{nft.name}</h3>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            nft.rarity === 'legendary' ? 'bg-yellow-600 text-yellow-100' :
            nft.rarity === 'epic' ? 'bg-purple-600 text-purple-100' :
            nft.rarity === 'rare' ? 'bg-blue-600 text-blue-100' :
            'bg-gray-600 text-gray-100'
          }`}>
            {getRarityText(nft.rarity)}
          </span>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2">{nft.description}</p>

        {/* Attributes */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-700 px-2 py-1 rounded">
            <div className="text-gray-400">Accuracy</div>
            <div className="text-green-400 font-semibold">{nft.attributes.accuracy}%</div>
          </div>
          <div className="bg-gray-700 px-2 py-1 rounded">
            <div className="text-gray-400">Predictions</div>
            <div className="text-blue-400 font-semibold">{nft.attributes.predictions}</div>
          </div>
        </div>

        {/* Mint Date */}
        <div className="text-xs text-gray-500">
          Minted: {new Date(nft.mintedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;