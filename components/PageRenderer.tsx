import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { PageData } from '../types';
import { motion } from 'framer-motion';

interface PageRendererProps {
  page: PageData;
  isActive: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    } 
  }
};

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
  isActive: boolean;
  width?: 'standard' | 'wide' | 'full';
}

export const ContentWrapper: FC<ContentWrapperProps> = ({ children, className = "", isActive, width = 'standard' }) => {
  const maxWidthClass = width === 'full' ? 'max-w-none px-4 sm:px-6 md:px-0' : width === 'wide' ? 'max-w-6xl px-4 sm:px-6 md:px-12' : 'max-w-4xl px-4 sm:px-6 md:px-8 lg:px-16';
  
  return (
    <motion.div 
      className={`relative z-10 w-full mx-auto flex flex-col justify-center h-full ${maxWidthClass} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

const PageRenderer: FC<PageRendererProps> = ({ page, isActive }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const isDark = page.surface === 'black';
  const textColor = isDark ? 'text-white' : 'text-ink';
  const bgColor = isDark ? 'bg-neutral-950' : 'bg-paper';
  
  // Helper to process line breaks with drop cap for first paragraph
  const renderBody = (text?: string, isTwoCol = false) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const isQuote = line.startsWith('—');
      // Drop cap on first paragraph if not a quote
      const isFirst = i === 0 && !isQuote;

      if (isFirst) {
         // Simple drop cap logic: separate first letter
         const firstChar = line.charAt(0);
         const rest = line.slice(1);
         return (
           <p key={i} className={`mb-6 leading-relaxed ${isTwoCol ? 'text-justify' : ''}`}>
             <span className="float-left text-5xl md:text-6xl font-serif leading-[0.8] mr-3 mt-1 text-gold">{firstChar}</span>
             {rest}
           </p>
         )
      }

      return (
        <p key={i} className={`mb-6 leading-relaxed ${isQuote ? 'mt-8 text-gold italic text-right' : ''} ${isTwoCol ? 'text-justify' : ''}`}>
          {line}
        </p>
      );
    });
  };

  // Background Image Layer
  const Background = () => {
    if (!page.bg) return null;
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
          style={{ 
            backgroundImage: `url('${page.bg}')`,
            transform: isActive ? 'scale(1.05)' : 'scale(1.0)' 
          }}
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-white/10'} backdrop-blur-[0px]`} />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 mix-blend-multiply pointer-events-none" />
      </div>
    );
  };

  // 1. HERO PAGE / COVER
  if (page.type === 'hero' || page.type === 'cover') {
    return (
      <section className={`relative w-full h-full flex items-center justify-center overflow-hidden ${bgColor} ${textColor}`}>
        <Background />
        <ContentWrapper isActive={isActive} className="items-center text-center">
          {page.masthead && (
            <motion.div variants={itemVariants} className="font-serif text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold mb-4 sm:mb-8 md:mb-12 border-b border-gold/40 pb-2">
              {page.masthead}
            </motion.div>
          )}
          
          <motion.h1 variants={itemVariants} className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight sm:leading-[0.95] md:leading-[0.85] mb-4 sm:mb-6 md:mb-8 lg:mb-10 tracking-tight break-words">
            {page.title}
          </motion.h1>

          {page.subtitle && (
            <motion.div variants={itemVariants} className="font-sans font-light text-base sm:text-lg md:text-2xl lg:text-3xl italic tracking-wide opacity-90 max-w-3xl mx-auto px-2">
              {page.subtitle}
            </motion.div>
          )}

          {page.body && (
            <motion.div variants={itemVariants} className="mt-6 sm:mt-8 md:mt-10 font-sans text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase opacity-80 border-t border-current pt-4 sm:pt-6 inline-block">
              {page.body}
            </motion.div>
          )}

          {page.pull && (
             <motion.div variants={itemVariants} className="mt-8 sm:mt-12 md:mt-16 lg:mt-24 font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl text-gold italic max-w-4xl leading-tight px-2">
               {page.pull}
             </motion.div>
          )}
        </ContentWrapper>
      </section>
    );
  }

  // 2. GRID PAGE
  if (page.type === 'grid') {
    return (
      <section className={`relative w-full h-full overflow-hidden flex items-center ${bgColor} ${textColor}`}>
        <ContentWrapper isActive={isActive} width="wide">
          {page.masthead && <motion.div variants={itemVariants} className="text-gold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 border-b border-gold/20 pb-3 sm:pb-4 inline-block">{page.masthead}</motion.div>}
          <motion.h2 variants={itemVariants} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 sm:mb-12 md:mb-16 break-words">{page.title}</motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-x-12 md:gap-y-12 w-full border-t border-current/20 pt-8 sm:pt-12">
            {page.grid?.map((item, idx) => {
               const [name, desc] = item.split('—').map(s => s.trim());
               return (
                 <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="group"
                 >
                   <div className="font-serif text-lg sm:text-xl md:text-2xl text-gold mb-2 group-hover:text-white transition-colors">{name}</div>
                   <div className="font-sans text-xs sm:text-sm font-medium tracking-widest uppercase opacity-60">{desc || name}</div>
                 </motion.div>
               )
            })}
          </div>

          {page.subtitle && <motion.p variants={itemVariants} className="mt-12 md:mt-16 font-sans font-light italic opacity-60 text-center w-full border-t border-current/10 pt-6 sm:pt-8 text-sm md:text-base">{page.subtitle}</motion.p>}
        </ContentWrapper>
      </section>
    );
  }

  // 3. PHOTO LAYOUT
  if (page.type === 'layout-photo') {
    return (
      <section className={`relative w-full h-full flex flex-col justify-end pb-12 sm:pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-16 ${bgColor} ${textColor}`}>
         <Background />
         <ContentWrapper isActive={isActive} className="!justify-end !mx-0 !px-0 max-w-4xl" width="wide">
            <motion.div variants={itemVariants} className="border-l-4 border-gold pl-4 sm:pl-6 md:pl-8 lg:pl-12 bg-black/20 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-12">
              {page.title && <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-4 sm:mb-5 md:mb-6 leading-tight sm:leading-[0.95] md:leading-[0.9] break-words">{page.title}</h2>}
              {page.subtitle && <div className="w-12 sm:w-14 md:w-16 h-1 bg-gold mb-4 sm:mb-5 md:mb-6"></div>}
              {page.subtitle && <p className="font-sans text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium">{page.subtitle}</p>}
            </motion.div>
         </ContentWrapper>
      </section>
    );
  }

  // 5. IMAGE REVEAL (image only with plus button overlay)
  if (page.type === 'image-reveal') {
    return (
      <section className={`relative w-full h-full overflow-hidden flex items-center justify-center ${bgColor} ${textColor}`}>
        {page.bg && (
          <>
            {/* Full-screen image background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${page.bg}')` }}
            />
            
            {/* Overlay that fades to reveal content */}
            <motion.div
              className="absolute inset-0 bg-black/30"
              animate={{ opacity: isRevealed ? 0 : 0.4 }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Plus button to reveal content */}
            {!isRevealed && (
              <motion.button
                onClick={() => setIsRevealed(true)}
                className="relative z-20 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
            )}
          </>
        )}
        
        {/* Content panel that slides up on reveal */}
        <motion.div
          className="relative z-10 w-full h-full flex items-end overflow-hidden"
          animate={{ y: isRevealed ? 0 : '100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContentWrapper isActive={isActive && isRevealed} className="!justify-end !mx-0 !px-0 max-w-4xl w-full" width="wide">
            <motion.div 
              className="border-t border-current/20 bg-black/70 backdrop-blur-md p-6 sm:p-8 md:p-12 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {page.title && <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 leading-tight">{page.title}</h2>}
              {page.subtitle && <div className="w-12 sm:w-14 md:w-16 h-1 bg-gold mb-4 sm:mb-5"></div>}
              {page.subtitle && <p className="font-sans text-xs sm:text-sm md:text-base tracking-[0.1em] sm:tracking-[0.15em] uppercase font-medium opacity-90 mb-4">{page.subtitle}</p>}
              {page.body && <p className="font-sans text-sm sm:text-base leading-relaxed opacity-80 max-w-2xl">{page.body}</p>}
            </motion.div>
          </ContentWrapper>
        </motion.div>
        
        {/* Close button when revealed */}
        {isRevealed && (
          <motion.button
            onClick={() => setIsRevealed(false)}
            className="absolute top-6 right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </section>
    );
  }

  // 4. STANDARD ARTICLE
  return (
    <section className={`relative w-full h-full flex items-center justify-center overflow-hidden ${bgColor} ${textColor}`}>
      <ContentWrapper isActive={isActive} width="wide">
          {page.masthead && (
            <motion.div variants={itemVariants} className="w-full flex justify-center mb-6 sm:mb-8">
               <div className="font-sans text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase text-gold border-b border-gold pb-2">
                 {page.masthead}
               </div>
            </motion.div>
          )}
          
          <div className="flex flex-col items-center text-center mb-6 sm:mb-10 md:mb-14">
            {page.title && (
              <motion.h2 variants={itemVariants} className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-4 sm:mb-6 leading-tight break-words">
                {page.title}
              </motion.h2>
            )}

            {page.subtitle && (
              <motion.div variants={itemVariants} className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl italic opacity-80 max-w-2xl px-2">
                {page.subtitle}
              </motion.div>
            )}
          </div>

          {/* RESPONSIVE LAYOUT: single column on mobile, two columns on lg+ screens */}
          <motion.div variants={itemVariants} className="lg:columns-2 gap-8 lg:gap-12 xl:gap-20 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose opacity-90 mx-auto max-w-5xl border-t border-current/20 pt-6 sm:pt-10">
            {renderBody(page.body, false)}
          </motion.div>

          {page.pull && (
            <motion.div variants={itemVariants} className="w-full mt-10 sm:mt-16 text-center">
               <span className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl italic text-gold leading-tight relative inline-block px-4 sm:px-8 md:px-12">
                 <span className="absolute top-0 left-0 text-4xl sm:text-5xl md:text-6xl opacity-30 leading-none">"</span>
                 {page.pull}
                 <span className="absolute bottom-0 right-0 text-4xl sm:text-5xl md:text-6xl opacity-30 leading-none">"</span>
               </span>
            </motion.div>
          )}
      </ContentWrapper>
    </section>
  );
};

export default PageRenderer;