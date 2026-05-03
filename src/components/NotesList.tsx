import { useState } from 'react';
import { MOCK_NOTES } from '../types';
import { Search, Tag, Calendar, ExternalLink, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function NotesList() {
  const [search, setSearch] = useState('');
  const [selectedSource, setSelectedSource] = useState<'All' | 'Gemini' | 'NotebookLM'>('All');

  const filteredNotes = MOCK_NOTES.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                          note.content.toLowerCase().includes(search.toLowerCase());
    const matchesSource = selectedSource === 'All' || note.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-4">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">Global Archive</h2>
          <p className="text-xs text-slate-500">Aggregated Java notes and research snippets</p>
        </div>
        
        <div className="flex bg-slate-200/50 p-1 rounded-lg">
          {['All', 'Gemini', 'NotebookLM'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSource(s as any)}
              className={cn(
                "px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded-md",
                selectedSource === s ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      <div className="flex gap-4 items-center bg-white border border-slate-200 p-2 px-3 rounded-xl shadow-sm focus-within:border-indigo-300 transition-colors">
        <Search size={14} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Filter research, code blocks, and AI insights..." 
          className="flex-1 bg-transparent border-none outline-none font-sans text-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Filter size={14} className="text-slate-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="tech-card hover:border-indigo-200 transition-all group"
            >
              <div className="card-header bg-slate-50/50">
                <div className="flex gap-1.5">
                  <span className={cn(
                    "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                    note.source === 'Gemini' ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                  )}>
                    {note.source}
                  </span>
                  {note.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[9px] font-bold border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
                  <Calendar size={10} />
                  {note.date}
                </div>
              </div>
              
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-sm font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">{note.title}</h3>
                <div className="prose prose-sm max-w-none text-[11px] line-clamp-3 text-slate-500 leading-relaxed bg-slate-50 p-3 border-l-2 border-indigo-200 rounded-r-lg italic mb-4">
                  {note.content}
                </div>
                
                <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
                  <button className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                    Expand Details <ExternalLink size={10} />
                  </button>
                  <span className="text-[9px] font-bold text-slate-400">2M READ</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white border border-dashed border-slate-300 rounded-xl">
            <p className="text-xs text-slate-400 font-medium italic">No matches found in the archive.</p>
          </div>
        )}
      </div>
    </div>
  );
}
