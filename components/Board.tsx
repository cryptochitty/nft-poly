import React from 'react';
import Tile from './Tile';
import { Property } from '../types';

interface BoardProps {
  properties: Property[];
  playerPosition: number;
  onPropertyClick: (index: number) => void;
  selectedProperty: number | null;
}

const Board: React.FC<BoardProps> = ({ 
  properties, 
  playerPosition, 
  onPropertyClick, 
  selectedProperty 
}) => {
  const boardSize = 8; // 8x8 grid
  const totalTiles = boardSize * 4 - 4; // 28 tiles total (corners counted once)

  const getTilePosition = (index: number) => {
    if (index < boardSize) {
      // Top row
      return { row: 0, col: index };
    } else if (index < boardSize * 2 - 1) {
      // Right column
      return { row: index - boardSize + 1, col: boardSize - 1 };
    } else if (index < boardSize * 3 - 2) {
      // Bottom row (right to left)
      return { row: boardSize - 1, col: boardSize * 3 - 3 - index };
    } else {
      // Left column (bottom to top)
      return { row: boardSize * 4 - 4 - index, col: 0 };
    }
  };

  const renderTile = (index: number) => {
    const position = getTilePosition(index);
    const property = properties[index];
    const isPlayerHere = playerPosition === index;
    const isSelected = selectedProperty === index;

    return (
      <div
        key={index}
        className="absolute"
        style={{
          top: `${position.row * 12.5}%`,
          left: `${position.col * 12.5}%`,
          width: '12.5%',
          height: '12.5%',
        }}
      >
        <Tile
          property={property}
          index={index}
          isPlayerHere={isPlayerHere}
          isSelected={isSelected}
          onClick={() => onPropertyClick(index)}
        />
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square bg-gray-700 rounded-lg border-4 border-gray-600">
      {/* Corner spaces */}
      <div className="absolute top-0 left-0 w-1/8 h-1/8 bg-blue-600 rounded-tl-lg flex items-center justify-center">
        <div className="text-xs font-bold text-center">START</div>
      </div>
      <div className="absolute top-0 right-0 w-1/8 h-1/8 bg-red-600 rounded-tr-lg flex items-center justify-center">
        <div className="text-xs font-bold text-center">JAIL</div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/8 h-1/8 bg-yellow-600 rounded-br-lg flex items-center justify-center">
        <div className="text-xs font-bold text-center">FREE</div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/8 h-1/8 bg-green-600 rounded-bl-lg flex items-center justify-center">
        <div className="text-xs font-bold text-center">GO</div>
      </div>

      {/* Game tiles */}
      {Array.from({ length: totalTiles }, (_, index) => renderTile(index))}

      {/* Center area */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-800 rounded-lg border-2 border-gray-600 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-blue-400 mb-2">CRYPTO POLY</div>
        <div className="text-sm text-gray-400 text-center">
          NFT Trading Game
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Predict • Trade • Mint • Win
        </div>
      </div>

      {/* Player indicator */}
      {playerPosition !== -1 && (
        <div
          className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white z-10 animate-pulse"
          style={{
            top: `${getTilePosition(playerPosition).row * 12.5 + 4}%`,
            left: `${getTilePosition(playerPosition).col * 12.5 + 4}%`,
          }}
        />
      )}
    </div>
  );
};

export default Board;