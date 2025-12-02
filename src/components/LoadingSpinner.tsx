import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative mb-8 w-24 h-24 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-brand/20 border-t-brand rounded-full"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="h-8 w-8 text-brand animate-pulse" />
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          AI is Crafting Your Letter...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-muted-foreground mb-8"
        >
          Analyzing keywords, selecting tone, and generating content.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 max-w-md mx-auto"
        >
          <div className="bg-secondary rounded-lg shadow p-4 border border-border">
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li className="flex items-center"><Sparkles className="h-4 w-4 mr-2 text-brand/70"/>Analyzing context...</li>
              <li className="flex items-center"><Sparkles className="h-4 w-4 mr-2 text-brand/70"/>Generating content...</li>
              <li className="flex items-center"><Sparkles className="h-4 w-4 mr-2 text-brand/70"/>Formatting letter...</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
