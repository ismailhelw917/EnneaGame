import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { enneagramData } from '../data/enneagram';
import { BarChart3, Shield, Zap, Target, Brain, Activity, TrendingUp, Users, AlertTriangle, Sparkles, LayoutGrid, MousePointer2 } from 'lucide-react';

const InDepthIntel = () => {
  const [selectedTypeId, setSelectedTypeId] = useState<number>(1);

  const selectedType = enneagramData.find(t => t.id === selectedTypeId)!;

  const StatBar = ({ label, value, color, icon: Icon }: { label: string, value: number, color: string, icon?: React.ElementType }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-gray-500">
        <span className="flex items-center gap-1">
          {Icon && <Icon className="w-2.5 h-2.5" />}
          {label}
        </span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12 space-y-8 sm:space-y-12 pb-24 relative">
      {/* SEO Optimized Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase italic">
          Deep <span className="text-cyan-500">Intel</span> Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto">
          Advanced behavioral analytics and tactical recommendations for high-level competitive play. Master your Enneagram type in gaming.
        </p>
      </div>

      {/* Type Selector */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 border-b border-white/5">
        {enneagramData.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedTypeId(type.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-mono text-xs transition-all border ${
              selectedTypeId === type.id
                ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
            }`}
          >
            TYPE {type.id}
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTypeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {/* Left Column: Profile & Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-bold text-3xl border bg-opacity-10 
                    ${selectedType.center === 'Head' ? 'text-cyan-400 border-cyan-400/30 bg-cyan-950/30' : 
                      selectedType.center === 'Heart' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-950/30' : 
                      'text-red-400 border-red-400/30 bg-red-950/30'}`}>
                    {selectedType.id}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">{selectedType.name}</h2>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{selectedType.center} Center</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" /> Core Performance
                  </h3>
                  <div className="space-y-4">
                    <StatBar label="Mechanical Precision" value={selectedType.intel.stats.mechanics} color="bg-cyan-500" icon={MousePointer2} />
                    <StatBar label="Strategic Depth" value={selectedType.intel.stats.strategy} color="bg-purple-500" icon={LayoutGrid} />
                    <StatBar label="Communication" value={selectedType.intel.stats.comms} color="bg-blue-500" icon={Users} />
                    <StatBar label="Mental Fortitude" value={selectedType.intel.stats.mental} color="bg-emerald-500" icon={Shield} />
                    <StatBar label="Adaptability" value={selectedType.intel.stats.adaptability} color="bg-orange-500" icon={Zap} />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Advanced Metrics
                  </h3>
                  <div className="space-y-4">
                    <StatBar label="Clutch Factor" value={selectedType.intel.stats.clutchFactor} color="bg-red-500" icon={Zap} />
                    <StatBar label="Map Awareness" value={selectedType.intel.stats.mapAwareness} color="bg-indigo-500" icon={Target} />
                    <StatBar label="Resource Efficiency" value={selectedType.intel.stats.resourceEfficiency} color="bg-yellow-500" icon={Activity} />
                    <StatBar label="Tilt Resistance" value={selectedType.intel.stats.tiltResistance} color="bg-teal-500" icon={Shield} />
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <TrendingUp className="w-3 h-3" /> Growth Path
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{selectedType.intel.growthPath}"
                </p>
              </div>
            </div>

            {/* Middle Column: Tactical Intel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> Tilt Factor
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedType.intel.tiltFactor}
                  </p>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-mono text-yellow-500 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Stress Response
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedType.intel.stressResponse}
                  </p>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-mono text-blue-500 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3 h-3" /> Team Synergy
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedType.intel.teamSynergy}
                  </p>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-mono text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <Target className="w-3 h-3" /> Win Condition
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedType.intel.winCondition}
                  </p>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Brain className="w-32 h-32" />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold text-white uppercase italic">Psychological Synthesis</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedType.synthesis}
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Core Desire</span>
                      <span className="text-sm text-white">{selectedType.coreDesire}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Core Fear</span>
                      <span className="text-sm text-white">{selectedType.coreFear}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InDepthIntel;

