
import React from 'react';
import { Player } from '../types';

interface PlayerTokenProps {
  player: Player;
  positionStyles: { gridRow: string; gridColumn: string };
}

const PlayerToken: React.FC<PlayerTokenProps> = ({ player, positionStyles }) => {
  return (
    <div
      className="absolute w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white shadow-lg z-10 transition-all duration-700 ease-in-out flex items-center justify-center"
      style={{
        ...positionStyles,
        transform: `translate(-50%, -50%)`,
        left: '50%',
        top: '50%',
      }}
    >
      <div className={`w-full h-full rounded-full ${player.tokenColor} flex items-center justify-center`}>
        <span className="text-xs">{player.isBot ? '🤖' : '🚀'}</span>
      </div>
    </div>
  );
};

export default PlayerToken;
