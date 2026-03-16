import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import ReplyForm from './ReplyForm';
import ReactMarkdown from 'react-markdown';

interface Topic {
  id: string;
  title: string;
  content: string;
  authorName: string;
}

interface Reply {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
}

interface TopicViewProps {
  topicId: string;
}

const TopicView = ({ topicId }: TopicViewProps) => {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    if (!topicId) return;

    const topicRef = doc(db, 'topics', topicId);
    getDoc(topicRef).then(docSnap => {
      if (docSnap.exists()) {
        setTopic({ id: docSnap.id, ...docSnap.data() } as Topic);
      }
    });

    const repliesRef = collection(db, 'topics', topicId, 'replies');
    const q = query(repliesRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const replyData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Reply[];
      setReplies(replyData);
    });
    return () => unsubscribe();
  }, [topicId]);

  if (!topic) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{topic.title}</h1>
      <div className="bg-[#111] border border-white/10 rounded-lg p-6">
        <ReactMarkdown>{topic.content}</ReactMarkdown>
        <p className="text-sm text-gray-400 mt-4">By {topic.authorName}</p>
      </div>
      
      <div className="space-y-4">
        {replies.map(reply => (
          <div key={reply.id} className="bg-[#1a1a1a] border border-white/5 rounded-lg p-4">
            <ReactMarkdown>{reply.content}</ReactMarkdown>
            <p className="text-xs text-gray-500 mt-2">{reply.authorName}</p>
          </div>
        ))}
      </div>
      
      {topicId && <ReplyForm topicId={topicId} />}
    </div>
  );
};

export default TopicView;
