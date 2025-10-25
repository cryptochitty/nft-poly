import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Board from '../components/Board';
import GameInfoPanel from '../components/GameInfoPanel';
import Modal from '../components/Modal';
import { useGameLogic } from '../hooks/useGameLogic';
import { useWeb3 } from '../context/Web3Context';
import { PlayerAction } from '../types';

const GamePage: React.FC = () => {
  const location = useLocation();
  const { account, isConnected, signMessage } = useWeb3();

  // Use state from navigation or fallback for testing
  const playerName = location.state?.playerName || 'TestUser';
  const playerAddress = location.state?.playerAddress || (isConnected ? account : '0x0');

  // Redirect if wallet mismatch
  if (isConnected && account !== playerAddress) {
    return <Navigate to="/" replace />;
  }

  const gameLogic = useGameLogic(playerName, playerAddress);

  const handleSign = async () => {
    if (!isConnected) {
      alert('Wallet not connected. Signing skipped in test mode.');
      gameLogic.confirmPurchase();
      return;
    }

    const signature = await signMessage('Confirm your investment to mint this outcome as an NFT.');
    if (signature) {
      gameLogic.confirmPurchase();
    } else {
      gameLogic.cancelPurchase();
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto px-4">
        <div className="flex-grow">
          <Board players={gameLogic.players} board={gameLogic.board} markets={gameLogic.markets} />
        </div>
        <GameInfoPanel {...gameLogic} />
      </div>

      <Modal
        isOpen={gameLogic.playerAction === PlayerAction.AWAITING_SIGNATURE}
        title="Confirm Your Action"
        onClose={gameLogic.cancelPurchase}
      >
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            {isConnected
              ? 'Your wallet will prompt you to sign a message to confirm your investment. This is a gas-free transaction.'
              : 'Wallet not connected. Signing skipped in test mode.'}
          </p>
          <button
            onClick={handleSign}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            Sign to Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default GamePage;
