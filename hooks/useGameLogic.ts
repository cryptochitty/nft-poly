import { useState, useEffect } from 'react';
import { Property, GameState, Prediction, NFT } from '../types';
import { onChainService } from '../api/onchain';

const initialProperties: Property[] = [
  // Top row
  { id: 0, name: 'Bitcoin', type: 'property', price: 50000, rent: 5000, color: 'brown' },
  { id: 1, name: 'Chance', type: 'chance' },
  { id: 2, name: 'Ethereum', type: 'property', price: 3000, rent: 3000, color: 'lightblue' },
  { id: 3, name: 'Tax', type: 'tax' },
  { id: 4, name: 'Binance', type: 'property', price: 400, rent: 400, color: 'lightblue' },
  { id: 5, name: 'Cardano', type: 'property', price: 1, rent: 100, color: 'lightblue' },
  { id: 6, name: 'Chance', type: 'chance' },
  { id: 7, name: 'Solana', type: 'property', price: 100, rent: 1000, color: 'lightblue' },
  
  // Right column
  { id: 8, name: 'Polygon', type: 'property', price: 1, rent: 150, color: 'pink' },
  { id: 9, name: 'Avalanche', type: 'property', price: 20, rent: 200, color: 'pink' },
  { id: 10, name: 'Community', type: 'community' },
  { id: 11, name: 'Chainlink', type: 'property', price: 15, rent: 150, color: 'pink' },
  { id: 12, name: 'Uniswap', type: 'property', price: 8, rent: 80, color: 'pink' },
  { id: 13, name: 'Aave', type: 'property', price: 100, rent: 1000, color: 'pink' },
  { id: 14, name: 'Chance', type: 'chance' },
  { id: 15, name: 'Compound', type: 'property', price: 50, rent: 500, color: 'pink' },
  
  // Bottom row (right to left)
  { id: 16, name: 'Arbitrum', type: 'property', price: 1, rent: 200, color: 'orange' },
  { id: 17, name: 'Optimism', type: 'property', price: 2, rent: 200, color: 'orange' },
  { id: 18, name: 'Community', type: 'community' },
  { id: 19, name: 'Base', type: 'property', price: 1, rent: 200, color: 'orange' },
  { id: 20, name: 'Tax', type: 'tax' },
  { id: 21, name: 'Polygon', type: 'property', price: 1, rent: 200, color: 'orange' },
  { id: 22, name: 'Chance', type: 'chance' },
  { id: 23, name: 'Fantom', type: 'property', price: 1, rent: 200, color: 'orange' },
  
  // Left column (bottom to top)
  { id: 24, name: 'Cosmos', type: 'property', price: 10, rent: 100, color: 'red' },
  { id: 25, name: 'Polkadot', type: 'property', price: 5, rent: 50, color: 'red' },
  { id: 26, name: 'Community', type: 'community' },
  { id: 27, name: 'Near', type: 'property', price: 2, rent: 20, color: 'red' },
];

export const useGameLogic = (signPrediction?: (marketId: string, prediction: string) => Promise<string | null>) => {
  const [gameState, setGameState] = useState<GameState>({
    playerBalance: 1500,
    playerPosition: 0,
    properties: initialProperties,
    predictionsMade: 0,
    accuracy: 0,
    nftsOwned: 0,
    propertiesOwned: 0,
    gamePhase: 'waiting',
    currentPlayer: 'player',
  });

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [signedPredictions, setSignedPredictions] = useState<{ [key: string]: string }>({});

  // Update properties owned count
  useEffect(() => {
    const ownedCount = gameState.properties.filter(p => p.owner === 'player').length;
    setGameState(prev => ({ ...prev, propertiesOwned: ownedCount }));
  }, [gameState.properties]);

  const rollDice = () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    
    setGameState(prev => ({
      ...prev,
      gamePhase: 'rolling',
    }));

    // Simulate dice roll animation
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        playerPosition: (prev.playerPosition + total) % 28,
        gamePhase: 'moving',
      }));

      // Check if player landed on a property
      setTimeout(() => {
        const currentProperty = gameState.properties[gameState.playerPosition];
        if (currentProperty && currentProperty.owner && currentProperty.owner !== 'player') {
          // Pay rent
          setGameState(prev => ({
            ...prev,
            playerBalance: prev.playerBalance - (currentProperty.rent || 0),
            gamePhase: 'action',
          }));
        } else {
          setGameState(prev => ({ ...prev, gamePhase: 'action' }));
        }
      }, 1000);
    }, 2000);
  };

  const buyProperty = (propertyIndex: number) => {
    const property = gameState.properties[propertyIndex];
    if (property && property.price && gameState.playerBalance >= property.price && !property.owner) {
      setGameState(prev => ({
        ...prev,
        properties: prev.properties.map((p, index) =>
          index === propertyIndex ? { ...p, owner: 'player' as const } : p
        ),
        playerBalance: prev.playerBalance - property.price!,
      }));
    }
  };

  const sellProperty = (propertyIndex: number) => {
    const property = gameState.properties[propertyIndex];
    if (property && property.owner === 'player') {
      setGameState(prev => ({
        ...prev,
        properties: prev.properties.map((p, index) =>
          index === propertyIndex ? { ...p, owner: undefined } : p
        ),
        playerBalance: prev.playerBalance + (property.price || 0),
      }));
    }
  };

  const makePrediction = async (market: string, prediction: string) => {
    try {
      // Sign the prediction with wallet
      let signature: string | null = null;
      if (signPrediction) {
        signature = await signPrediction(market, prediction);
        if (!signature) {
          throw new Error('Failed to sign prediction');
        }
        setSignedPredictions(prev => ({ ...prev, [market]: signature! }));
      }

      const newPrediction: Prediction = {
        id: Date.now().toString(),
        market,
        prediction,
        timestamp: Date.now(),
      };

      setPredictions(prev => [...prev, newPrediction]);
      setGameState(prev => ({
        ...prev,
        predictionsMade: prev.predictionsMade + 1,
      }));

      // Submit to on-chain service
      if (signature) {
        await onChainService.submitPrediction('player_address', market, prediction, signature);
      }

      // Simulate prediction result after some time
      setTimeout(async () => {
        const isCorrect = Math.random() > 0.5; // 50% chance of being correct
        const reward = isCorrect ? Math.floor(Math.random() * 500) + 100 : 0;
        
        setPredictions(prev => 
          prev.map(p => 
            p.id === newPrediction.id 
              ? { ...p, result: isCorrect, reward }
              : p
          )
        );

        if (isCorrect) {
          setGameState(prev => ({
            ...prev,
            playerBalance: prev.playerBalance + reward,
          }));

          // Mint free NFT for winning prediction
          const rarity = gameState.accuracy >= 80 ? 'legendary' : 
                        gameState.accuracy >= 60 ? 'epic' : 
                        gameState.accuracy >= 40 ? 'rare' : 'common';
          
          const mintResult = await onChainService.mintFreeNFT('player_address', newPrediction.id, rarity);
          if (mintResult.success) {
            // Add the new NFT to the collection
            const newNFT: NFT = {
              id: mintResult.tokenId!,
              name: `Winner NFT #${mintResult.tokenId}`,
              description: `Free NFT earned for correct prediction on ${market}`,
              image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mintResult.tokenId}`,
              rarity: rarity as any,
              attributes: {
                accuracy: gameState.accuracy,
                predictions: gameState.predictionsMade + 1,
                properties: gameState.propertiesOwned,
                achievements: [`Correct ${market} prediction`, `${rarity.toUpperCase()} Winner`],
              },
              mintedAt: Date.now(),
            };

            setNfts(prev => [...prev, newNFT]);
            setGameState(prev => ({
              ...prev,
              nftsOwned: prev.nftsOwned + 1,
            }));
          }
        }

        // Update accuracy
        const correctPredictions = predictions.filter(p => p.result === true).length + (isCorrect ? 1 : 0);
        const totalPredictions = predictions.length + 1;
        const newAccuracy = Math.round((correctPredictions / totalPredictions) * 100);
        
        setGameState(prev => ({
          ...prev,
          accuracy: newAccuracy,
        }));
      }, 5000);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  const mintNFT = () => {
    if (gameState.predictionsMade >= 3) {
      const rarity = gameState.accuracy >= 80 ? 'legendary' : 
                    gameState.accuracy >= 60 ? 'epic' : 
                    gameState.accuracy >= 40 ? 'rare' : 'common';

      const newNFT: NFT = {
        id: Date.now().toString(),
        name: `Crypto Trader #${nfts.length + 1}`,
        description: `A unique NFT representing your trading achievements with ${gameState.accuracy}% accuracy`,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        rarity,
        attributes: {
          accuracy: gameState.accuracy,
          predictions: gameState.predictionsMade,
          properties: gameState.propertiesOwned,
          achievements: [`${gameState.accuracy}% Accuracy`, `${gameState.predictionsMade} Predictions`],
        },
        mintedAt: Date.now(),
      };

      setNfts(prev => [...prev, newNFT]);
      setGameState(prev => ({
        ...prev,
        nftsOwned: prev.nftsOwned + 1,
      }));
    }
  };

  return {
    gameState,
    playerPosition: gameState.playerPosition,
    playerBalance: gameState.playerBalance,
    properties: gameState.properties,
    predictions,
    nfts,
    rollDice,
    buyProperty,
    sellProperty,
    makePrediction,
    mintNFT,
  };
};