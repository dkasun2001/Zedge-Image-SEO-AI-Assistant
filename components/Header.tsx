import React, { useState } from 'react';
import { IconPhotoSeo, IconMenu, IconX } from './Icon';
import type { Page } from '../types';

interface HeaderProps {
    page: Page;
    setPage: (page: Page) => void;
}

const NavLink: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    isMobile?: boolean;
}> = ({ active, onClick, children, isMobile }) => (
    <button
        onClick={onClick}
        className={`rounded-md font-medium transition-colors ${
            isMobile
                ? 'block w-full text-left px-3 py-2 text-base'
                : 'px-3 py-2 text-sm'
        } ${
            active
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
        }`}
    >
        {children}
    </button>
);


export const Header: React.FC<HeaderProps> = ({ page, setPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (targetPage: Page) => {
        setPage(targetPage);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-slate-900/70 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
                        <IconPhotoSeo className="h-8 w-8 text-cyan-400" />
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            Zedge Image SEO AI Assistant
                        </h1>
                    </div>
                    {/* Desktop Navigation */}
                     <nav className="hidden md:flex items-center space-x-2">
                        <NavLink active={page === 'home'} onClick={() => handleNavClick('home')}>Home</NavLink>
                        <NavLink active={page === 'guide'} onClick={() => handleNavClick('guide')}>How to Use</NavLink>
                        <NavLink active={page === 'about'} onClick={() => handleNavClick('about')}>About Us</NavLink>
                        <NavLink active={page === 'contact'} onClick={() => handleNavClick('contact')}>Contact Us</NavLink>
                    </nav>
                     {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <IconX className="block h-6 w-6" />
                            ) : (
                                <IconMenu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state. */}
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700/50">
                        <NavLink isMobile active={page === 'home'} onClick={() => handleNavClick('home')}>Home</NavLink>
                        <NavLink isMobile active={page === 'guide'} onClick={() => handleNavClick('guide')}>How to Use</NavLink>
                        <NavLink isMobile active={page === 'about'} onClick={() => handleNavClick('about')}>About Us</NavLink>
                        <NavLink isMobile active={page === 'contact'} onClick={() => handleNavClick('contact')}>Contact Us</NavLink>
                    </nav>
                </div>
            )}
        </header>
    );
};
