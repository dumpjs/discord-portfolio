'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Container for all rotating elements */}
            <div className="relative w-24 h-24">
              {/* Main circle */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Outer spinning ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/80"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Inner spinning ring */}
              <motion.div
                className="absolute inset-4 rounded-full border-4 border-transparent border-t-white/40 border-r-white/40"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: -360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Center dot */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-white rounded-full"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Loading text */}
            <motion.div
              className="mt-8 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-sm font-medium text-white/80">Carregando</div>
              <motion.div 
                className="flex gap-1"
                initial="start"
                animate="end"
                transition={{
                  staggerChildren: 0.2,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/60"
                    variants={{
                      start: { y: 0 },
                      end: { y: [-3, 0] }
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}