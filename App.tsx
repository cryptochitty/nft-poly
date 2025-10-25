import React, { useState } from 'react';
import { Web3Provider, useWeb3 } from './context/Web3Context';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import AboutPage from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { isConnected, account } = useWeb3();
  const [currentPage, setCurrentPage] = useState<'home' | 'game' | 'about'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'game':
        return <GamePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onStartGame={() => setCurrentPage('game')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isConnected={isConnected}
        account={account}
      />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
};

export default App;
