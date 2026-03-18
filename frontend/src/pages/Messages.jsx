import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await api.get('/messages');
            setMessages(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching messages", err);
            setLoading(false);
        }
    };

    const handlePostMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setSubmitting(true);
        try {
            await api.post('/messages', { content: newMessage });
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error("Error posting message", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await api.delete(`/messages/${id}`);
                fetchMessages();
            } catch (err) {
                console.error("Error deleting message", err);
            }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar currentPath="/messages" />
            <div className="flex-1 ml-64 p-8">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Announcements</h1>
                    <p className="text-gray-500 mb-8">Post updates directly to the student dashboard</p>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <form onSubmit={handlePostMessage}>
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your announcement here..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-32 mb-4"
                                required
                            />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`px-6 py-2.5 rounded-lg text-white font-semibold transition-all ${
                                        submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                                    }`}
                                >
                                    {submitting ? 'Posting...' : 'Post Announcement'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Message History</h2>
                        {messages.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No announcements posted yet.</p>
                        ) : (
                            messages.slice().reverse().map((msg, index) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                                    key={msg.id} 
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start"
                                >
                                    <div className="flex-1 pr-4">
                                        <p className="text-sm text-blue-600 font-medium mb-2">{format(new Date(msg.createdAt), 'MMMM dd, yyyy - hh:mm a')}</p>
                                        <p className="text-gray-700 whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(msg.id)}
                                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete message"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Messages;
