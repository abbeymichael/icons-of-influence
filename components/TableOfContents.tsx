import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageData } from '../types';

interface TableOfContentsProps {
  isOpen: boolean;
  onClose: () => void;
  pages: PageData[];
  onSelectPage: (index: number) => void;
  currentIndex: number;
}

const overlayVariants = {
  closed: { opacity: 0, pointerEvents: 'none' as const },
  open: { opacity: 1, pointerEvents: 'auto' as const, transition: { duration: 0.4 } }
};

const menuVariants = {
  closed: { x: '-100%' },
  open: { x: '0%', transition: { type: "spring" as const, stiffness: 300, damping: 30 } }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ isOpen, onClose, pages, onSelectPage, currentIndex }) => {
  // Filter pages to show in TOC to avoid clutter (e.g., skip pure visual pages without titles or generic ones)
  // For now, we list all pages but style them compactly.
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] flex"
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          
          {/* Menu Panel */}
          <motion.div 
            className="relative w-full max-w-md h-full bg-paper text-ink shadow-2xl overflow-hidden flex flex-col"
            variants={menuVariants}
          >
            <div className="p-8 border-b border-black/10 flex justify-between items-center bg-white z-10">
              <h2 className="font-serif text-2xl font-bold tracking-wider">INDEX</h2>
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
              <motion.ul 
                className="space-y-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {pages.map((page, idx) => {
                  const label = page.masthead || page.title || `Page ${idx + 1}`;
                  const isCurrent = idx === currentIndex;
                  
                  return (
                    <motion.li key={idx} variants={itemVariants}>
                      <button 
                        onClick={() => { onSelectPage(idx); onClose(); }}
                        className={`text-left w-full group flex items-baseline gap-4 py-2 border-b border-dashed border-black/10 hover:border-gold transition-colors ${isCurrent ? 'text-gold' : 'text-neutral-600'}`}
                      >
                        <span className="font-sans text-xs font-bold w-6 shrink-0 opacity-50">{String(idx + 1).padStart(2, '0')}</span>
                        <span className={`font-serif text-lg leading-tight group-hover:text-black transition-colors ${isCurrent ? 'font-bold' : ''}`}>
                          {label.length > 35 ? label.substring(0, 35) + '...' : label}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
            
            <div className="p-6 bg-neutral-50 border-t border-black/5 text-center">
              <p className="font-sans text-[10px] tracking-widest uppercase text-neutral-400">Icons of Influence — Lifestyle Edition</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TableOfContents;