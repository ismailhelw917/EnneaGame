import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { gameStrategies } from '../data/enneagram';

const GamesPage = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto w-full space-y-12 pb-24">
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
          Game-Specific Strategies
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg">
          Tailored advice for popular games based on your Enneagram type.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameStrategies.map((game) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group cursor-pointer"
            onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={game.thumbnail} 
                alt={game.game} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                  {game.genre}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{game.game}</h3>
                <p className="text-sm text-gray-400 mt-1">{game.description}</p>
              </div>

              {selectedGame === game.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-3 pt-4 border-t border-white/10"
                >
                  <h4 className="text-xs font-mono text-gray-500 uppercase">Type-Specific Advice</h4>
                  {game.advice.map((adv, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-lg">
                      <span className="text-cyan-400 font-bold mr-2">Type {adv.typeId}:</span>
                      <span className="text-sm text-gray-300">{adv.tip}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
