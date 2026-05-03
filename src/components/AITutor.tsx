import { useState, useRef, useEffect } from 'react';
import { askGemini } from '../lib/gemini';
import { Send, Bot, User, Trash2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { JAVA_ROADMAP, MOCK_NOTES } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your Java Mastery AI. I have access to your Java Roadmap and personal notes. How can I help you accelerate your learning today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const context = `The user is currently studying: ${JAVA_ROADMAP.filter(n => n.status !== 'pending').map(n => n.label).join(', ')}. Recent notes include: ${MOCK_NOTES.map(n => n.title).join(', ')}.`;
    const response = await askGemini(userMessage, context);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const generateStudyPlan = async () => {
    if (selectedTopics.length === 0) return;
    
    setIsGeneratingPlan(true);
    const topics = JAVA_ROADMAP.filter(n => selectedTopics.includes(n.id)).map(n => n.label).join(', ');
    
    // Aggregate user context: roadmap progress + notes
    const completedTopics = JAVA_ROADMAP.filter(n => n.status === 'completed').map(n => n.label).join(', ');
    const noteContext = MOCK_NOTES.map(n => `- ${n.title}: ${n.content.substring(0, 100)}...`).join('\n');

    const prompt = `Create a high-intensity study session plan for these Java topics: ${topics}. 

    User Context:
    - Mastered so far: ${completedTopics || 'None yet'}
    - Research context from their notes:
    ${noteContext}

    Include:
    1. A 60-minute time breakdown.
    2. 3 core architecture questions connecting these topics to their stored notes.
    3. 1 coding challenge idea.
    4. Related concepts to refresh.`;

    setMessages(prev => [...prev, { role: 'user', content: `Analyze my progress and build a study plan for: ${topics}` }]);
    
    const response = await askGemini(prompt, `Focus: ${topics}`);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsGeneratingPlan(false);
    setSelectedTopics([]);
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "Chat cleared. Ready for your next question!" }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] space-y-4">
      <header className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">AI Research Assistant</h2>
          <p className="text-xs text-slate-500">Architecture reviews and concept deep-dives</p>
        </div>
        <button 
          onClick={clearChat}
          className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors rounded-lg"
          title="Clear Chat"
        >
          <Trash2 size={16} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Topic Selector Sidebar */}
        <aside className="md:col-span-4 tech-card bg-white h-full flex flex-col">
          <div className="card-header shrink-0">
            <h3 className="card-title">Study Planner</h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Select Roadmap Topics</p>
            {JAVA_ROADMAP.map(node => (
              <button
                key={node.id}
                onClick={() => toggleTopic(node.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border text-[11px] transition-all",
                  selectedTopics.includes(node.id) 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100" 
                    : "bg-white border-slate-100 text-slate-600 hover:border-indigo-200"
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold truncate">{node.label}</span>
                  {selectedTopics.includes(node.id) && <Sparkles size={10} className="text-indigo-200" />}
                </div>
                <p className={cn(
                  "text-[9px] mt-1 line-clamp-1",
                  selectedTopics.includes(node.id) ? "opacity-70" : "opacity-40"
                )}>{node.category}</p>
              </button>
            ))}
          </div>
          <div className="p-3 bg-slate-50 border-t border-slate-200">
            <button
              onClick={generateStudyPlan}
              disabled={selectedTopics.length === 0 || isGeneratingPlan}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-indigo-100 disabled:opacity-50 transition-all hover:bg-indigo-700"
            >
              {isGeneratingPlan ? "Synthesizing..." : "Generate Session Plan"}
            </button>
          </div>
        </aside>

        {/* Chat Interface */}
        <section className="md:col-span-8 tech-card bg-white h-full flex flex-col relative overflow-hidden">
          <div className="card-header shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Active Session</span>
            </div>
            <Sparkles size={12} className="text-indigo-400" />
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
          >
            <AnimatePresence initial={false}>
              {messages.map((message, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3 max-w-[90%]",
                    message.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 flex items-center justify-center shrink-0 rounded transition-colors",
                    message.role === 'user' ? "bg-white border border-slate-200" : "bg-indigo-600 text-white"
                  )}>
                    {message.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  
                  <div className={cn(
                    "p-3 rounded-xl text-xs leading-relaxed border transition-shadow shadow-sm",
                    message.role === 'user' 
                      ? "bg-indigo-600 text-white border-indigo-700 rounded-tr-none" 
                      : "bg-white border-indigo-100 text-slate-700 rounded-tl-none ring-1 ring-indigo-50"
                  )}>
                    <div className="prose prose-sm prose-slate max-w-none text-[11px]">
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {(isLoading || isGeneratingPlan) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-indigo-600 text-white rounded shrink-0">
                  <Loader2 size={12} className="animate-spin" />
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl rounded-tl-none text-[11px] font-medium text-slate-400 italic">
                  Compiling study nodes...
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-200">
            <div className="relative flex gap-2">
              <input 
                type="text"
                placeholder="Message your tutor..."
                className="flex-1 bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-sans text-xs outline-none focus:ring-2 ring-indigo-100 focus:border-indigo-300 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-[9px] text-slate-400 font-medium italic flex items-center gap-1">
              <AlertCircle size={10} /> Research responses may contain inaccuracies.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
