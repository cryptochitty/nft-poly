
import React, { createContext, useState, ReactNode, useContext, useCallback, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  connectWallet: () => Promise<void>;
  signMessage: (message: string) => Promise<string | null>;
}

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const isConnected = !!account;

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert('Please install MetaMask!');
    }
  }, []);

  const signMessage = async (message: string): Promise<string | null> => {
    if (window.ethereum && account) {
      try {
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account],
        });
        return signature;
      } catch (error) {
        console.error("Signing failed:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const value = { isConnected, account, connectWallet, signMessage };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
