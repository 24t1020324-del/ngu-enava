import { JAVA_ROADMAP, MOCK_NOTES } from '../types';
import { ExternalLink, CheckCircle2, Clock, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Summary() {
  const completedNodes = JAVA_ROADMAP.filter(n => n.status === 'completed');
  const inProgressNodes = JAVA_ROADMAP.filter(n => n.status === 'in-progress');

  return (
    <div className="space-y-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">Learning Analytics</h2>
          <p className="text-xs text-slate-500">Aggregated performance across 3 primary sources</p>
        </div>
        <div className="flex gap-2">
          {[
            { label: 'roadmap.sh', url: 'https://roadmap.sh/java' },
            { label: 'NotebookLM', url: 'https://notebooklm.google.com/notebook/7daeff8f-bc3d-4bf8-b015-f9956cde82b8' },
            { label: 'Gemini', url: 'https://gemini.google.com/share/c50efa84cbe1' }
          ].map(source => (
            <a 
              key={source.label} 
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-[9px] px-2 py-1 bg-white border border-slate-200 rounded text-slate-500 font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              {source.label} <ExternalLink size={8} />
            </a>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-900 rounded-xl p-4 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] uppercase opacity-60 font-bold tracking-widest mb-1">Modules Mastery</p>
            <h3 className="text-3xl font-bold">{completedNodes.length}</h3>
            <p className="text-[10px] opacity-80 mt-1 uppercase font-medium">Completed units</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white opacity-5 rounded-full group-hover:scale-110 transition-transform" />
          <CheckCircle2 size={16} className="absolute top-4 right-4 opacity-30" />
        </div>

        <div className="tech-card">
          <div className="p-4">
            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mb-1">Active Focus</p>
            <h3 className="text-3xl font-bold text-slate-800">{inProgressNodes.length}</h3>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              <p className="text-[10px] text-slate-500 font-medium">Currently in-progress</p>
            </div>
          </div>
          <Clock size={16} className="absolute top-4 right-4 text-slate-200" />
        </div>

        <div className="tech-card">
          <div className="p-4">
            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mb-1">Knowledge Base</p>
            <h3 className="text-3xl font-bold text-slate-800">{MOCK_NOTES.length}</h3>
            <p className="text-[10px] text-slate-500 font-medium mt-2">Synchronized artifacts</p>
          </div>
          <BookOpen size={16} className="absolute top-4 right-4 text-slate-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
        <section className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="tech-card h-full">
            <div className="card-header">
              <h4 className="card-title">Focus Path</h4>
              <span className="text-[10px] font-bold text-indigo-600">ROADMAP.SH</span>
            </div>
            <div className="p-2 space-y-1">
              {JAVA_ROADMAP.slice(0, 5).map(node => (
                <div key={node.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                    node.status === 'completed' ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                  )}>
                    {node.status === 'completed' && <CheckCircle2 size={10} className="text-white" />}
                    {node.status === 'in-progress' && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-[11px] font-bold text-slate-700 truncate">{node.label}</h5>
                    <p className="text-[10px] text-slate-400 truncate tracking-tight">{node.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="col-span-12 md:col-span-8">
          <div className="tech-card">
            <div className="card-header">
              <h4 className="card-title">Aggregated Activity Feed</h4>
              <button className="text-[10px] font-bold text-indigo-600 hover:underline px-2">VIEW ALL</button>
            </div>
            <div className="p-1">
              {MOCK_NOTES.map(note => (
                <div key={note.id} className="data-row hover:bg-indigo-50/50 group">
                  <div className={cn(
                    "w-1 h-8 rounded-full shrink-0 mr-4",
                    note.source === 'Gemini' ? "bg-blue-400" : "bg-emerald-400"
                  )} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[11px] font-bold text-slate-800">{note.title}</span>
                      <span className="text-[9px] font-medium text-slate-400 uppercase">{note.date}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1 italic italic leading-tight">
                      {note.content}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {note.source.toUpperCase()}
                    </span>
                    <ArrowRight size={10} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
