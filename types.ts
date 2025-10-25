export interface Property {
  id: number;
  name: string;
  type: 'property' | 'chance' | 'community' | 'tax' | 'utility' | 'special';
  price?: number;
  rent?: number;
  owner?: 'player' | 'other';
  color?: string;
  description?: string;
}

export interface GameState {
  playerBalance: number;
  playerPosition: number;
  properties: Property[];
  predictionsMade: number;
  accuracy: number;
  nftsOwned: number;
  propertiesOwned: number;
  gamePhase: 'waiting' | 'rolling' | 'moving' | 'action';
  currentPlayer: string;
}

export interface Prediction {
  id: string;
  market: string;
  prediction: string;
  timestamp: number;
  result?: boolean;
  reward?: number;
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  attributes: {
    accuracy: number;
    predictions: number;
    properties: number;
    achievements: string[];
  };
  mintedAt: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap?: number;
  predictions: {
    bullish: number;
    bearish: number;
  };
}

export interface PlayerStats {
  walletAddress: string;
  balance: number;
  properties: Property[];
  nfts: NFT[];
  predictions: Prediction[];
  totalPredictions: number;
  accuracy: number;
  rank: number;
  achievements: string[];
}