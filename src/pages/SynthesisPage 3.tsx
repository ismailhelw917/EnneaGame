import React from 'react';
import { motion } from 'framer-motion';
import { enneagramData } from '../data/enneagram';

const SynthesisPage = () => {
  return (
    <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-12 pb-24">
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-4 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
          Enneagram Synthesis
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg">
          Explore the complete Enneagram system mapped to gaming strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {enneagramData.map((type) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-cyan-500/30 transition-all group"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xl sm:text-2xl border bg-opacity-10 
                ${type.center === 'Head' ? 'text-cyan-400 border-cyan-400/30 bg-cyan-950/30' : 
                  type.center === 'Heart' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-950/30' : 
                  'text-red-400 border-red-400/30 bg-red-950/30'}`}>
                {type.id}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight leading-tight">{type.name}</h3>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{type.center} Center</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 p-3 sm:p-4 rounded-lg border border-white/5">
                <h3 className="text-[10px] font-mono text-gray-500 uppercase mb-1 sm:mb-2">Synthesis Source</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{type.synthesis}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="space-y-1">
                   <h3 className="text-[10px] font-mono text-green-500 uppercase flex items-center gap-2">
                     Core Desire
                   </h3>
                   <p className="text-xs sm:text-sm text-gray-300">{type.coreDesire}</p>
                </div>
                <div className="space-y-1">
                   <h3 className="text-[10px] font-mono text-red-500 uppercase flex items-center gap-2">
                     Core Fear
                   </h3>
                   <p className="text-xs sm:text-sm text-gray-300">{type.coreFear}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SynthesisPage;
