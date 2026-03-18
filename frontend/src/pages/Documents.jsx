import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [title, setTitle] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await api.get('/documents');
            setDocuments(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching documents", err);
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!title.trim() || !fileUrl.trim()) return;
        setSubmitting(true);
        try {
            await api.post('/documents', { title, fileUrl });
            setTitle('');
            setFileUrl('');
            fetchDocuments();
        } catch (err) {
            console.error("Error sharing document", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this document link?')) {
            try {
                await api.delete(`/documents/${id}`);
                fetchDocuments();
            } catch (err) {
                console.error("Error deleting document", err);
            }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar currentPath="/documents" />
            <div className="flex-1 ml-64 p-8">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h1>
                    <p className="text-gray-500 mb-8">Share links to resources, notes, and worksheets</p>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col items-center justify-center text-center">
                        <div className="bg-indigo-50 p-4 rounded-full mb-4">
                            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Share a Link</h2>
                        
                        <form onSubmit={handleUpload} className="w-full max-w-lg space-y-4 mt-4">
                            <div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Document Title (e.g. Chapter 1 Notes)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="url"
                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                    placeholder="Valid URL (e.g. Google Drive Link)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all ${
                                    submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
                                }`}
                            >
                                {submitting ? 'Sharing...' : 'Share Material'}
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {documents.slice().reverse().map((doc, index) => (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}
                                key={doc.id} 
                                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between"
                            >
                                <div className="flex-1 overflow-hidden pr-2">
                                    <h3 className="text-base font-semibold text-gray-800 line-clamp-1" title={doc.title}>{doc.title}</h3>
                                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-500 hover:underline line-clamp-1 mt-1">
                                        {doc.fileUrl}
                                    </a>
                                    <p className="text-xs text-gray-400 mt-2">Added {format(new Date(doc.uploadedAt), 'MMM dd, yyyy')}</p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(doc.id)}
                                    className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                                    title="Remove document"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </motion.div>
                        ))}
                        {documents.length === 0 && (
                            <div className="md:col-span-2 text-center py-8 text-gray-500">
                                No materials shared yet.
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Documents;
