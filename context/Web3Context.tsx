import React, { createContext, useContext, useState, useEffect } from 'react';
import { createConfig, http, WagmiConfig, useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import {
  celo,
  celoAlfajores,
  mainnet,
  sepolia,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumSepolia,
  optimism,
  optimismSepolia,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  base,
  baseSepolia,
} from 'wagmi/chains';
import { metaMask, walletConnect, coinbaseWallet, injected } from 'wagmi/connectors';
import { Web3Modal } from '@web3modal/wagmi/react';

// 🔑 Get your projectId from https://cloud.walletconnect.com
const projectId = '<YOUR_WALLETCONNECT_PROJECT_ID>'; 

// ⚙️ Wagmi universal config for multi-chain + multi-wallet
export const wagmiConfig = createConfig({
  chains: [
    celo,
    celoAlfajores,
    mainnet,
    sepolia,
    polygon,
    polygonMumbai,
    arbitrum,
    arbitrumSepolia,
    optimism,
    optimismSepolia,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    base,
    baseSepolia,
  ],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
    [optimism.id]: http(),
    [optimismSepolia.id]: http(),
    [avalanche.id]: http(),
    [avalancheFuji.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId,
      showQrModal: true, // enables QR modal for desktop & deep linking for mobile
      metadata: {
        name: 'Crypto Poly',
        description: 'Cross-chain prediction & NFT minting game',
        url: 'https://nft-poly.vercel.app',
        icons: ['https://nft-poly.vercel.app/icon.png'],
      },
    }),
    metaMask(),
    coinbaseWallet({ appName: 'Crypto Poly' }),
    injected({ shimDisconnect: true }), // covers Trust, Rainbow, OKX, Bitget, etc.
  ],
});

// 🧠 Create Web3 Context
const Web3Context = createContext<any>(null);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      setAccount(address);
    } else {
      setAccount(null);
    }
  }, [address, isConnected]);

  // Connect wallet using Web3Modal
  const connectWallet = async () => {
    try {
      const result = await connectAsync({ connector: walletConnect({ projectId }) });
      if (result?.accounts?.length > 0) setAccount(result.accounts[0]);
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnectAsync();
      setAccount(null);
    } catch (err) {
      console.error('Disconnect failed:', err);
    }
  };

  // Sign message with wallet
  const signMessage = async (message: string) => {
    try {
      const signature = await signMessageAsync({ message });
      console.log('✅ Signature:', signature);
      return signature;
    } catch (err) {
      console.error('❌ Signature failed:', err);
      return null;
    }
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <Web3Context.Provider
        value={{
          connectWallet,
          disconnectWallet,
          isConnected,
          account,
          signMessage,
        }}
      >
        {children}
        {/* Web3Modal portal for all wallets */}
        <Web3Modal projectId={projectId} defaultChain={celoAlfajores} />
      </Web3Context.Provider>
    </WagmiConfig>
  );
};

export const useWeb3 = () => useContext(Web3Context);
