import React, { createContext, useContext, useState, useEffect } from 'react';
import { createConfig, WagmiConfig, useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { celoAlfajores } from 'wagmi/chains';
import { metaMask, walletConnect, coinbaseWallet, injected } from 'wagmi/connectors';
import { Web3Modal } from '@web3modal/wagmi/react';

const projectId = '<YOUR_WALLETCONNECT_PROJECT_ID>';

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    walletConnect({ projectId, showQrModal: true }),
    metaMask(),
    coinbaseWallet({ appName: 'Crypto Poly' }),
    injected({ shimDisconnect: true }),
  ],
});

const Web3Context = createContext<any>(null);

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
      const result = await connectAsync({ connector: wagmiConfig.connectors[0] });
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
        <Web3Modal projectId={projectId} defaultChain={celoAlfajores} />
      </Web3Context.Provider>
    </WagmiConfig>
  );
};

export const useWeb3 = () => useContext(Web3Context);
