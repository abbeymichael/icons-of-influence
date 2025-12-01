import type { FC, ReactNode } from 'react';
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
  const maxWidthClass = width === 'full' ? 'max-w-none px-0' : width === 'wide' ? 'max-w-6xl px-6 md:px-12' : 'max-w-4xl px-8 md:px-16';
  
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
            <motion.div variants={itemVariants} className="font-serif text-xs md:text-sm tracking-[0.4em] uppercase text-gold mb-8 md:mb-12 border-b border-gold/40 pb-2">
              {page.masthead}
            </motion.div>
          )}
          
          <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.85] mb-8 md:mb-10 tracking-tight">
            {page.title}
          </motion.h1>

          {page.subtitle && (
            <motion.div variants={itemVariants} className="font-sans font-light text-lg md:text-3xl italic tracking-wide opacity-90 max-w-3xl mx-auto">
              {page.subtitle}
            </motion.div>
          )}

          {page.body && (
            <motion.div variants={itemVariants} className="mt-10 font-sans text-xs md:text-sm tracking-[0.2em] uppercase opacity-80 border-t border-current pt-6 inline-block">
              {page.body}
            </motion.div>
          )}

          {page.pull && (
             <motion.div variants={itemVariants} className="mt-16 md:mt-24 font-serif text-3xl md:text-5xl text-gold italic max-w-4xl leading-tight">
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
          {page.masthead && <motion.div variants={itemVariants} className="text-gold text-xs tracking-[0.3em] uppercase mb-6 border-b border-gold/20 pb-4 inline-block">{page.masthead}</motion.div>}
          <motion.h2 variants={itemVariants} className="font-serif text-5xl md:text-7xl mb-12 md:mb-16">{page.title}</motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 w-full border-t border-current/20 pt-12">
            {page.grid?.map((item, idx) => {
               const [name, desc] = item.split('—').map(s => s.trim());
               return (
                 <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="group"
                 >
                   <div className="font-serif text-2xl text-gold mb-2 group-hover:text-white transition-colors">{name}</div>
                   <div className="font-sans text-xs font-medium tracking-widest uppercase opacity-60">{desc || name}</div>
                 </motion.div>
               )
            })}
          </div>

          {page.subtitle && <motion.p variants={itemVariants} className="mt-16 font-sans font-light italic opacity-60 text-center w-full border-t border-current/10 pt-8">{page.subtitle}</motion.p>}
        </ContentWrapper>
      </section>
    );
  }

  // 3. PHOTO LAYOUT
  if (page.type === 'layout-photo') {
    return (
      <section className={`relative w-full h-full flex flex-col justify-end pb-24 md:pb-32 px-8 md:px-16 ${bgColor} ${textColor}`}>
         <Background />
         <ContentWrapper isActive={isActive} className="!justify-end !mx-0 !px-0 max-w-4xl" width="wide">
            <motion.div variants={itemVariants} className="border-l-4 border-gold pl-8 md:pl-12 bg-black/20 backdrop-blur-md p-8 md:p-12">
              {page.title && <h2 className="font-serif text-5xl md:text-8xl mb-6 leading-[0.9]">{page.title}</h2>}
              {page.subtitle && <div className="w-16 h-1 bg-gold mb-6"></div>}
              {page.subtitle && <p className="font-sans text-sm md:text-lg tracking-[0.2em] uppercase font-medium">{page.subtitle}</p>}
            </motion.div>
         </ContentWrapper>
      </section>
    );
  }

  // 4. STANDARD ARTICLE
  return (
    <section className={`relative w-full h-full flex items-center justify-center overflow-hidden ${bgColor} ${textColor}`}>
      <ContentWrapper isActive={isActive} width="wide">
          {page.masthead && (
            <motion.div variants={itemVariants} className="w-full flex justify-center mb-8">
               <div className="font-sans text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gold border-b border-gold pb-2">
                 {page.masthead}
               </div>
            </motion.div>
          )}
          
          <div className="flex flex-col items-center text-center mb-10 md:mb-14">
            {page.title && (
              <motion.h2 variants={itemVariants} className="font-serif text-5xl md:text-8xl mb-6 leading-none">
                {page.title}
              </motion.h2>
            )}

            {page.subtitle && (
              <motion.div variants={itemVariants} className="font-serif text-xl md:text-2xl italic opacity-80 max-w-2xl">
                {page.subtitle}
              </motion.div>
            )}
          </div>

          {/* TWO COLUMN LAYOUT for VOGUE STYLE */}
          <motion.div variants={itemVariants} className="md:columns-2 gap-12 lg:gap-20 font-sans font-light text-base md:text-lg leading-loose opacity-90 mx-auto max-w-5xl border-t border-current/20 pt-10">
            {renderBody(page.body, true)}
          </motion.div>

          {page.pull && (
            <motion.div variants={itemVariants} className="w-full mt-16 text-center">
               <span className="font-serif text-3xl md:text-5xl italic text-gold leading-tight relative inline-block px-12">
                 <span className="absolute top-0 left-0 text-6xl opacity-30">“</span>
                 {page.pull}
                 <span className="absolute bottom-0 right-0 text-6xl opacity-30">”</span>
               </span>
            </motion.div>
          )}
      </ContentWrapper>
    </section>
  );
};

export default PageRenderer;