
import { useState, useCallback, useEffect } from 'react';
import { Player, BoardTile, PlayerAction, Market, NFT } from '../types';
import { createInitialPlayers, BOARD_TILES as initialBoard } from '../constants';
import { ALL_MARKETS } from '../marketData';

export const useGameLogic = (playerName: string, playerAddress: string) => {
  const [markets, setMarkets] = useState<Market[]>(ALL_MARKETS);
  const [players, setPlayers] = useState<Player[]>(() => createInitialPlayers(playerName, playerAddress));
  const [board] = useState<BoardTile[]>(initialBoard);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [gameLog, setGameLog] = useState<string[]>(() => [`Game started! ${playerName}'s turn.`]);
  const [playerAction, setPlayerAction] = useState<PlayerAction>(PlayerAction.CAN_ROLL);
  const [pendingChoice, setPendingChoice] = useState<{ market: Market; outcome: 'YES' | 'NO'; price: number } | null>(null);

  const currentPlayer = players[currentPlayerIndex];

  const addLog = useCallback((message: string) => {
    setGameLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 30));
  }, []);

  const endTurn = useCallback(() => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    addLog(`Turn ended. It's now ${players[nextPlayerIndex].name}'s turn.`);
    setCurrentPlayerIndex(nextPlayerIndex);
    setPlayerAction(PlayerAction.CAN_ROLL);
  }, [currentPlayerIndex, players, addLog]);

  const mintNFT = useCallback((player: Player, market: Market, outcome: 'YES' | 'NO', price: number) => {
    const newNFT: NFT = {
      id: `${market.id}-${outcome}`,
      marketId: market.id,
      marketQuestion: market.question,
      outcome,
      purchasePrice: price,
      imageUrl: market.imageUrl,
    };

    setPlayers(currentPlayers =>
      currentPlayers.map(p =>
        p.id === player.id
          ? { ...p, money: p.money - price, nfts: [...p.nfts, newNFT] }
          : p
      )
    );

    setMarkets(currentMarkets =>
      currentMarkets.map(m =>
        m.id === market.id ? { ...m, owner: { playerId: player.id, outcome } } : m
      )
    );

    addLog(`✅ ${player.name} minted an NFT for "${market.question} - ${outcome}" for $${price}.`);
  }, [addLog]);

  const handleTileLanding = useCallback((player: Player, tileIndex: number) => {
    const tile = board[tileIndex];
    const landedOnTileName = tile.type === 'market' ? `Market: ${markets.find(m => m.id === tile.marketId)?.question}` : tile.name;
    addLog(`${player.name} landed on ${landedOnTileName}.`);

    switch (tile.type) {
      case 'market': {
        const market = markets.find(m => m.id === tile.marketId);
        if (market) {
          if (market.owner === undefined) {
             setPlayerAction(PlayerAction.AWAITING_CHOICE);
          } else {
             addLog("Market position already taken.");
             setPlayerAction(PlayerAction.CAN_END_TURN);
          }
        }
        break;
      }
      case 'tax':
        addLog(`${player.name} must pay $${tile.amount} in taxes.`);
        setPlayers(ps => ps.map(p => p.id === player.id ? { ...p, money: p.money - tile.amount } : p));
        setPlayerAction(PlayerAction.CAN_END_TURN);
        break;
      case 'go-to-jail':
        addLog(`${player.name} is going to Rugpull!`);
        setPlayers(ps => ps.map(p => p.id === player.id ? { ...p, position: 10, inJail: true, jailTurns: 0 } : p));
        endTurn();
        break;
      default:
        setPlayerAction(PlayerAction.CAN_END_TURN);
        break;
    }
  }, [board, addLog, markets, endTurn]);

  const movePlayer = useCallback((player: Player, steps: number) => {
    const oldPosition = player.position;
    const newPosition = (oldPosition + steps) % board.length;

    let moneyCollected = 0;
    if (newPosition < oldPosition) { // Passed GO
      moneyCollected = 200;
      addLog(`${player.name} passed GO and collected $200.`);
    }

    const updatedPlayer = { ...player, position: newPosition, money: player.money + moneyCollected };
    
    setPlayers(currentPlayers => currentPlayers.map(p => p.id === player.id ? updatedPlayer : p));

    setTimeout(() => handleTileLanding(updatedPlayer, newPosition), 100);
  }, [board.length, addLog, handleTileLanding]);


  const rollDice = useCallback(() => {
    if (playerAction !== PlayerAction.CAN_ROLL || currentPlayer.isBot) return;
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const total = d1 + d2;
    setDice([d1, d2]);
    addLog(`${currentPlayer.name} rolled a ${d1} + ${d2} = ${total}.`);
    movePlayer(currentPlayer, total);
  }, [playerAction, currentPlayer, movePlayer, addLog]);

  const chooseOutcome = useCallback((market: Market, outcome: 'YES' | 'NO') => {
    if (playerAction !== PlayerAction.AWAITING_CHOICE) return;
    const price = outcome === 'YES' ? market.outcomePrices.yes : market.outcomePrices.no;

    if(currentPlayer.money < price) {
        addLog(`Not enough funds to invest. Needs $${price}.`);
        setPlayerAction(PlayerAction.CAN_END_TURN);
        return;
    }

    setPendingChoice({ market, outcome, price });
    setPlayerAction(PlayerAction.AWAITING_SIGNATURE);
    addLog(`Awaiting signature to mint NFT for "${market.question} - ${outcome}".`);
  }, [playerAction, addLog, currentPlayer.money]);

  const confirmPurchase = useCallback(() => {
      if (playerAction !== PlayerAction.AWAITING_SIGNATURE || !pendingChoice) return;
      mintNFT(currentPlayer, pendingChoice.market, pendingChoice.outcome, pendingChoice.price);
      setPendingChoice(null);
      setPlayerAction(PlayerAction.CAN_END_TURN);
  }, [playerAction, pendingChoice, currentPlayer, mintNFT]);
  
  const cancelPurchase = useCallback(() => {
    setPendingChoice(null);
    setPlayerAction(PlayerAction.CAN_END_TURN);
    addLog("Purchase cancelled.");
  }, [addLog]);


  useEffect(() => {
    if (currentPlayer.isBot && playerAction === PlayerAction.CAN_ROLL) {
      setPlayerAction(PlayerAction.BOT_TURN);
      const botTurn = async () => {
        await new Promise(r => setTimeout(r, 1000));
        addLog(`It's ${currentPlayer.name}'s (🤖) turn.`);
        
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        const total = d1 + d2;
        setDice([d1, d2]);
        addLog(`${currentPlayer.name} rolled a ${total}.`);

        const oldPos = currentPlayer.position;
        const newPos = (oldPos + total) % board.length;
        let moneyCollected = 0;
        if (newPos < oldPos) {
          moneyCollected = 200;
          addLog(`${currentPlayer.name} passed GO and collected $200.`);
        }
        
        let botPlayer = { ...currentPlayer, position: newPos, money: currentPlayer.money + moneyCollected };
        setPlayers(ps => ps.map(p => p.id === botPlayer.id ? botPlayer : p));
        
        await new Promise(r => setTimeout(r, 1000));
        
        const tile = board[newPos];
        const landedOnTileName = tile.type === 'market' ? `Market: ${markets.find(m => m.id === tile.marketId)?.question}` : tile.name;
        addLog(`${botPlayer.name} landed on ${landedOnTileName}.`);

        if (tile.type === 'market') {
          const market = markets.find(m => m.id === tile.marketId)!;
          if (!market.owner && botPlayer.money > 500) { 
            const outcome: 'YES' | 'NO' = Math.random() > 0.5 ? 'YES' : 'NO';
            const price = outcome === 'YES' ? market.outcomePrices.yes : market.outcomePrices.no;
            if(botPlayer.money > price) {
                await new Promise(r => setTimeout(r, 1000));
                mintNFT(botPlayer, market, outcome, price);
                botPlayer.money -= price; 
            }
          }
        } else if (tile.type === 'tax') {
            await new Promise(r => setTimeout(r, 1000));
            addLog(`${botPlayer.name} paid $${tile.amount} in taxes.`);
            botPlayer.money -= tile.amount;
            setPlayers(ps => ps.map(p => p.id === botPlayer.id ? { ...p, money: botPlayer.money } : p));
        }
        
        await new Promise(r => setTimeout(r, 1500));
        endTurn();
      };
      botTurn();
    }
  }, [currentPlayer, playerAction, board, endTurn, addLog, markets, mintNFT]);
  
  return { players, currentPlayer, dice, gameLog, board, markets, playerAction, rollDice, endTurn, chooseOutcome, confirmPurchase, cancelPurchase };
};
