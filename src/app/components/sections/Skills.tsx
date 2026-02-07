'use client';

import React, { useEffect, useState } from 'react';
import { Code, Palette, Database, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillSet {
    category: string;
    items: string[];
}

const Skills = () => {
    const [skills, setSkills] = useState<SkillSet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch('/api/skills');
                const data = await response.json();
                if (data.skills) {
                    setSkills(data.skills);
                }
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const getIcon = (category: string) => {
        switch (category) {
            case "Programming Languages": return <Code size={24} />;
            case "Frontend Development": return <Palette size={24} />;
            case "Backend Development": return <Database size={24} />;
            case "Databases": return <Database size={24} />;
            default: return <Wrench size={24} />;
        }
    };

    return (
        <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/10 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        Technical Arsenal
                    </h2>
                    <div className="h-1.5 w-20 bg-emerald-500 rounded-full mx-auto mb-6"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        A comprehensive set of tools and technologies I use to bring ideas to life.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {skills.map((skillGroup, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>

                                <div className="flex items-center mb-6">
                                    <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400 mr-4">
                                        {getIcon(skillGroup.category)}
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{skillGroup.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((item, itemIdx) => (
                                        <span
                                            key={itemIdx}
                                            className="bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Skills;
