import React from 'react';
import NFTCard from './NFTCard';
import { NFT } from '../types';

interface TokenGridProps {
  nfts: NFT[];
  title?: string;
  onNFTClick?: (nft: NFT) => void;
}

const TokenGrid: React.FC<TokenGridProps> = ({ nfts, title = "Your NFTs", onNFTClick }) => {
  if (nfts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No NFTs Yet</h3>
        <p className="text-gray-400">
          Make predictions and achieve high accuracy to mint your first NFT!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <NFTCard
            key={nft.id}
            nft={nft}
            onClick={() => onNFTClick?.(nft)}
          />
        ))}
      </div>
    </div>
  );
};

export default TokenGrid;