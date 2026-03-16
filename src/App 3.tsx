import { Analytics } from "@vercel/analytics/react";
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BookRecommendations from './pages/BookRecommendations';
import BlogPage from './pages/BlogPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutEnneagram from './pages/AboutEnneagram';
import QuizPage from './pages/QuizPage';
import InDepthIntel from './pages/InDepthIntel';
import CharacterSelectionPage from './pages/CharacterSelectionPage';
import NewsletterPage from './pages/NewsletterPage';
import StrategyPage from './components/StrategyPage';
import GamesPage from './pages/GamesPage';
import SynthesisPage from './pages/SynthesisPage';
import TopicList from './components/discussion/TopicList';
import TopicView from './components/discussion/TopicView';
import ShareButton from './components/ShareButton';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { analytics } from './services/analyticsService';
import { Mail, Facebook } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

function App() {
  const [activeTab, setActiveTab] = useState<'about' | 'synthesis' | 'games' | 'strategy' | 'quiz' | 'intel' | 'characters' | 'books' | 'blog' | 'newsletter' | 'discussion'>('discussion');
  const location = useLocation();

  // Sync activeTab with URL path on mount and location change
  React.useEffect(() => {
    const path = location.pathname.split('/')[1];
    const validTabs = ['about', 'synthesis', 'games', 'strategy', 'quiz', 'intel', 'characters', 'books', 'blog', 'newsletter', 'discussion'] as const;
    if ((validTabs as readonly string[]).includes(path)) {
      if (isNative && path === 'books') {
        setActiveTab('about');
      } else {
        setActiveTab(path as typeof validTabs[number]);
      }
    } else if (location.pathname.startsWith('/topic/')) {
      setActiveTab('discussion');
    }
  }, [location.pathname]);

  const isPrivacyPage = location.pathname === '/privacy';

  React.useEffect(() => {
    const pageName = isPrivacyPage ? 'Privacy' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    analytics.trackPageView(pageName);
  }, [activeTab, isPrivacyPage]);

  // Determine SEO metadata based on current state
  const seoData = useMemo(() => {
    if (isPrivacyPage) {
      return { title: 'Privacy Policy | Enneagaming', description: 'Privacy policy and data handling for Enneagaming.' };
    }
    
    switch (activeTab) {
      case 'about':
        return { title: 'About Enneagram in Gaming | Enneagaming', description: 'Learn how the 9 Enneagram personality types translate into competitive gaming behaviors, strengths, and weaknesses.' };
      case 'synthesis':
        return { title: 'Enneagram Synthesis | Enneagaming', description: 'Explore the complete Enneagram system mapped to gaming strategies. Understand the Head, Heart, and Gut centers in esports.' };
      case 'strategy':
        return { title: 'Game Strategies by Personality | Enneagaming', description: 'Find tailored gaming strategies for League of Legends, Valorant, CS2, and more based on your Enneagram type.' };
      case 'quiz':
        return { title: 'Gamer Personality Quiz | Enneagaming', description: 'Take our specialized Enneagram quiz designed for gamers to discover your core gaming personality and tactical style.' };
      case 'intel':
        return { title: 'In-Depth Intel | Enneagaming', description: 'Deep dive into advanced behavioral analytics and psychological tactics for competitive gamers.' };
      case 'characters':
        return { title: 'Character Selection | Enneagaming', description: 'Find the perfect character, agent, or champion that matches your Enneagram personality type.' };
      case 'books':
        return { title: 'Recommended Reading | Enneagaming', description: 'Curated books on psychology, strategy, and self-improvement for competitive gamers.' };
      case 'blog':
        return { title: 'Enneagaming Blog | Esports Psychology', description: 'Read the latest articles on esports psychology, Enneagram analysis, and competitive gaming strategies.' };
      case 'newsletter':
        return { title: 'Subscribe to Enneagaming | Newsletter', description: 'Join the Enneagaming newsletter for weekly insights on gaming psychology and personality-driven tactics.' };
      default:
        return {};
    }
  }, [activeTab, isPrivacyPage]);

  console.log("App rendering, activeTab:", activeTab);
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500/30 pb-12">
      <SEO {...seoData} />
      {isPrivacyPage ? (
        <PrivacyPage />
      ) : (
        <>
          {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setActiveTab('about')}>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white">
                <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 13.5C15.8284 13.5 16.5 12.8284 16.5 12C16.5 11.1716 15.8284 10.5 15 10.5C14.1716 10.5 13.5 11.1716 13.5 12C13.5 12.8284 14.1716 13.5 15 13.5Z" fill="currentColor"/>
                <path d="M18 11.5C18.8284 11.5 19.5 10.8284 19.5 10C19.5 9.17157 18.8284 8.5 18 8.5C17.1716 8.5 16.5 9.17157 16.5 10C16.5 10.8284 17.1716 11.5 18 11.5Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="font-mono font-bold tracking-tighter text-lg sm:text-xl hidden xs:block">Enneagaming</span>
          </Link>
          <nav className="flex gap-1 bg-white/5 p-1 rounded-lg overflow-x-auto no-scrollbar scroll-smooth">
            <Link
              to="/about"
              onClick={() => setActiveTab('about')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'about' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              About
            </Link>
            <Link
              to="/synthesis"
              onClick={() => setActiveTab('synthesis')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'synthesis' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Synthesis
            </Link>
            <Link
              to="/strategy"
              onClick={() => setActiveTab('strategy')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'strategy' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Strategy
            </Link>
            <Link
              to="/games"
              onClick={() => setActiveTab('games')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'games' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Games
            </Link>
            <Link
              to="/characters"
              onClick={() => setActiveTab('characters')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'characters' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Characters
            </Link>
            <Link
              to="/quiz"
              onClick={() => setActiveTab('quiz')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'quiz' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Quiz
            </Link>
            <Link
              to="/intel"
              onClick={() => setActiveTab('intel')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'intel' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Intel
            </Link>
            {!isNative && (
              <Link
                to="/books"
                onClick={() => setActiveTab('books')}
                className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'books' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
              >
                Books
              </Link>
            )}
            <Link
              to="/blog"
              onClick={() => setActiveTab('blog')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'blog' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Blog
            </Link>
            <Link
              to="/discussion"
              onClick={() => setActiveTab('discussion')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'discussion' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Discussion
            </Link>
          </nav>
          <div className="flex items-center gap-2 relative">
            <ShareButton />
            <div className="absolute top-[calc(100%+1.5rem)] right-0 z-50 hidden md:flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('newsletter')}
                className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 shadow-lg whitespace-nowrap border border-red-400/30 w-full justify-center"
              >
                <Mail className="w-4 h-4 hidden sm:block" />
                Newsletter
              </button>
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] hover:bg-[#1864D9] text-white px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 shadow-lg whitespace-nowrap border border-[#1877F2]/30 w-full justify-center"
              >
                <Facebook className="w-4 h-4 hidden sm:block" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden relative">
        <div className="fixed bottom-20 right-6 z-[60] md:hidden flex flex-col gap-3">
          <ShareButton />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'about' ? <AboutEnneagram /> : 
           activeTab === 'quiz' ? <QuizPage /> :
           activeTab === 'intel' ? <InDepthIntel /> :
           activeTab === 'blog' ? <BlogPage /> :
           activeTab === 'newsletter' ? <NewsletterPage /> :
           activeTab === 'discussion' ? (location.pathname.startsWith('/topic/') ? <TopicView topicId={location.pathname.split('/')[2]} /> : <TopicList />) :
           activeTab === 'books' ? <BookRecommendations /> :
           activeTab === 'characters' ? <CharacterSelectionPage /> :
           activeTab === 'synthesis' ? <SynthesisPage /> :
           activeTab === 'strategy' ? <StrategyPage /> :
           <GamesPage />}
        </div>
      </main>
      {activeTab !== 'intel' && <Footer />}
      <Analytics />
        </>
      )}
    </div>
  );
}

export default App;
