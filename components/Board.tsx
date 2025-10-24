
import React from 'react';
import { Player, BoardTile, Market } from '../types';
import Tile from './Tile';
import PlayerToken from './PlayerToken';

interface BoardProps {
  players: Player[];
  board: BoardTile[];
  markets: Market[];
}

const getTilePosition = (index: number): { gridRow: string; gridColumn: string } => {
  if (index >= 0 && index <= 10) return { gridRow: '11', gridColumn: `${11 - index}` };
  if (index >= 11 && index <= 20) return { gridRow: `${11 - (index - 10)}`, gridColumn: '1' };
  if (index >= 21 && index <= 30) return { gridRow: '1', gridColumn: `${1 + (index - 20)}` };
  if (index >= 31 && index <= 39) return { gridRow: `${1 + (index - 30)}`, gridColumn: '11' };
  return { gridRow: '11', gridColumn: '11' }; // GO
};

const Board: React.FC<BoardProps> = ({ players, board, markets }) => {
  return (
    <div className="aspect-square w-full max-w-[800px] mx-auto bg-gray-800 border-4 border-purple-500 rounded-lg p-2">
      <div className="relative w-full h-full grid grid-cols-11 grid-rows-11 gap-0.5">
        {board.map((tile, index) => (
          <div key={index} style={getTilePosition(index)}>
            <Tile tile={tile} players={players} markets={markets} />
          </div>
        ))}
        <div className="col-start-2 col-span-9 row-start-2 row-span-9 bg-gray-900 flex items-center justify-center border-2 border-purple-800 rounded-md">
            <h1 className="text-5xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center leading-tight">
                CRYPTO<br/>POLY
            </h1>
        </div>
        {players.map((player) => (
          <PlayerToken key={player.id} player={player} positionStyles={getTilePosition(player.position)} />
        ))}
      </div>
    </div>
  );
};

export default Board;
