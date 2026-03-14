import React, { useState } from 'react';
import { enneagramData } from '../data/enneagram';
import CommentsPage from './CommentsPage';

const quizQuestions = [
  { id: 1, text: "When facing a challenge, my first instinct is to:", options: [
    { text: "Find the most efficient way to achieve the goal.", typeId: 3 },
    { text: "Keep things calm and avoid unnecessary conflict.", typeId: 9 },
    { text: "Ensure everything is done correctly and according to standards.", typeId: 1 },
    { text: "Look for the most exciting or fun path forward.", typeId: 7 },
    { text: "Focus on how I can help others through it.", typeId: 2 },
    { text: "Take charge and confront it head-on.", typeId: 8 },
    { text: "Reflect on what it means for my personal growth.", typeId: 4 },
    { text: "Analyze the situation to understand it fully.", typeId: 5 },
    { text: "Consider the potential risks and prepare for them.", typeId: 6 },
  ]},
  { id: 2, text: "In a team environment, I value:", options: [
    { text: "Security and loyalty.", typeId: 6 },
    { text: "Authenticity and uniqueness.", typeId: 4 },
    { text: "Variety and enthusiasm.", typeId: 7 },
    { text: "Integrity and high standards.", typeId: 1 },
    { text: "Competence and knowledge.", typeId: 5 },
    { text: "Peace and stability.", typeId: 9 },
    { text: "Support and harmony.", typeId: 2 },
    { text: "Strength and decisiveness.", typeId: 8 },
    { text: "Success and recognition.", typeId: 3 },
  ]},
  { id: 3, text: "When playing a competitive game, my main focus is:", options: [
    { text: "Dominating the opponent and leading the charge.", typeId: 8 },
    { text: "Playing perfectly and not making mistakes.", typeId: 1 },
    { text: "Keeping the team vibe chill and avoiding toxicity.", typeId: 9 },
    { text: "Understanding the deep mechanics and strategy.", typeId: 5 },
    { text: "Winning and being the MVP.", typeId: 3 },
    { text: "Expressing my unique playstyle, even if it's off-meta.", typeId: 4 },
    { text: "Making sure my team is having a good time and supported.", typeId: 2 },
    { text: "Sticking to the plan and watching out for ambushes.", typeId: 6 },
    { text: "Having fast-paced fun and trying crazy strategies.", typeId: 7 },
  ]},
  { id: 4, text: "If my team is losing badly, I usually:", options: [
    { text: "Analyze what went wrong and how to counter it next time.", typeId: 5 },
    { text: "Try to encourage everyone and keep spirits up.", typeId: 2 },
    { text: "Get bored and try to just make some chaotic, fun plays.", typeId: 7 },
    { text: "Go with the flow and just wait for the next game.", typeId: 9 },
    { text: "Take command, call the shots, and push aggressively.", typeId: 8 },
    { text: "Get frustrated by the specific mistakes we are making.", typeId: 1 },
    { text: "Worry about our rank dropping and look for a safe fallback plan.", typeId: 6 },
    { text: "Feel misunderstood or disconnect from the team's generic strategy.", typeId: 4 },
    { text: "Try to solo-carry and turn the game around myself.", typeId: 3 },
  ]},
  { id: 5, text: "What brings me the most satisfaction?", options: [
    { text: "A smooth, harmonious game where everyone clicks.", typeId: 9 },
    { text: "Pulling off a rare, creative combo no one expects.", typeId: 4 },
    { text: "Crushing the enemy team's morale through sheer force.", typeId: 8 },
    { text: "Executing a flawless, well-thought-out plan.", typeId: 1 },
    { text: "Experiencing non-stop action and adrenaline.", typeId: 7 },
    { text: "Seeing my name at the top of the leaderboard.", typeId: 3 },
    { text: "Successfully defending a point against all odds.", typeId: 6 },
    { text: "Outsmarting the enemy with superior knowledge.", typeId: 5 },
    { text: "Being recognized for saving a teammate.", typeId: 2 },
  ]}
];

const colorPalette = [
  { bg: 'bg-slate-500/5', border: 'border-slate-500/20 hover:border-slate-400/40', text: 'text-slate-500 group-hover:text-slate-400', shadow: 'hover:shadow-slate-500/10' },
  { bg: 'bg-cyan-500/5', border: 'border-cyan-500/20 hover:border-cyan-400/40', text: 'text-cyan-600 group-hover:text-cyan-400', shadow: 'hover:shadow-cyan-500/10' },
  { bg: 'bg-indigo-500/5', border: 'border-indigo-500/20 hover:border-indigo-400/40', text: 'text-indigo-500 group-hover:text-indigo-400', shadow: 'hover:shadow-indigo-500/10' },
  { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20 hover:border-emerald-400/40', text: 'text-emerald-600 group-hover:text-emerald-400', shadow: 'hover:shadow-emerald-500/10' },
  { bg: 'bg-rose-500/5', border: 'border-rose-500/20 hover:border-rose-400/40', text: 'text-rose-600 group-hover:text-rose-400', shadow: 'hover:shadow-rose-500/10' },
  { bg: 'bg-amber-500/5', border: 'border-amber-500/20 hover:border-amber-400/40', text: 'text-amber-600 group-hover:text-amber-400', shadow: 'hover:shadow-amber-500/10' },
  { bg: 'bg-fuchsia-500/5', border: 'border-fuchsia-500/20 hover:border-fuchsia-400/40', text: 'text-fuchsia-600 group-hover:text-fuchsia-400', shadow: 'hover:shadow-fuchsia-500/10' },
  { bg: 'bg-teal-500/5', border: 'border-teal-500/20 hover:border-teal-400/40', text: 'text-teal-600 group-hover:text-teal-400', shadow: 'hover:shadow-teal-500/10' },
  { bg: 'bg-violet-500/5', border: 'border-violet-500/20 hover:border-violet-400/40', text: 'text-violet-500 group-hover:text-violet-400', shadow: 'hover:shadow-violet-500/10' },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>({});
  const [result, setResult] = useState<number | null>(null);

  const handleAnswer = (typeId: number) => {
    const newScores = { ...scores, [typeId]: (scores[typeId] || 0) + 1 };
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Auto-solve
      const maxType = Object.entries(newScores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
      setResult(Number(maxType));
    }
  };

  if (result !== null) {
    const type = enneagramData.find(t => t.id === result);
    return (
      <div className="max-w-3xl mx-auto w-full pt-6 md:pt-10 p-4 flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-4 mb-6">
          <h2 className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded inline-block backdrop-blur-sm border border-cyan-500/20 uppercase tracking-widest">
            Analysis Complete
          </h2>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
            Type <span className="text-cyan-500">{type?.id}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-200">{type?.name}</h2>
        </div>
        
        <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-5 text-left mb-6 shadow-2xl">
           <p className="text-gray-400 leading-relaxed text-sm md:text-base border-l-2 border-cyan-500/50 pl-4 whitespace-pre-wrap">
             {type?.synthesis}
           </p>
        </div>
        
        <div className="text-center pb-12 border-b border-white/10">
          <button 
            onClick={() => { setCurrentQuestion(0); setScores({}); setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-white font-mono text-sm uppercase tracking-widest rounded-lg transition-all"
          >
            Restart Simulation
          </button>
        </div>

        <div className="mt-8">
          <CommentsPage />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full pt-4 md:pt-8 p-4 flex flex-col h-full">
      <div className="text-center space-y-2 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase italic leading-none">
          Enneagram <span className="text-cyan-500">Quiz</span>
        </h1>
        <div className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded inline-block backdrop-blur-sm border border-cyan-500/20 tracking-widest">
          QUESTION {currentQuestion + 1} OF {quizQuestions.length}
        </div>
      </div>
      
      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 md:p-8 shadow-xl flex-1 flex flex-col">
        <h2 className="text-lg md:text-2xl font-bold text-white text-center mb-6 md:mb-8">
          {quizQuestions[currentQuestion].text}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 flex-1 auto-rows-fr">
          {quizQuestions[currentQuestion].options.map((option, i) => {
            const color = colorPalette[option.typeId % colorPalette.length];
            return (
              <button 
                key={i} 
                onClick={() => handleAnswer(option.typeId)} 
                className={`p-3 md:p-4 border rounded-xl text-center transition-all hover:shadow-lg group flex items-center justify-center min-h-[4.5rem] ${color.bg} ${color.border} ${color.shadow}`}
              >
                <span className="text-xs md:text-sm leading-snug text-gray-300 group-hover:text-white">{option.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
