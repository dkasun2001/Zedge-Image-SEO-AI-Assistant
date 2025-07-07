import React from 'react';
import { IconGitHub, IconLinkedIn } from './Icon';
import type { Page } from '../types';

interface FooterProps {
    setPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setPage }) => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between py-6 text-sm text-slate-400 gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <p>&copy; {new Date().getFullYear()} Zedge Image SEO AI Assistant.</p>
                        <nav className="flex gap-x-4">
                           <button onClick={() => setPage('home')} className="hover:text-white transition-colors">Home</button>
                           <button onClick={() => setPage('about')} className="hover:text-white transition-colors">About</button>
                           <button onClick={() => setPage('terms')} className="hover:text-white transition-colors">Terms & Conditions</button>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:inline">Developed by Dinusha Kasun</span>
                        <a href="https://github.com/zedge" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors">
                            <IconGitHub className="h-5 w-5" />
                        </a>
                        <a href="https://www.linkedin.com/company/zedge" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors">
                            <IconLinkedIn className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};