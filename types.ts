
export interface NFT {
  id: string;
  marketId: string;
  marketQuestion: string;
  outcome: 'YES' | 'NO';
  purchasePrice: number;
  imageUrl: string;
}

export interface Player {
  id: number;
  name: string;
  money: number;
  position: number;
  nfts: NFT[];
  inJail: boolean;
  jailTurns: number;
  tokenColor: string;
  isBot: boolean;
  walletAddress?: string;
}

export type BoardTile =
  | { type: 'go'; name: string }
  | { type: 'market'; name: string; marketId: string }
  | { type: 'community-chest'; name: string }
  | { type: 'tax'; name: string; amount: number }
  | { type: 'chance'; name: string }
  | { type: 'jail'; name: string }
  | { type: 'free-parking'; name: string }
  | { type: 'go-to-jail'; name: string };

export type MarketTile = Extract<BoardTile, { type: 'market' }>;

export enum PlayerAction {
  CAN_ROLL = 'CAN_ROLL',
  AWAITING_CHOICE = 'AWAITING_CHOICE',
  AWAITING_SIGNATURE = 'AWAITING_SIGNATURE',
  CAN_END_TURN = 'CAN_END_TURN',
  BOT_TURN = 'BOT_TURN',
}

export interface Market {
  id: string;
  question: string;
  imageUrl: string;
  outcomePrices: { yes: number; no: number };
  owner?: { playerId: number; outcome: 'YES' | 'NO' };
}
