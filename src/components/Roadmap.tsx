import { JAVA_ROADMAP } from '../types';
import { Map, ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Roadmap() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">Java Learning Roadmap</h2>
          <p className="text-xs text-slate-500">Visualizing the java-developer-path from roadmap.sh</p>
        </div>
        <div className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-1 rounded uppercase tracking-wider">
          42% Complete
        </div>
      </header>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-slate-200 md:left-1/2" />

        <div className="space-y-6 relative">
          {JAVA_ROADMAP.map((node, index) => (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-col md:flex-row gap-8 items-center",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Node Marker */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-50 z-10 flex items-center justify-center border border-slate-200 rounded-full">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  node.status === 'completed' ? "bg-indigo-600" : node.status === 'in-progress' ? "bg-indigo-500 animate-pulse" : "bg-slate-300"
                )} />
              </div>

              {/* Content Card */}
              <div className="w-full md:w-[45%] pl-12 md:pl-0">
                <div className={cn(
                  "tech-card group hover:border-indigo-300 transition-all",
                  node.status === 'in-progress' && "border-indigo-600 ring-4 ring-indigo-50"
                )}>
                  <div className="card-header bg-slate-50/50">
                    <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">{node.category}</span>
                    {node.status === 'in-progress' && (
                      <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase">FOCUS</span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-800 mb-1">{node.label}</h3>
                    <p className="text-[11px] text-slate-500 leading-tight mb-4">{node.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <button className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 group/btn">
                        View Resources <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-medium text-slate-400 capitalize">{node.status}</span>
                        {node.status === 'completed' && <CheckCircle2 size={12} className="text-emerald-500" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
