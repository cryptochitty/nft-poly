
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const Header: React.FC = () => {
  const { account, connectWallet } = useWeb3();

  const activeLinkClass = "text-purple-400 border-b-2 border-purple-400";
  const inactiveLinkClass = "hover:text-purple-400 transition-colors";

  const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 mb-4">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          CRYPTO POLY
        </NavLink>
        <div className="flex items-center space-x-6 text-lg">
          <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            Home
          </NavLink>
          <NavLink to="/game" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            Game
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            About
          </NavLink>
          {account ? (
            <div className="px-4 py-2 bg-gray-700 text-green-400 rounded-md font-mono text-sm">
              {truncateAddress(account)}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-500 transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
