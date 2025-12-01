import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pagesData } from './data';
import ScrollablePageRenderer from './components/ScrollablePageRenderer';
import Button from './components/ui/Button';
import TableOfContents from './components/TableOfContents';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMenuOpen) return;
      if (e.key === 'ArrowDown' || e.key === ' ') {
        goToPage(currentIndex + 1);
      } else if (e.key === 'ArrowUp') {
        goToPage(currentIndex - 1);
      } else if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isMenuOpen]);

  // Scroll within page to show back-to-top button
  useEffect(() => {
    const handlePageScroll = () => {
      if (scrollableRef.current) {
        setShowBackToTop(scrollableRef.current.scrollTop > 300);
      }
    };
    
    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', handlePageScroll);
      return () => scrollableElement.removeEventListener('scroll', handlePageScroll);
    }
  }, []);

  const goToPage = (index: number) => {
    if (index >= 0 && index < pagesData.length) {
      setCurrentIndex(index);
      // Scroll to top of new page
      if (scrollableRef.current) {
        scrollableRef.current.scrollTop = 0;
      }
    }
  };

  const nextPage = () => goToPage(currentIndex + 1);
  const prevPage = () => goToPage(currentIndex - 1);

  const scrollToTop = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progress = ((currentIndex + 1) / pagesData.length) * 100;
  const currentPageData = pagesData[currentIndex];
  const isDark = currentPageData.surface === 'black';

  return (
    <div 
      className="fixed inset-0 overflow-hidden bg-neutral-900 font-sans" 
      ref={containerRef}
    >
      {/* --- Main Scrollable Viewport --- */}
      <div 
        ref={scrollableRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {/* Page Content */}
        <ScrollablePageRenderer page={currentPageData} isActive={true} />
      </div>

      {/* --- UI Overlays --- */}
      
      {/* 1. Menu Button (Top Left) */}
      <div className="fixed top-6 left-6 z-50">
         <button 
           onClick={() => setIsMenuOpen(true)}
           className={`group flex items-center gap-3 transition-colors ${isDark ? 'text-white hover:text-gold' : 'text-black hover:text-gold'}`}
         >
            <div className={`p-2 border rounded-full backdrop-blur-sm transition-colors ${isDark ? 'border-white/30 bg-black/20 group-hover:border-gold' : 'border-black/10 bg-white/40 group-hover:border-gold'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </div>
            <span className="hidden md:block font-serif tracking-widest text-xs font-bold shadow-sm">MENU</span>
         </button>
      </div>

      {/* 2. Progress Counter (Top Right) */}
      <div className={`fixed top-8 right-8 z-50 font-sans text-xs tracking-[0.2em] font-medium pointer-events-none transition-colors duration-500 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
        {String(currentIndex + 1).padStart(2, '0')} — {String(pagesData.length).padStart(2, '0')}
      </div>

      {/* 3. Navigation Buttons (Bottom Center) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-6 items-center">
        <Button 
          direction="left" 
          onClick={prevPage} 
          disabled={currentIndex === 0}
          isDark={isDark}
          className={`${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
        />
        <div className={`h-[1px] w-12 opacity-40 hidden md:block transition-colors ${isDark ? 'bg-white' : 'bg-black'}`} />
        <Button 
          direction="right" 
          onClick={nextPage} 
          disabled={currentIndex === pagesData.length - 1}
          isDark={isDark}
          className={`${currentIndex === pagesData.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
        />
      </div>

      {/* 4. Reading Progress Bar (Top) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <motion.div 
          className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* 5. Back to Top Button (Bottom Right) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm border ${isDark ? 'border-white/30 bg-black/20 hover:border-gold text-white' : 'border-black/10 bg-white/40 hover:border-gold text-black'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 6. Brand Watermark (Bottom Left) */}
      <div className={`fixed bottom-8 left-8 z-40 font-serif italic text-sm pointer-events-none transition-colors duration-500 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
        Icons of Influence
      </div>

      {/* --- Table of Contents Overlay --- */}
      <TableOfContents 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        pages={pagesData}
        onSelectPage={goToPage}
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default App;