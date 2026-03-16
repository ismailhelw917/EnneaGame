import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface Topic {
  id: string;
  title: string;
  authorName: string;
  createdAt: string;
  replyCount: number;
}

const TopicList = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'topics'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const topicData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Topic[];
      setTopics(topicData);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const authorUid = auth.currentUser?.uid || 'anonymous';
      const authorName = auth.currentUser?.displayName || 'Anonymous';

      await addDoc(collection(db, 'topics'), {
        title: newTitle,
        content: newContent,
        authorUid,
        authorName,
        tags: [],
        replyCount: 0,
        lastReplyAt: serverTimestamp(),
        createdAt: serverTimestamp()
      });

      setNewTitle('');
      setNewContent('');
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating topic:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white italic tracking-tight">Discussion Board</h2>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
        >
          {showCreateForm ? 'Cancel' : '+ New Topic'}
        </button>
      </div>
      
      {showCreateForm && (
        <form onSubmit={handleCreateTopic} className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all"
              placeholder="What's on your mind?"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Content</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all"
              placeholder="Share your thoughts..."
              rows={5}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              disabled={isSubmitting || !newTitle.trim() || !newContent.trim()}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              {isSubmitting ? 'Posting...' : 'Post Topic'}
            </button>
          </div>
        </form>
      )}

      {topics.length === 0 && !showCreateForm ? (
        <div className="bg-[#111] border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-lg">No discussions yet. Be the first to start a conversation!</p>
        </div>
      ) : (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
          {topics.map(topic => (
            <div key={topic.id} className="border-b border-white/5 p-5 last:border-0 hover:bg-white/5 transition-colors">
              <Link to={`/topic/${topic.id}`} className="text-lg sm:text-xl font-bold text-cyan-400 hover:text-cyan-300 block mb-1">
                {topic.title}
              </Link>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="font-medium text-gray-400">{topic.authorName}</span>
                <span>•</span>
                <span>{topic.replyCount} {topic.replyCount === 1 ? 'reply' : 'replies'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicList;
