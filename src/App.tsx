/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Chatbot } from './components/Chatbot';
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react';
import data from './data.json';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  if (loading) {
    return <SplashScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-400">
      <AnimatedBackground />
      <Navbar />
      
      <main>
        <Hero />
        <Experience />
        <Achievements />
        <Projects />
        <Skills />
        <Education />
      </main>

      <Chatbot />

      <footer className="py-20 px-6 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="text-3xl font-bold mb-6">
                VK<span className="text-emerald-500">.</span>
              </div>
              <p className="text-zinc-400 max-w-sm mb-8">
                Building the future of AI through robust engineering and innovative research.
              </p>
              <div className="flex gap-4">
                <a href={data.basics.links.github} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={data.basics.links.linkedin} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${data.basics.email}`} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold mb-4">Contact</h4>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-500" /> {data.basics.email}
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" /> {data.basics.phone}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" /> {data.basics.location}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Navigation</h4>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li><a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a></li>
                  <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a></li>
                  <li><a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a></li>
                  <li><a href="#education" className="hover:text-emerald-400 transition-colors">Education</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-center text-xs text-zinc-600 font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Vishwatej Khot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
