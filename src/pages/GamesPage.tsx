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
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{game.game}</h3>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                  {game.genre}
                </span>
              </div>
              <p className="text-sm text-gray-400">{game.description}</p>

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
