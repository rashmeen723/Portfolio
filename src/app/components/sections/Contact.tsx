'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle, Copy } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('rashminkavindya2@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setStatus('success');
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent scroll-animate">
                        Get In Touch
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg scroll-animate" data-delay="100">
                        Have a project in mind or just want to chat? Feel free to reach out. I&apos;m always open to new opportunities!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info & Socials */}
                    <div className="space-y-8 scroll-animate" data-delay="200">
                        <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800 backdrop-blur-sm shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center group">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 mr-4 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-slate-500 mb-1">Email</p>
                                        <p className="text-slate-200 font-medium">rashminkavindya2@gmail.com</p>
                                    </div>
                                    <button
                                        onClick={handleCopyEmail}
                                        className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
                                        title="Copy Email"
                                    >
                                        {copied ? <CheckCircle size={18} className="text-emerald-400" /> : <Copy size={18} />}
                                    </button>
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    {[
                                        { href: "https://www.linkedin.com/in/rashmeen-kavindya-b1406b301", icon: Linkedin, label: "LinkedIn" },
                                        { href: "https://github.com/rashmeen723", icon: Github, label: "GitHub" }
                                    ].map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-slate-800 rounded-lg text-slate-300 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg"
                                            aria-label={social.label}
                                        >
                                            <social.icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-green-600/5 rounded-lg border border-emerald-500/20">
                            <h4 className="font-semibold text-emerald-400 mb-2">Available for Work</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                I am currently looking for internship or full-stack development opportunities. Let&apos;s build something amazing together!
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800 backdrop-blur-sm shadow-lg scroll-animate" data-delay="300">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                                    placeholder="Hello! I'd love to talk about..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full flex items-center justify-center px-8 py-3 rounded-md text-white font-medium transition-all duration-300 shadow-lg ${status === 'success'
                                    ? 'bg-emerald-500'
                                    : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-emerald-500/25 hover:shadow-emerald-500/40'
                                    }`}
                            >
                                {status === 'loading' ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : status === 'success' ? (
                                    <div className="flex items-center">
                                        <CheckCircle size={20} className="mr-2" />
                                        Sent Successfully!
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <Send size={18} className="mr-2" />
                                        Send Message
                                    </div>
                                )}
                            </button>

                            {status === 'error' && (
                                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
