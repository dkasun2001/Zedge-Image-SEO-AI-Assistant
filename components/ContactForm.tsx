import React, { useState, useMemo } from 'react';
import { IconSend, IconCheck, IconExclamationTriangle } from './Icon';
import { MiniSpinner } from './Spinner';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const ContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    
    const isFormValid = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return name.trim() !== '' && emailRegex.test(email) && message.trim() !== '';
    }, [name, email, message]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setStatus('sending');
        setError(null);

        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In a real application, you would send the data to a backend server.
        // For this demo, we'll just log it and show a success message.
        try {
            console.log({ name, email, message });
            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
            setTimeout(() => setStatus('idle'), 5000); // Reset after 5 seconds
        } catch (err) {
            setStatus('error');
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                        placeholder="you@example.com"
                        required
                    />
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    placeholder="How can we help you?"
                    required
                ></textarea>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={!isFormValid || status === 'sending'}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                    {status === 'sending' ? (
                        <>
                            <MiniSpinner />
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <IconSend className="h-5 w-5" />
                            <span>Send Message</span>
                        </>
                    )}
                </button>
            </div>
            {status === 'success' && (
                <div className="flex items-center space-x-2 text-sm text-green-400 p-3 bg-green-500/10 rounded-md">
                    <IconCheck className="h-5 w-5 flex-shrink-0" />
                    <span>Your message has been sent successfully! We'll be in touch soon.</span>
                </div>
            )}
            {status === 'error' && error && (
                <div className="flex items-center space-x-2 text-sm text-red-400 p-3 bg-red-500/10 rounded-md">
                    <IconExclamationTriangle className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </form>
    );
};