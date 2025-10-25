import { useState, useEffect } from 'react';
import { polymarketAPI, PolymarketMarket } from '../api/polymarket';

export const usePolymarket = () => {
  const [markets, setMarkets] = useState<PolymarketMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await polymarketAPI.getCryptoMarkets();
      setMarkets(response.markets);
    } catch (err) {
      setError('Failed to fetch Polymarket data');
      console.error('Error fetching markets:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshMarkets = () => {
    fetchMarkets();
  };

  const getMarketById = async (id: string): Promise<PolymarketMarket | null> => {
    try {
      return await polymarketAPI.getMarketById(id);
    } catch (err) {
      console.error('Error fetching market:', err);
      return null;
    }
  };

  const getTopMarkets = (limit: number = 5): PolymarketMarket[] => {
    return markets
      .filter(market => market.active && !market.closed)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, limit);
  };

  const getTrendingMarkets = (limit: number = 5): PolymarketMarket[] => {
    return markets
      .filter(market => market.active && !market.closed)
      .sort((a, b) => b.liquidity - a.liquidity)
      .slice(0, limit);
  };

  return {
    markets,
    loading,
    error,
    refreshMarkets,
    getMarketById,
    getTopMarkets,
    getTrendingMarkets,
    polymarketAPI
  };
};
