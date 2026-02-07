'use client';

import React from 'react';
import { Database, Code, BookOpen, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <div className="h-1.5 w-20 bg-emerald-500 rounded-full mx-auto"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            I am a third-year IT undergraduate at the University of Moratuwa with a deep passion for
                            crafting elegant solutions to complex problems. My journey in tech is driven by an
                            insatiable curiosity and a commitment to building software that matters.
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            I specialize in full-stack development, with a focus on creating secure, scalable, and
                            highly performant web applications. When I&apos;m not coding, I&apos;m likely exploring
                            new design patterns or contributing to open-source projects.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-8">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-emerald-400 mb-2"><BookOpen size={24} /></div>
                                <h4 className="text-white font-semibold">Continuous Learning</h4>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-emerald-400 mb-2"><Target size={24} /></div>
                                <h4 className="text-white font-semibold">Goal Oriented</h4>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all group">
                            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 w-fit mb-6 group-hover:scale-110 transition-transform">
                                <Database size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Education</h3>
                            <p className="text-slate-400 text-sm mb-1 font-medium">BSc in IT & Management</p>
                            <p className="text-slate-500 text-xs">University of Moratuwa</p>
                        </div>

                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all group sm:mt-12">
                            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 w-fit mb-6 group-hover:scale-110 transition-transform">
                                <Code size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Focus Areas</h3>
                            <ul className="space-y-2">
                                {["Full-Stack Dev", "UI/UX Design", "AI/ML"].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-300 text-sm">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
