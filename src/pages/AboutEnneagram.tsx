import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Shield, Target, ChevronDown, Gamepad2, Crosshair, Users } from 'lucide-react';

const CenterCard = ({ icon: Icon, color, title, description, details }: { icon: React.ElementType, color: string, title: string, description: string, details: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 cursor-pointer transition-colors hover:bg-white/10`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={`w-12 h-12 rounded-full ${color}/20 flex items-center justify-center`}>
        <Icon className={`${color.replace('/', '-')} text-white w-6 h-6`} />
      </div>
      <h3 className="text-lg font-bold text-white flex justify-between items-center">
        {title}
        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
      <AnimatePresence>
        {isExpanded && (
          <motion.p 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-sm text-gray-300 pt-2 border-t border-white/10"
          >
            {details}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AboutEnneagram = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-gray-200">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 sm:space-y-12"
      >
        <motion.section variants={itemVariants} className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-12 uppercase italic tracking-tighter">The Gaming Enneagram</h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-3xl mx-auto px-2">
            The Enneagram isn't just a personality test—it's the ultimate meta-game. By understanding the core motivations that drive your decisions, you can unlock your true potential in competitive gaming.
          </p>
        </motion.section>

        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          <CenterCard 
            icon={Brain} 
            color="bg-cyan-500" 
            title="The Tacticians (Head)" 
            description="Types 5, 6, and 7. The masterminds who win through superior game knowledge, map awareness, and strategy."
            details="They process the game through analysis. A Type 5 studies the meta, a Type 6 secures the objective, and a Type 7 thrives on unpredictable, high-mobility flanking."
          />
          <CenterCard 
            icon={Heart} 
            color="bg-yellow-500" 
            title="The Synergists (Heart)" 
            description="Types 2, 3, and 4. The emotional core of the team, driven by team dynamics, performance, and unique playstyles."
            details="They process the game through connection and image. A Type 2 plays the ultimate support, a Type 3 hard-carries for the MVP title, and a Type 4 masters niche, off-meta picks."
          />
          <CenterCard 
            icon={Shield} 
            color="bg-red-500" 
            title="The Enforcers (Gut)" 
            description="Types 8, 9, and 1. The frontline anchors driven by instinct, control, and flawless mechanical execution."
            details="They process the game through action. A Type 8 forces the teamfight, a Type 9 peels and protects the backline, and a Type 1 demands perfect mechanical precision."
          />
        </motion.div>

        <section className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-3xl font-serif italic text-white flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
            Why Personality Matters in Esports
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col gap-4 bg-black/40 p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-2">Role Selection</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Stop forcing yourself to play the meta if it contradicts your core motivations. Find the character archetype that naturally aligns with your psychological needs.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-black/40 p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-2">Tilt Management</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Every Enneagram type tilts differently. A Type 1 tilts at mistakes, while a Type 8 tilts at cowardice. Knowing your trigger is the first step to maintaining focus.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-black/40 p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-2">Team Synergy</h4>
                <p className="text-gray-400 text-sm leading-relaxed">A balanced team isn't just about having a tank, healer, and DPS. It's about having the right mix of Head, Heart, and Gut players to cover each other's psychological blind spots.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center pb-12">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Synthesized from traditional Enneagram theory and applied to competitive gaming.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default AboutEnneagram;
