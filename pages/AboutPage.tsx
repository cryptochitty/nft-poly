import React from 'react';
import FutureFeatures from '../components/FutureFeatures';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          About Crypto Poly
      </h1>
        <p className="text-xl text-gray-300">
          The future of gamified crypto trading and prediction markets
        </p>
      </div>

      <div className="space-y-8">
        {/* Mission */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Crypto Poly combines the excitement of board games with the innovation of blockchain technology. 
            We're creating an engaging platform where users can learn about cryptocurrency markets, 
            make predictions, and earn rewards through gameplay. Our goal is to democratize access to 
            financial education while making it fun and interactive.
          </p>
        </div>

        {/* Features */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-400">🎯 Prediction Markets</h3>
              <p className="text-gray-300 text-sm">
                Make predictions on real crypto market movements and earn rewards based on accuracy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">🏠 Virtual Properties</h3>
              <p className="text-gray-300 text-sm">
                Trade virtual properties representing different crypto assets and market sectors.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-400">🎨 NFT Collection</h3>
              <p className="text-gray-300 text-sm">
                Mint unique NFTs based on your trading achievements and prediction accuracy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">🏆 Leaderboards</h3>
              <p className="text-gray-300 text-sm">
                Compete with other players and climb the rankings based on your performance.
              </p>
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Technology Stack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Frontend</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• TailwindCSS</li>
                <li>• Vite</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Web3</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Wagmi v2</li>
                <li>• Web3Modal</li>
                <li>• Viem</li>
                <li>• Multi-chain Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Blockchain</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Ethereum</li>
                <li>• Polygon</li>
                <li>• Arbitrum</li>
                <li>• Optimism</li>
        </ul>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">Development Team</h2>
          <p className="text-gray-300 leading-relaxed">
            Crypto Poly is developed by a passionate team of blockchain developers, 
            game designers, and crypto enthusiasts. We believe in the power of gamification 
            to make complex financial concepts accessible to everyone.
          </p>
        </div>

        {/* Roadmap */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-red-400">Roadmap</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
              <div>
                <h3 className="font-semibold text-green-400">Phase 1: Core Game</h3>
                <p className="text-gray-300 text-sm">Basic game mechanics and wallet integration</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold text-blue-400">Phase 2: NFT Integration</h3>
                <p className="text-gray-300 text-sm">NFT minting and trading features</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-400">Phase 3: Advanced Features</h3>
                <p className="text-gray-300 text-sm">Tournaments, staking, and governance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/cryptochitty/nft-poly" className="text-blue-400 hover:text-blue-300">
              GitHub
            </a>
            <span className="text-gray-500">•</span>
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-300">
              Twitter
            </a>
            <span className="text-gray-500">•</span>
            <a href="mailto:contact@cryptopoly.com" className="text-blue-400 hover:text-blue-300">
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Future Features */}
      <div className="mt-16">
        <FutureFeatures />
      </div>
    </div>
  );
};

export default AboutPage;