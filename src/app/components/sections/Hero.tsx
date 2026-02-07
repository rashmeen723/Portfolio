'use client';

import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface HeroProps {
    scrollToSection: (sectionId: string) => void;
}

const Hero = ({ scrollToSection }: HeroProps) => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <section id="home" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="text-emerald-400 text-2xl font-medium">
                            Hello! I&apos;m
                        </motion.div>
                        <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold">
                            Rashmeen <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">Kavindya</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-xl text-slate-300 max-w-2xl">
                            Full-Stack Developer & IT Undergraduate at University of Moratuwa
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-slate-400 max-w-2xl leading-relaxed text-lg">
                            A passionate third-year undergraduate building secure, scalable, and user-friendly applications that create real-world impact.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 translate-y-0 hover:-translate-y-1 active:scale-95"
                            >
                                Contact Me
                            </button>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="border border-slate-700 hover:border-emerald-500/50 px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-emerald-400/5 shadow-lg shadow-slate-900 hover:shadow-emerald-500/10 translate-y-0 hover:-translate-y-1 active:scale-95"
                            >
                                View Projects
                            </button>

                        </motion.div>

                        <motion.div variants={itemVariants} className="flex space-x-4">
                            <a href="https://github.com/rashmeen723" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-all duration-300 p-2.5 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-emerald-500/50 shadow-lg">
                                <Github size={22} />
                            </a>
                            <a href="https://www.linkedin.com/in/rashmeen-kavindya-b1406b301" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-all duration-300 p-2.5 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-emerald-500/50 shadow-lg">
                                <Linkedin size={22} />
                            </a>
                            <a href="mailto:rashminkavindya2@gmail.com" className="text-slate-400 hover:text-emerald-400 transition-all duration-300 p-2.5 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-emerald-500/50 shadow-lg">
                                <Mail size={22} />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Profile Picture Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-slate-950 rounded-2xl p-8 border border-slate-800 backdrop-blur-xl w-full max-w-md shadow-2xl overflow-hidden">
                                {/* Background Decor */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>

                                <div className="flex flex-col items-center">
                                    <div className="w-56 h-56 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 flex items-center justify-center shadow-2xl relative p-1">
                                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                                            <img
                                                src="/images/profile.png"
                                                alt="Rashmeen Kavindya"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center space-y-3">
                                        <h3 className="text-3xl font-bold text-white tracking-tight">Rashmeen Kavindya</h3>
                                        <p className="text-emerald-400 font-medium lowercase tracking-wide text-lg">full-stack developer</p>
                                        <div className="h-px w-12 bg-slate-800 mx-auto my-4"></div>
                                        <p className="text-slate-400 text-base">University of Moratuwa</p>

                                        <div className="flex items-center justify-center space-x-2 pt-4">
                                            <div className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">Available now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
