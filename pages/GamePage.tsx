import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Board from '../components/Board';
import GameInfoPanel from '../components/GameInfoPanel';
import Modal from '../components/Modal';
import { useGameLogic } from '../hooks/useGameLogic';
import { useWeb3 } from '../context/Web3Context';
import { PlayerAction } from '../types';
import { useSignMessage } from 'wagmi';

const GamePage: React.FC = () => {
  const location = useLocation();
  const { account, isConnected } = useWeb3();
  const { signMessageAsync } = useSignMessage();

  // Get name & address passed from HomePage
  const playerName = location.state?.playerName || 'TestUser';
  const playerAddress = location.state?.playerAddress || (isConnected ? account : '0x0');

  // Prevent mismatch between connected wallet and playerAddress
  if (isConnected && account && account.toLowerCase() !== playerAddress.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  const gameLogic = useGameLogic(playerName, playerAddress);

  const handleSign = async () => {
    try {
      if (!isConnected) {
        alert('Wallet not connected. Proceeding in test mode.');
        gameLogic.confirmPurchase();
        return;
      }

      const message = "Confirm to mint your free NFT and verify your Crypto Poly investment.";
      const signature = await signMessageAsync({ message });

      if (signature) {
        console.log("✅ Signature received:", signature);
        gameLogic.confirmPurchase();
      } else {
        console.warn("❌ No signature received");
        gameLogic.cancelPurchase();
      }
    } catch (err) {
      console.error("Signature error:", err);
      gameLogic.cancelPurchase();
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto mt-6">
        <div className="flex-grow">
          <Board
            players={gameLogic.players}
            board={gameLogic.board}
            markets={gameLogic.markets}
          />
        </div>
        <GameInfoPanel {...gameLogic} />
      </div>

      <Modal
        isOpen={gameLogic.playerAction === PlayerAction.AWAITING_SIGNATURE}
        title="Confirm Your Investment"
        onClose={gameLogic.cancelPurchase}
      >
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            {isConnected
              ? 'Your wallet will prompt you to sign this message to confirm your NFT minting. This is gas-free.'
              : 'Wallet not connected. Proceeding in test mode.'}
          </p>

          <button
            onClick={handleSign}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            Sign & Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default GamePage;
