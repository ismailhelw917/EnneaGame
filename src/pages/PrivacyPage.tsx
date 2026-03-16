import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Cookie, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500/30 pb-24">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Shield className="w-6 h-6 text-cyan-500" />
            <span className="font-mono font-bold tracking-tighter text-xl text-white">Privacy Protocol</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            BACK TO COMMAND
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="p-8 md:p-12 space-y-12 text-gray-400 leading-relaxed">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white uppercase tracking-tight">Privacy Protocol</h1>
              <p className="text-sm font-mono uppercase tracking-widest text-cyan-500">Last Updated: March 2026 | Protocol Version 1.0</p>
            </div>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold text-xl">
                <Lock className="w-6 h-6 text-cyan-500" />
                <h2>Data Collection & Intelligence</h2>
              </div>
              <p className="text-lg">
                We collect minimal data necessary to provide tactical insights. This includes your Enneagram type selection and game preferences stored locally in your browser session. We do not sell your personal gaming profiles to third-party entities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                  <h3 className="text-white font-bold mb-2">Local Intelligence</h3>
                  <p className="text-sm">Selections are stored in your browser's local storage for persistence across sessions.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                  <h3 className="text-white font-bold mb-2">Zero Transmission</h3>
                  <p className="text-sm">Your personality data is never transmitted to our servers for storage or analysis.</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold text-xl">
                <Cookie className="w-6 h-6 text-cyan-500" />
                <h2>Cookie Protocol & AdSense</h2>
              </div>
              <p className="text-lg">
                We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.
              </p>
              <div className="bg-cyan-950/30 p-6 rounded-xl border border-cyan-500/20 text-sm italic text-cyan-200">
                Note: Google AdSense uses cookies to serve ads based on a user's prior visits to your website or other websites. You can opt-out of personalized advertising by visiting Google's Ad Settings.
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold text-xl">
                <Eye className="w-6 h-6 text-cyan-500" />
                <h2>Analytics & Tracking</h2>
              </div>
              <p className="text-lg">
                We utilize Google Analytics to monitor site traffic and user engagement patterns. This data is anonymized and used strictly for optimizing the tactical interface and content delivery.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold text-xl">
                <Shield className="w-6 h-6 text-cyan-500" />
                <h2>Your Rights</h2>
              </div>
              <p className="text-lg">
                You have the right to clear your local storage and cookies at any time via your browser settings. For any inquiries regarding your data, please contact our Command Center.
              </p>
            </section>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <Link 
                to="/"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-all uppercase tracking-widest text-sm shadow-lg shadow-cyan-900/20"
              >
                Return to Command
              </Link>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
                Tactical Intelligence Command © 2026
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPage;
