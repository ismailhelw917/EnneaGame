import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Eye, Cookie } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#0f0f0f] border border-white/10 w-full max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-cyan-500" />
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Privacy Protocol</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-8 text-gray-400 leading-relaxed">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Lock className="w-4 h-4 text-cyan-500" />
                  <h3>Data Collection & Intelligence</h3>
                </div>
                <p className="text-sm">
                  We collect minimal data necessary to provide tactical insights. This includes your Enneagram type selection and game preferences stored locally in your browser session. We do not sell your personal gaming profiles to third-party entities.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Cookie className="w-4 h-4 text-cyan-500" />
                  <h3>Cookie Protocol & AdSense</h3>
                </div>
                <p className="text-sm">
                  We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.
                </p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-xs italic">
                  Note: Google AdSense uses cookies to serve ads based on a user's prior visits to your website or other websites.
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Eye className="w-4 h-4 text-cyan-500" />
                  <h3>Analytics & Tracking</h3>
                </div>
                <p className="text-sm">
                  We utilize Google Analytics to monitor site traffic and user engagement patterns. This data is anonymized and used strictly for optimizing the tactical interface and content delivery.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Shield className="w-4 h-4 text-cyan-500" />
                  <h3>Your Rights</h3>
                </div>
                <p className="text-sm">
                  You have the right to clear your local storage and cookies at any time via your browser settings. For any inquiries regarding your data, please contact our Command Center.
                </p>
              </section>

              <div className="pt-8 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-center">
                Last Updated: March 2026 | Protocol Version 1.0
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex justify-end">
              <button 
                onClick={onClose}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-all uppercase tracking-widest text-xs"
              >
                Acknowledge Protocol
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicy;
