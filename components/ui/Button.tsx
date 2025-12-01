import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  direction: 'left' | 'right';
  isDark?: boolean;
}

const Button: React.FC<ButtonProps> = ({ direction, isDark = false, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg
        ${isDark 
          ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40' 
          : 'bg-black/5 border-black/10 text-black hover:bg-black/10 hover:border-black/30'
        }
        ${className}
      `}
      {...props}
    >
      {direction === 'left' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      )}
    </motion.button>
  );
};

export default Button;