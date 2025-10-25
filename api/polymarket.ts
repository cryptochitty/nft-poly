export interface PolymarketMarket {
  id: string;
  question: string;
  description: string;
  end_date_iso: string;
  market_type: string;
  outcome_tokens: {
    outcome: string;
    price: number;
    winner?: boolean;
  }[];
  volume: number;
  liquidity: number;
  end_date: number;
  image: string;
  active: boolean;
  archived: boolean;
  closed: boolean;
  winner?: string;
}

export interface PolymarketResponse {
  markets: PolymarketMarket[];
  total: number;
}

class PolymarketAPI {
  private baseURL = 'https://gamma-api.polymarket.com';
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 60000; // 1 minute

  private async fetchWithCache<T>(endpoint: string): Promise<T> {
    const cacheKey = endpoint;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error('Polymarket API error:', error);
      // Return mock data if API fails
      return this.getMockData(endpoint) as T;
    }
  }

  private getMockData(endpoint: string) {
    if (endpoint.includes('markets')) {
      return {
        markets: [
          {
            id: 'btc-50k-2024',
            question: 'Will Bitcoin reach $50,000 by end of 2024?',
            description: 'Prediction market for Bitcoin price target',
            end_date_iso: '2024-12-31T23:59:59Z',
            market_type: 'binary',
            outcome_tokens: [
              { outcome: 'Yes', price: 0.65 },
              { outcome: 'No', price: 0.35 }
            ],
            volume: 1250000,
            liquidity: 250000,
            end_date: 1735689599,
            image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
            active: true,
            archived: false,
            closed: false
          },
          {
            id: 'eth-3k-2024',
            question: 'Will Ethereum reach $3,000 by end of 2024?',
            description: 'Prediction market for Ethereum price target',
            end_date_iso: '2024-12-31T23:59:59Z',
            market_type: 'binary',
            outcome_tokens: [
              { outcome: 'Yes', price: 0.72 },
              { outcome: 'No', price: 0.28 }
            ],
            volume: 890000,
            liquidity: 180000,
            end_date: 1735689599,
            image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
            active: true,
            archived: false,
            closed: false
          },
          {
            id: 'defi-tvl-50b',
            question: 'Will DeFi TVL reach $50B by end of 2024?',
            description: 'Total Value Locked in DeFi protocols',
            end_date_iso: '2024-12-31T23:59:59Z',
            market_type: 'binary',
            outcome_tokens: [
              { outcome: 'Yes', price: 0.58 },
              { outcome: 'No', price: 0.42 }
            ],
            volume: 450000,
            liquidity: 90000,
            end_date: 1735689599,
            image: 'https://defipulse.com/img/defi-logo.png',
            active: true,
            archived: false,
            closed: false
          },
          {
            id: 'crypto-market-cap',
            question: 'Will crypto market cap reach $3T by end of 2024?',
            description: 'Total cryptocurrency market capitalization',
            end_date_iso: '2024-12-31T23:59:59Z',
            market_type: 'binary',
            outcome_tokens: [
              { outcome: 'Yes', price: 0.48 },
              { outcome: 'No', price: 0.52 }
            ],
            volume: 2100000,
            liquidity: 420000,
            end_date: 1735689599,
            image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
            active: true,
            archived: false,
            closed: false
          },
          {
            id: 'nft-volume-2024',
            question: 'Will NFT trading volume exceed $10B in 2024?',
            description: 'Total NFT trading volume across all platforms',
            end_date_iso: '2024-12-31T23:59:59Z',
            market_type: 'binary',
            outcome_tokens: [
              { outcome: 'Yes', price: 0.38 },
              { outcome: 'No', price: 0.62 }
            ],
            volume: 320000,
            liquidity: 64000,
            end_date: 1735689599,
            image: 'https://opensea.io/static/images/logos/opensea-logo.png',
            active: true,
            archived: false,
            closed: false
          }
        ],
        total: 5
      };
    }
    return null;
  }

  async getActiveMarkets(limit: number = 10): Promise<PolymarketResponse> {
    return this.fetchWithCache<PolymarketResponse>(`/markets?active=true&limit=${limit}&sort=volume`);
  }

  async getMarketById(id: string): Promise<PolymarketMarket> {
    return this.fetchWithCache<PolymarketMarket>(`/markets/${id}`);
  }

  async getCryptoMarkets(): Promise<PolymarketResponse> {
    return this.fetchWithCache<PolymarketResponse>('/markets?category=crypto&active=true&limit=20');
  }

  async getTrendingMarkets(): Promise<PolymarketResponse> {
    return this.fetchWithCache<PolymarketResponse>('/markets?active=true&sort=volume&limit=10');
  }

  // Get market price for a specific outcome
  getMarketPrice(market: PolymarketMarket, outcome: string): number {
    const token = market.outcome_tokens.find(t => t.outcome === outcome);
    return token ? token.price : 0;
  }

  // Calculate implied probability
  getImpliedProbability(market: PolymarketMarket, outcome: string): number {
    const price = this.getMarketPrice(market, outcome);
    return Math.round(price * 100);
  }

  // Get market status
  getMarketStatus(market: PolymarketMarket): string {
    if (market.closed) return 'Closed';
    if (market.archived) return 'Archived';
    if (market.active) return 'Active';
    return 'Inactive';
  }

  // Format market data for display
  formatMarketForDisplay(market: PolymarketMarket) {
    const yesPrice = this.getMarketPrice(market, 'Yes');
    const noPrice = this.getMarketPrice(market, 'No');
    const yesProb = this.getImpliedProbability(market, 'Yes');
    const noProb = this.getImpliedProbability(market, 'No');

    return {
      ...market,
      yesPrice,
      noPrice,
      yesProbability: yesProb,
      noProbability: noProb,
      status: this.getMarketStatus(market),
      volumeFormatted: this.formatVolume(market.volume),
      liquidityFormatted: this.formatVolume(market.liquidity)
    };
  }

  private formatVolume(volume: number): string {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  }
}

export const polymarketAPI = new PolymarketAPI();