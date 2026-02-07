'use client';

import React, { useEffect, useState } from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectData {
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    image?: string;
}

const Projects = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                if (data.projects) {
                    setProjects(data.projects);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/10 relative z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <div className="h-1.5 w-20 bg-emerald-500 rounded-full mx-auto mb-6"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        A selection of my recent work, ranging from full-stack applications to IoT solutions.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col h-full"
                            >
                                <div className="h-48 bg-slate-900 relative overflow-hidden flex-shrink-0">
                                    {project.image ? (
                                        <div className="absolute inset-0">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent group-hover:scale-110 transition-transform duration-500"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.div
                                                    whileHover={{ rotate: 15 }}
                                                    className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-xl"
                                                >
                                                    <Code className="w-8 h-8 text-emerald-400" />
                                                </motion.div>
                                            </div>
                                        </>
                                    )}
                                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs font-medium text-emerald-400 shadow-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-900">
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium">
                                            <Github className="w-4 h-4 mr-2" />
                                            Code
                                        </a>
                                        {project.liveUrl && project.liveUrl !== "#" && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
