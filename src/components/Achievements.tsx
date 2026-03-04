import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Star } from 'lucide-react';
import data from '../data.json';

export const Achievements: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Key Achievements</h2>
          <p className="text-zinc-400">Recognition and milestones in my professional journey.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  {index === 0 ? <Trophy className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2">
                    {achievement.type}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {achievement.title}
                  </h3>
                  <p className="text-zinc-400">
                    {achievement.context}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-around gap-8 text-center"
        >
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">40%</div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Effort Reduction</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">80%</div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">API Drift Reduction</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">35%</div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Clinical Review Reduction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
