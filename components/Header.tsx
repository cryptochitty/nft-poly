import React from 'react';
import { useWeb3 } from '../context/Web3Context';

interface HeaderProps {
  currentPage: 'home' | 'game' | 'about';
  onPageChange: (page: 'home' | 'game' | 'about') => void;
  isConnected: boolean;
  account: string | null;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, isConnected, account }) => {
  const { connectWallet, disconnectWallet } = useWeb3();

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold font-orbitron text-blue-400">Crypto Poly</h1>
            <span className="text-sm text-gray-400">NFT Trading Game</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => onPageChange('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('game')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'game'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Game
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              About
            </button>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <div className="text-green-400">● Connected</div>
                  <div className="text-xs text-gray-400 font-mono">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-700">
          <div className="flex space-x-4">
            <button
              onClick={() => onPageChange('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('game')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'game'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Game
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              About
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;