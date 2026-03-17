import React, { useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';

interface ReplyFormProps {
  topicId: string;
}

const ReplyForm = ({ topicId }: ReplyFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const authorUid = auth.currentUser?.uid || 'anonymous';
      const authorName = auth.currentUser?.displayName || 'Anonymous';

      await addDoc(collection(db, 'topics', topicId, 'replies'), {
        topicId,
        content,
        authorUid,
        authorName,
        createdAt: serverTimestamp(),
      });

      // Update topic reply count and last reply timestamp
      await updateDoc(doc(db, 'topics', topicId), {
        replyCount: increment(1),
        lastReplyAt: serverTimestamp()
      });

      setContent('');
    } catch (error) {
      console.error("Error posting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white"
        placeholder="Write a reply..."
        rows={4}
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        disabled={isSubmitting || !content.trim()}
        className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Posting...' : 'Post Reply'}
      </button>
    </form>
  );
};

export default ReplyForm;
