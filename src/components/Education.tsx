import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import data from '../data.json';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Education</h2>
              <div className="h-1 w-20 bg-emerald-500 rounded-full" />
            </motion.div>

            <div className="space-y-8">
              {data.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-1">
                    {edu.dates}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{edu.institution}</h3>
                  <div className="text-zinc-400 text-sm mb-2">{edu.degree}</div>
                  {edu.score && (
                    <div className="inline-block px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                      {edu.score}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Certifications</h2>
              <div className="h-1 w-20 bg-cyan-500 rounded-full" />
            </motion.div>

            <div className="grid gap-4">
              {data.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-4 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-zinc-300 font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Extra Section for Publications */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-white mb-6">Publications & Research</h3>
              <div className="space-y-4">
                {data.extra.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-2xl bg-zinc-900/30 border border-white/5"
                  >
                    <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-1">{item.type}</div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    {item.details && <p className="text-xs text-zinc-500">{item.details}</p>}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:underline mt-2 inline-block">
                        View Document
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
