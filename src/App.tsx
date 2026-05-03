/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Map, 
  NotebookPen, 
  Sparkles, 
  Coffee,
  ChevronRight,
  Github,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from './lib/utils';

// Pages
import Summary from './components/Summary';
import Roadmap from './components/Roadmap';
import NotesList from './components/NotesList';
import AITutor from './components/AITutor';

function AppContent() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { name: 'Summary', path: '/', icon: LayoutDashboard },
    { name: 'Roadmap', path: '/roadmap', icon: Map },
    { name: 'Notes', path: '/notes', icon: NotebookPen },
    { name: 'AI Tutor', path: '/ai', icon: Sparkles },
  ];

  return (
    <div className={cn("dashboard-grid", isDarkMode && "dark bg-slate-950 text-white")}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="flex items-center gap-3 mb-2 px-2">
          <div className="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold shrink-0">
            Σ
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-slate-800 text-sm">AGGR.WORKSPACE</h1>
            <p className="text-[10px] text-slate-400 uppercase font-medium">Java Mastery</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 transition-all rounded-lg group relative",
                location.pathname === item.path 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <item.icon size={16} className={cn(location.pathname === item.path ? "text-indigo-600" : "text-slate-400")} />
              <span className="font-semibold text-[13px]">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-4">
          <div className="bg-slate-50 rounded-xl p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Learning Step</span>
              <span className="text-[10px] font-bold text-indigo-600">42%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "42%" }}
                className="h-full bg-indigo-600" 
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between px-2 text-slate-400">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <div className="flex gap-1">
              <span className="text-[9px] font-medium text-emerald-500">● ONLINE</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="max-w-5xl mx-auto"
          >
            <Routes location={location}>
              <Route path="/" element={<Summary />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/notes" element={<NotesList />} />
              <Route path="/ai" element={<AITutor />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
