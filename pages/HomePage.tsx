import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const HomePage: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const { isConnected, account, connectWallet, disconnectWallet } = useWeb3();

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      alert('Please enter your name.');
      return;
    }

    if (!isConnected) {
      alert('Please connect your wallet first.');
      return;
    }

    navigate('/game', { state: { playerName: playerName.trim(), playerAddress: account } });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-120px)] px-4">
      <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 animate-pulse">
        CRYPTO POLY
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        Connect your wallet, trade prediction markets, and collect NFTs. Will you become a crypto whale or get rugged?
      </p>

      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out font-orbitron"
        >
          CONNECT WALLET
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <form onSubmit={handleStartGame} className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter Your Name"
              className="px-4 py-3 bg-gray-800 border-2 border-purple-500 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:ring-pink-500 w-64 text-center transition-all"
              aria-label="Player Name"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out font-orbitron"
            >
              START NEW GAME
            </button>
          </form>
          <button
            onClick={disconnectWallet}
            className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
