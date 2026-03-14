import React, { useState } from 'react';

const CommentsPage = () => {
  const [comments, setComments] = useState<{ name: string, text: string }[]>([
    { name: "Commander", text: "This Enneagram test is surprisingly accurate for my gaming style!" },
    { name: "Tactician", text: "Love the tactical advice for each type." },
  ]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const addComment = () => {
    if (name && text) {
      setComments([...comments, { name, text }]);
      setName('');
      setText('');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Comments</h2>
      <div className="space-y-4">
        {comments.map((c, i) => (
          <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="font-bold text-cyan-400">{c.name}</div>
            <div className="text-gray-300">{c.text}</div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="w-full p-2 bg-white/5 border border-white/10 rounded text-white" />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Your Comment" className="w-full p-2 bg-white/5 border border-white/10 rounded text-white" />
        <button onClick={addComment} className="px-4 py-2 bg-cyan-500 text-black rounded">Post Comment</button>
      </div>
    </div>
  );
};

export default CommentsPage;
