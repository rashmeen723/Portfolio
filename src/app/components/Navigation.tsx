'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
}

const Navigation = ({ isMenuOpen, setIsMenuOpen, activeSection, scrollToSection }: NavigationProps) => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 scroll-animate">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        RK
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {['Home', 'About', 'Projects', 'Skills', 'Achievements', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-lg ${activeSection === item.toLowerCase()
                                    ? 'text-emerald-400 bg-emerald-400/10 shadow-emerald-500/25'
                                    : 'text-slate-300 hover:text-emerald-400 shadow-slate-900 hover:shadow-emerald-500/20'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <a
                            href="/resume.pdf"
                            download="Rashmeen_Kavindya_CV.pdf"
                            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 text-white"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-300 hover:text-emerald-400 transition-all duration-300 p-2 rounded-md shadow-lg shadow-slate-900 hover:shadow-emerald-500/20"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-950 border-b border-slate-800 animate-fade-in">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {['Home', 'About', 'Projects', 'Skills', 'Achievements', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeSection === item.toLowerCase()
                                    ? 'text-emerald-400 bg-emerald-400/10'
                                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                        <a
                            href="/resume.pdf"
                            download
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-emerald-400 bg-emerald-400/10"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
