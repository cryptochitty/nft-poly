
import React from 'react';
import { NFT } from '../types';

interface NFTCardProps {
  nft: NFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const outcomeColor = nft.outcome === 'YES' ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400';

  return (
    <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-4 border border-gray-700">
      <img src={nft.imageUrl} alt="NFT" className="w-12 h-12 object-contain rounded-md" />
      <div className="flex-grow">
        <p className="text-xs text-gray-300 leading-tight">{nft.marketQuestion}</p>
        <div className="flex items-center justify-between mt-1">
            <span className={`text-sm font-bold px-2 py-0.5 border rounded ${outcomeColor}`}>
                {nft.outcome}
            </span>
            <span className="text-xs font-mono text-gray-400">Paid: ${nft.purchasePrice}</span>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
