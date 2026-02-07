'use client';

import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-950 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-900 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand & Tagline */}
                    <div className="space-y-4">
                        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            RK
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Building impactful digital experiences with modern web technologies. Focus on security, scalability, and performance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials & Back to Top */}
                    <div className="flex flex-col items-start md:items-end space-y-6">
                        <div className="flex space-x-4">
                            {[
                                { href: "https://github.com/rashmeen723", icon: Github },
                                { href: "https://www.linkedin.com/in/rashmeen-kavindya-b1406b301", icon: Linkedin },
                                { href: "mailto:rashminkavindya2@gmail.com", icon: Mail }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-slate-900 rounded-lg text-slate-400 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="group flex items-center text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                        >
                            <span className="mr-2">Back to top</span>
                            <div className="p-2 bg-slate-900 rounded-md border border-slate-800 group-hover:border-emerald-500/50 transition-all">
                                <ArrowUp size={16} />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-slate-500 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} Rashmeen Kavindya. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-xs flex items-center">
                        Built with
                        <span className="mx-1 text-emerald-400/80">Next.js</span> •
                        <span className="mx-1 text-emerald-400/80">Tailwind</span> •
                        <span className="mx-1 text-emerald-400/80">Framer Motion</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
