import type { FC } from 'react';
import { motion } from 'framer-motion';
import { PageData } from '../types';

interface ScrollablePageRendererProps {
  page: PageData;
  isActive: boolean;
}

const ScrollablePageRenderer: FC<ScrollablePageRendererProps> = ({ page, isActive }) => {
  const isDark = page.surface === 'black';
  const textColor = isDark ? 'text-white' : 'text-ink';
  const bgColor = isDark ? 'bg-neutral-950' : 'bg-paper';

  // Simple fallback layout for all pages
  return (
    <section className={`min-h-screen w-full ${bgColor} ${textColor} py-16 sm:py-20 md:py-24`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Masthead */}
        {page.masthead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold mb-6 sm:mb-8 border-b border-gold/20 pb-3 sm:pb-4 inline-block"
          >
            {page.masthead}
          </motion.div>
        )}

        {/* Title */}
        {page.title && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight break-words"
          >
            {page.title}
          </motion.h1>
        )}

        {/* Subtitle */}
        {page.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-serif text-lg sm:text-xl md:text-2xl italic opacity-70 mb-8 sm:mb-12 max-w-3xl leading-relaxed"
          >
            {page.subtitle}
          </motion.p>
        )}

        {/* Body with breathing space */}
        {page.body && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg leading-relaxed sm:leading-loose opacity-90 space-y-6 sm:space-y-8 max-w-3xl"
          >
            {page.body.split('\n\n').map((paragraph, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}

        {/* Pull quote */}
        {page.pull && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl mx-auto mt-12 sm:mt-16 md:mt-20 py-8 sm:py-12 border-t border-current/10 border-b"
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl italic text-gold text-center leading-relaxed">
              "{page.pull}"
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ScrollablePageRenderer;
