import React from 'react';
import { Property } from '../types';

interface TileProps {
  property: Property;
  index: number;
  isPlayerHere: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ 
  property, 
  index, 
  isPlayerHere, 
  isSelected, 
  onClick 
}) => {
  const getTileColor = () => {
    if (property.owner) {
      return property.owner === 'player' ? 'bg-green-600' : 'bg-red-600';
    }
    return 'bg-gray-600';
  };

  const getBorderColor = () => {
    if (isSelected) return 'border-yellow-400 border-2';
    if (isPlayerHere) return 'border-blue-400 border-2';
    return 'border-gray-500 border';
  };

  return (
    <div
      className={`relative w-full h-full ${getTileColor()} ${getBorderColor()} rounded cursor-pointer hover:opacity-80 transition-all`}
      onClick={onClick}
    >
      {/* Property info */}
      <div className="p-1 h-full flex flex-col justify-between">
        <div className="text-xs font-bold text-white text-center leading-tight">
          {property.name}
        </div>
        
        {property.price && (
          <div className="text-xs text-yellow-300 text-center">
            ${property.price.toLocaleString()}
          </div>
        )}

        {property.owner && (
          <div className="text-xs text-center">
            <span className={`px-1 py-0.5 rounded text-white ${
              property.owner === 'player' ? 'bg-green-700' : 'bg-red-700'
            }`}>
              {property.owner === 'player' ? 'OWNED' : 'TAKEN'}
            </span>
          </div>
        )}

        {/* Rent info */}
        {property.rent && (
          <div className="text-xs text-gray-200 text-center">
            Rent: ${property.rent}
          </div>
        )}

        {/* Special tiles */}
        {property.type === 'chance' && (
          <div className="text-center">
            <div className="text-lg">🎲</div>
            <div className="text-xs text-white">CHANCE</div>
          </div>
        )}

        {property.type === 'community' && (
          <div className="text-center">
            <div className="text-lg">💎</div>
            <div className="text-xs text-white">COMMUNITY</div>
          </div>
        )}

        {property.type === 'tax' && (
          <div className="text-center">
            <div className="text-lg">💰</div>
            <div className="text-xs text-white">TAX</div>
          </div>
        )}

        {property.type === 'utility' && (
          <div className="text-center">
            <div className="text-lg">⚡</div>
            <div className="text-xs text-white">UTILITY</div>
          </div>
        )}
      </div>

      {/* Player indicator */}
      {isPlayerHere && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white animate-pulse" />
      )}
    </div>
  );
};

export default Tile;