import React, { createContext, useContext, useState, useEffect } from 'react';
import { createConfig, WagmiConfig, useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import {
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  avalanche,
  avalancheFuji,
  arbitrum,
  arbitrumSepolia,
  celo,
  celoAlfajores,
  optimism,
  optimismSepolia,
} from 'wagmi/chains';
import { walletConnect, metaMask, coinbaseWallet, injected } from '@wagmi/connectors';
import { Web3Modal } from "@web3modal/react";




const projectId = '0a37a08544e5cdae64034ed6a636de35';


// List of supported chains
const chains = [
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  avalanche,
  avalancheFuji,
  arbitrum,
  arbitrumSepolia,
  celo,
  celoAlfajores,
  optimism,
  optimismSepolia,
];

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: () => [
    walletConnect({ projectId, chains, showQrModal: true }),
    metaMask({ chains }),
    coinbaseWallet({ appName: 'Crypto Poly', chains }),
    injected({ chains, shimDisconnect: true }),
  ],
});

interface Web3ContextType {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  isConnected: boolean;
  account: string | null;
  signMessage: (message: string) => Promise<string | null>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    setAccount(isConnected ? address : null);
  }, [isConnected, address]);

  const connectWallet = async () => {
    try {
      // Defaulting to walletConnect for now
      const result = await connectAsync({
        connector: walletConnect({ projectId, chains, showQrModal: true }),
      });
      setAccount(result.account || null);
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

  const signMessage = async (message: string) => {
    try {
      return await signMessageAsync({ message });
    } catch (err) {
      console.error('Signature failed:', err);
      return null;
    }
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <Web3Context.Provider value={{ connectWallet, disconnectWallet, isConnected, account, signMessage }}>
        {children}
        <Web3Modal projectId={projectId} theme="dark" accentColor="blue" defaultChain={mainnet.id} />
      </Web3Context.Provider>
    </WagmiConfig>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error('useWeb3 must be used within a Web3Provider');
  return context;
};
