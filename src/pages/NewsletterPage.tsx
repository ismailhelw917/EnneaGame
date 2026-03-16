import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Facebook } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { enneagramData } from '../data/enneagram';

const NewsletterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !consent) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'subscribers'), {
        name,
        email,
        type: type || null,
        consent,
        createdAt: Date.now()
      });

      setStatus('success');
      setName('');
      setEmail('');
      setType('');
      setConsent(false);
    } catch (error) {
      console.error('Error subscribing:', error);
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-6 md:pt-12 p-4">
      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <Mail className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Join the Intel Drop</h1>
              <p className="text-gray-400 text-sm">Get the latest Enneagram gaming strategies delivered to your inbox.</p>
            </div>
          </div>

          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-white">Subscription Confirmed!</h3>
                <p className="text-gray-400 mt-2">You're on the list. Keep an eye on your inbox for the next intel drop.</p>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-colors"
              >
                Subscribe Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Operative Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Secure Comm Channel (Email)
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Enneagram Type (Optional)
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-gray-900">Unknown / Prefer not to say</option>
                    {enneagramData.map((t) => (
                      <option key={t.id} value={t.id.toString()} className="bg-gray-900">
                        Type {t.id} - {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-black/50 text-red-500 focus:ring-red-500/50 focus:ring-offset-0"
                  />
                </div>
                <label htmlFor="consent" className="text-sm text-gray-400 leading-relaxed">
                  I agree to receive tactical updates, gaming strategies, and newsletter communications. I understand I can unsubscribe at any time.
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || !name || !email || !consent}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Subscribe to Newsletter
                  </>
                )}
              </button>
              
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1877F2] hover:bg-[#1864D9] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <Facebook className="w-5 h-5" />
                Follow us on Facebook
              </a>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;
