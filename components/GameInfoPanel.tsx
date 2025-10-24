
import React, { useState } from 'react';
import { Player, BoardTile, Market, PlayerAction, MarketTile } from '../types';
import Dice from './Dice';
import MarketCard from './MarketCard';
import NFTCard from './NFTCard';

interface GameInfoPanelProps {
  players: Player[];
  currentPlayer: Player;
  dice: [number, number];
  gameLog: string[];
  board: BoardTile[];
  markets: Market[];
  playerAction: PlayerAction;
  rollDice: () => void;
  endTurn: () => void;
  chooseOutcome: (market: Market, outcome: 'YES' | 'NO') => void;
}

const GameInfoPanel: React.FC<GameInfoPanelProps> = (props) => {
  const { players, currentPlayer, dice, gameLog, board, markets, playerAction, rollDice, endTurn, chooseOutcome } = props;
  const [activeTab, setActiveTab] = useState<'controls' | 'portfolio'>('controls');

  const currentTile = board[currentPlayer.position];
  const isMarketTile = currentTile.type === 'market';
  const currentMarket = isMarketTile ? markets.find(m => m.id === (currentTile as MarketTile).marketId) : null;
  const humanPlayer = players.find(p => !p.isBot)!;

  const renderControls = () => {
    if (currentPlayer.isBot) {
        return <div className="text-purple-400 font-bold animate-pulse">Satoshi is thinking...</div>;
    }
    switch (playerAction) {
        case PlayerAction.CAN_ROLL:
            return <button onClick={rollDice} className="px-6 py-2 bg-green-600 text-white font-bold rounded shadow hover:bg-green-500 transition-colors w-full">Roll Dice</button>;
        case PlayerAction.AWAITING_CHOICE:
            return <p className="text-center text-yellow-400">Choose an outcome for the current market.</p>;
        case PlayerAction.AWAITING_SIGNATURE:
            return <p className="text-center text-cyan-400 animate-pulse">Waiting for signature...</p>;
        case PlayerAction.CAN_END_TURN:
            return <button onClick={endTurn} className="px-6 py-2 bg-red-600 text-white font-bold rounded shadow hover:bg-red-500 transition-colors w-full">End Turn</button>;
        default:
            return null;
    }
  }

  return (
    <div className="w-full lg:w-96 bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg border border-purple-700 space-y-4 flex flex-col max-h-[85vh]">
      <div>
        <h2 className="text-2xl font-bold font-orbitron text-purple-400 mb-2">Players</h2>
        <div className="space-y-2">
          {players.map(p => (
            <div key={p.id} className={`p-2 rounded ${p.id === currentPlayer.id ? 'bg-purple-800 ring-2 ring-purple-400' : 'bg-gray-700'}`}>
              <div className="flex justify-between items-center">
                <span className="font-bold">{p.isBot ? '🤖' : '🚀'} {p.name}</span>
                <span className="font-mono">${p.money}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex border-b border-purple-800">
        <button onClick={() => setActiveTab('controls')} className={`flex-1 py-2 font-orbitron ${activeTab === 'controls' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400'}`}>Controls</button>
        <button onClick={() => setActiveTab('portfolio')} className={`flex-1 py-2 font-orbitron ${activeTab === 'portfolio' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400'}`}>My Portfolio ({humanPlayer.nfts.length})</button>
      </div>

      {activeTab === 'controls' && (
        <div className="flex-grow flex flex-col items-center justify-between space-y-4">
            {currentMarket && <MarketCard market={currentMarket} onChoose={chooseOutcome} disabled={playerAction !== PlayerAction.AWAITING_CHOICE} />}
            <div className="flex flex-col items-center space-y-4 w-full">
                <Dice values={dice} />
                <div className="h-12 flex items-center justify-center w-full">
                    {renderControls()}
                </div>
            </div>
        </div>
      )}
       {activeTab === 'portfolio' && (
         <div className="flex-grow space-y-2 overflow-y-auto pr-2">
            {humanPlayer.nfts.length === 0 ? (
                <p className="text-center text-gray-400 mt-8">You haven't collected any NFTs yet. Land on an unowned market to mint one!</p>
            ) : (
                humanPlayer.nfts.map(nft => <NFTCard key={nft.id} nft={nft} />)
            )}
         </div>
       )}

      <div>
        <h3 className="text-xl font-bold font-orbitron text-purple-400 mb-2">Game Log</h3>
        <div className="h-32 bg-gray-800 rounded p-2 overflow-y-auto text-xs flex flex-col-reverse">
          {gameLog.map((log, i) => <p key={i} className="font-mono leading-tight">{log}</p>)}
        </div>
      </div>
    </div>
  );
};

export default GameInfoPanel;
