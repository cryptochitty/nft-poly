
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-800/50 rounded-lg shadow-xl backdrop-blur-sm">
      <h1 className="text-4xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-6">
        About CryptoPoly NFT Edition
      </h1>
      <div className="space-y-4 text-gray-300">
        <p>
          CryptoPoly is a modern, web-based adaptation of the classic real estate trading game, reimagined for the digital age of cryptocurrencies, prediction markets, and NFTs.
        </p>
         <p>
          In this version, you connect your crypto wallet and play against an AI opponent, "Satoshi". Instead of buying properties, you invest in the outcomes of real-world prediction markets. When you invest, you sign a message with your wallet and are rewarded with a unique (and free!) NFT representing your position.
        </p>
        <p>
          This project was built to showcase modern frontend development techniques using a powerful tech stack:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>React 18:</strong> For building a fast, dynamic, and component-based user interface.</li>
          <li><strong>TypeScript:</strong> To ensure type safety, better developer experience, and more maintainable code.</li>
          <li><strong>Tailwind CSS:</strong> For rapid, utility-first styling.</li>
          <li><strong>Web3 Integration:</strong> Using `window.ethereum` to connect to wallets like MetaMask for identity and transaction signing (no real funds are used).</li>
        </ul>
        <p>
          This application is a demonstration project for educational and entertainment purposes only. It is not affiliated with Hasbro's Monopoly or any cryptocurrency project mentioned. All "transactions" are simulated and no real money is ever used.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
