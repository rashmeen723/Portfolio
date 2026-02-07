'use client';

import React from 'react';
import { Award, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const achievements = [
    {
        title: "Hackelite 2.0 (2025) - Finalist",
        description: "Selected as a finalist in Hackelite 2.0 organized by IEEE Student Branch, University of Moratuwa.",
        date: "2025",
        icon: Trophy
    },
    {
        title: "Code with WIE - Participant",
        description: "Actively participated in the Code with WIE program, enhancing problem-solving and collaboration skills through coding challenges.",
        date: "2025",
        icon: Award
    }
];

const Achievements = () => {
    return (
        <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        Achievements
                    </h2>
                    <div className="h-1.5 w-20 bg-emerald-500 rounded-full mx-auto mb-6"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Recognition and milestones that mark my professional growth and academic excellence.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full relative group overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                    <achievement.icon size={24} />
                                </div>
                                <span className="text-emerald-500/80 text-xs font-bold uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                                    {achievement.date}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                {achievement.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                                {achievement.description}
                            </p>
                        </motion.div>
                    ))}

                    {/* Decorative Placeholder Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex bg-slate-900/10 rounded-2xl p-8 border border-slate-800/30 border-dashed items-center justify-center text-center"
                    >
                        <div className="space-y-2">
                            <Star className="w-8 h-8 text-slate-700 mx-auto mb-2 opacity-50" />
                            <p className="text-slate-600 text-sm font-medium italic">More projects & awards in progress...</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
