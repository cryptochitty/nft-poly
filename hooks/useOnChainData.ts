import { useState, useEffect } from 'react';
import { onChainService, OnChainGameData, OnChainPrediction, OnChainNFT } from '../api/onchain';

export const useOnChainData = (address: string | null) => {
  const [gameData, setGameData] = useState<OnChainGameData | null>(null);
  const [predictions, setPredictions] = useState<OnChainPrediction[]>([]);
  const [nfts, setNfts] = useState<OnChainNFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      fetchOnChainData();
    } else {
      setGameData(null);
      setPredictions([]);
      setNfts([]);
    }
  }, [address]);

  const fetchOnChainData = async () => {
    if (!address) return;

    try {
      setLoading(true);
      setError(null);

      const [playerData, playerPredictions, playerNFTs] = await Promise.all([
        onChainService.getPlayerData(address),
        onChainService.getPlayerPredictions(address),
        onChainService.getPlayerNFTs(address)
      ]);

      setGameData(playerData);
      setPredictions(playerPredictions);
      setNfts(playerNFTs);
    } catch (err) {
      setError('Failed to fetch on-chain data');
      console.error('Error fetching on-chain data:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitPrediction = async (
    marketId: string,
    prediction: string,
    signature: string
  ) => {
    if (!address) return { success: false };

    try {
      const result = await onChainService.submitPrediction(
        address,
        marketId,
        prediction,
        signature
      );

      if (result.success) {
        // Refresh data after successful submission
        await fetchOnChainData();
      }

      return result;
    } catch (err) {
      console.error('Error submitting prediction:', err);
      return { success: false };
    }
  };

  const mintFreeNFT = async (predictionId: string, rarity: string) => {
    if (!address) return { success: false };

    try {
      const result = await onChainService.mintFreeNFT(
        address,
        predictionId,
        rarity
      );

      if (result.success) {
        // Refresh data after successful minting
        await fetchOnChainData();
      }

      return result;
    } catch (err) {
      console.error('Error minting NFT:', err);
      return { success: false };
    }
  };

  const getMarketData = async (marketId: string) => {
    try {
      return await onChainService.getMarketData(marketId);
    } catch (err) {
      console.error('Error fetching market data:', err);
      return null;
    }
  };

  const refreshData = () => {
    fetchOnChainData();
  };

  return {
    gameData,
    predictions,
    nfts,
    loading,
    error,
    submitPrediction,
    mintFreeNFT,
    getMarketData,
    refreshData
  };
};
