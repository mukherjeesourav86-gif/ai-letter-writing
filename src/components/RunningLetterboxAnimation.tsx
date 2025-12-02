import React from 'react';
import { motion } from 'framer-motion';
import { Mailbox, Mail } from 'lucide-react';

const RunningLetterboxAnimation: React.FC = () => {
  return (
    <motion.div
      className="absolute top-24 left-0 z-40 flex items-center"
      style={{ x: '-200px' }} // Start off-screen
      animate={{
        x: '100vw', // Fly across the screen
        y: [0, -5, 0, 5, 0], // Subtle bobbing motion
      }}
      transition={{
        x: {
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
          delay: 1,
        },
        y: {
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      <div className="relative">
        <Mailbox className="h-16 w-16 text-green-500 drop-shadow-lg" />
        <motion.div
          className="absolute -top-2 -right-4"
          animate={{
            y: [0, -2, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Mail className="h-8 w-8 text-foreground -rotate-12 drop-shadow-lg" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RunningLetterboxAnimation;
