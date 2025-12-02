import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pagesData } from './data';
import PageRenderer from './components/PageRenderer';
import Button from './components/ui/Button';
import TableOfContents from './components/TableOfContents';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right (next), -1 for left (prev)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard Navigation & Scroll Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMenuOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isMenuOpen, isTransitioning]);

  // Scroll Navigation
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = (e: WheelEvent) => {
      if (isMenuOpen || isTransitioning) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          nextPage(); // Scroll down = next page
        } else if (e.deltaY < 0) {
          prevPage(); // Scroll up = previous page
        }
      }, 100);
    };
    
    window.addEventListener('wheel', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, isMenuOpen, isTransitioning]);

  const paginate = (newDirection: number) => {
    if (isTransitioning) return; // Prevent rapid clicking disrupting the 3D animation
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < pagesData.length) {
      setIsTransitioning(true);
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  const nextPage = () => paginate(1);
  const prevPage = () => paginate(-1);
  
  const goToPage = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };
  
  // 3D Flip Variants
  // Mimics a book page turning hinged on the left spine
  const flipVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 0 : -180, // If Next: enter flat (behind). If Prev: enter flipped (from left).
      x: 0,
      opacity: 1,
      zIndex: direction > 0 ? 0 : 50, // Prev page comes on top
      scale: direction > 0 ? 0.95 : 1, // Slight depth effect for page behind
      transformOrigin: "left center",
      filter: direction > 0 ? "brightness(0.5)" : "brightness(1)", // Shadow effect
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }),
    center: {
      rotateY: 0,
      x: 0,
      zIndex: 10,
      opacity: 1,
      scale: 1,
      transformOrigin: "left center",
      filter: "brightness(1)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -180 : 0, // Exit to left (-180) or stay behind (0)
      x: 0,
      opacity: 1,
      zIndex: direction > 0 ? 50 : 0, // Old page stays on top if going Next
      scale: direction > 0 ? 1 : 0.95, // Page moving to back scales down
      transformOrigin: "left center",
      filter: direction > 0 ? "brightness(1)" : "brightness(0.5)", // Shadow effect
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    })
  };

  const progress = ((currentIndex + 1) / pagesData.length) * 100;
  const currentPageData = pagesData[currentIndex];
  const isDark = currentPageData.surface === 'black';

  return (
    <div 
      className="fixed inset-0 overflow-hidden bg-neutral-900 font-sans select-none" 
      ref={containerRef}
      style={{ perspective: '1500px' }} // Deep perspective for realistic 3D
    >
      {/* --- Viewport --- */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onAnimationComplete={() => setIsTransitioning(false)}
            drag="x"
            dragElastic={0.2}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                nextPage();
              } else if (info.offset.x > swipeThreshold) {
                prevPage();
              }
            }}
            className="absolute inset-0 w-full h-full shadow-2xl cursor-grab active:cursor-grabbing"
            style={{ 
              backfaceVisibility: 'hidden', // Hides the page when flipped > 90deg
              backgroundColor: isDark ? '#000' : '#FFF' // Ensures opaque background
            }}
          >
            <PageRenderer page={currentPageData} isActive={true} />
            
            {/* Spine Shadow Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20" />
            
            {/* Animated Shadow Overlay for depth during flip */}
            <motion.div 
               className="absolute inset-0 bg-black pointer-events-none z-30"
               initial={{ opacity: 0 }}
               animate={{ opacity: 0 }}
               exit={{ opacity: direction > 0 ? 0.3 : 0 }} // Darken slightly as it flips away
               transition={{ duration: 0.8 }}
            />
          </motion.div>
        </AnimatePresence>
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
          disabled={currentIndex === 0 || isTransitioning}
          isDark={isDark}
          className={`${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
        />
        <div className={`h-[1px] w-12 opacity-40 hidden md:block transition-colors ${isDark ? 'bg-white' : 'bg-black'}`} />
        <Button 
          direction="right" 
          onClick={nextPage} 
          disabled={currentIndex === pagesData.length - 1 || isTransitioning}
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
      
      {/* 5. Subtle Loading Indicator during Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="fixed top-0 left-0 w-full h-[2px] z-[60] overflow-hidden bg-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
               className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
               initial={{ x: '-100%', width: '50%' }}
               animate={{ x: '100%', width: '50%' }}
               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Brand Watermark (Rotated Left) */}
      <div className={`hidden lg:block fixed bottom-8 left-8 z-40 font-serif italic text-sm pointer-events-none transition-colors duration-500 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
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