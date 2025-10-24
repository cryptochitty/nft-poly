
import React from 'react';
import { BoardTile, Market, MarketTile, Player } from '../types';

interface TileProps {
  tile: BoardTile;
  players: Player[];
  markets: Market[];
}

const Tile: React.FC<TileProps> = ({ tile, players, markets }) => {

  const renderContent = () => {
    switch (tile.type) {
      case 'market': {
        const market = markets.find(m => m.id === (tile as MarketTile).marketId);
        const owner = market?.owner ? players.find(p => p.id === market.owner.playerId) : null;
        return (
          <div className="text-center p-1 flex-grow flex flex-col justify-around items-center text-black relative">
            {owner && <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border border-white ${owner.tokenColor}`}></div>}
            <p className="text-[9px] leading-tight font-bold uppercase">{market?.question.split(' ')[0]}...</p>
            <img src={market?.imageUrl} alt="Market" className="w-8 h-8 object-contain my-1" />
            <p className="text-[8px]">Market</p>
          </div>
        );
      }
      case 'chance':
        return <div className="p-1 flex-grow flex flex-col justify-center items-center text-blue-500"><p className="text-4xl font-serif">?</p><p className="text-[9px] font-bold">Chance</p></div>;
      case 'community-chest':
        return <div className="p-1 flex-grow flex flex-col justify-center items-center text-orange-400"><p className="text-3xl">🎁</p><p className="text-[9px] font-bold">Community Chest</p></div>;
      case 'tax':
        return (
          <div className="text-center p-1 flex-grow flex flex-col justify-around items-center text-black">
             <p className="text-[9px] leading-tight font-bold uppercase">{tile.name}</p>
             <p className="text-3xl">💸</p>
             <p className="text-[8px]">Pay ${tile.amount}</p>
          </div>
        );
      case 'go':
        return <div className="w-full h-full flex flex-col justify-center items-center bg-red-600 text-white p-1 text-center"><p className="text-xl font-black">GO</p><p className="text-[8px] leading-tight">COLLECT $200</p></div>;
      case 'jail':
        return <div className="w-full h-full flex flex-col justify-center items-center bg-blue-400 text-white p-1 text-center"><p className="text-lg font-bold">JAIL</p></div>;
      case 'free-parking':
        return <div className="w-full h-full flex flex-col justify-center items-center bg-green-500 text-white p-1 text-center"><p className="text-lg font-bold">AIRDROP</p></div>;
      case 'go-to-jail':
        return <div className="w-full h-full flex flex-col justify-center items-center bg-orange-500 text-white p-1 text-center"><p className="text-lg font-bold">GO TO RUGPULL</p></div>;
    }
  };

  return (
    <div className="w-full h-full bg-stone-200 border border-gray-400 flex flex-col text-xs overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default Tile;
