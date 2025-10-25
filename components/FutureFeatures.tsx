import React from 'react';

const FutureFeatures: React.FC = () => {
  const features = [
    {
      title: "Real Asset Integration",
      description: "Trade actual crypto assets and real estate tokens",
      icon: "🏠",
      status: "Coming Soon",
      timeline: "Q2 2024"
    },
    {
      title: "Cross-Chain Support",
      description: "Play across multiple blockchains seamlessly",
      icon: "🔗",
      status: "In Development",
      timeline: "Q1 2024"
    },
    {
      title: "DeFi Integration",
      description: "Stake, lend, and earn yield on your game assets",
      icon: "💰",
      status: "Planned",
      timeline: "Q3 2024"
    },
    {
      title: "Tournament Mode",
      description: "Compete in global tournaments with real prizes",
      icon: "🏆",
      status: "Planned",
      timeline: "Q2 2024"
    },
    {
      title: "AI Predictions",
      description: "Get AI-powered market insights and predictions",
      icon: "🤖",
      status: "Research",
      timeline: "Q4 2024"
    },
    {
      title: "Mobile App",
      description: "Play on the go with our mobile application",
      icon: "📱",
      status: "In Development",
      timeline: "Q1 2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Coming Soon": return "text-green-400 bg-green-900/30 border-green-600";
      case "In Development": return "text-blue-400 bg-blue-900/30 border-blue-600";
      case "Planned": return "text-yellow-400 bg-yellow-900/30 border-yellow-600";
      case "Research": return "text-purple-400 bg-purple-900/30 border-purple-600";
      default: return "text-gray-400 bg-gray-900/30 border-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Future Features
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          We're building the future of gamified trading. Here's what's coming next to Crypto Poly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{feature.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(feature.status)}`}>
                    {feature.status}
                  </span>
                  <span className="text-xs text-gray-400">{feature.timeline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap Timeline */}
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Development Roadmap</h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 1: Core Game (Completed)</h4>
              <p className="text-sm text-gray-300">Basic game mechanics, wallet integration, and NFT minting</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 2: Real Data Integration (Current)</h4>
              <p className="text-sm text-gray-300">Polymarket integration, wallet signing, and on-chain data</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 3: Real Assets (Q2 2024)</h4>
              <p className="text-sm text-gray-300">Trade actual crypto assets and real estate tokens</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 4: Advanced Features (Q3-Q4 2024)</h4>
              <p className="text-sm text-gray-300">Tournaments, DeFi integration, and AI predictions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Community */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-lg border border-blue-600/30">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
          <p className="text-gray-300 mb-6">
            Be the first to know about new features and get early access to beta releases.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://discord.gg/cryptopoly" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Discord
            </a>
            <a 
              href="https://twitter.com/cryptopoly" 
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://github.com/cryptochitty/nft-poly" 
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureFeatures;
