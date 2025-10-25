import React from 'react';
import { Web3Provider, useWeb3 } from './context/Web3Context';

const WalletButton: React.FC = () => {
  const { connectWallet, disconnectWallet, isConnected, account } = useWeb3();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-4">
      <h1 className="text-3xl font-bold font-orbitron">Crypto Poly</h1>
      <p className="text-lg text-gray-300">NFT Trading Game</p>

      {isConnected ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg">Connected account:</p>
          <p className="font-mono text-sm break-all bg-gray-800 px-4 py-2 rounded">{account}</p>
          <button
            onClick={disconnectWallet}
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-300">Connect your wallet to start playing</p>
          <button
            onClick={connectWallet}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Web3Provider>
      <WalletButton />
    </Web3Provider>
  );
};

export default App;
