import React from 'react';
import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const AnimatedLogo: React.FC = () => {
  const { siteName } = useSite();

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.3,
        type: 'spring',
        stiffness: 100,
        damping: 10
      },
    }),
  };

  return (
    <motion.div
      className="flex items-center space-x-3 cursor-pointer"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        className="relative"
        style={{ perspective: 800, transformStyle: 'preserve-3d' }}
        variants={{
          rest: { rotateY: 0 },
          hover: { rotateY: 20 },
        }}
      >
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-brand-600 to-purple-600 rounded-lg shadow-lg flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 },
          }}
        >
          <motion.div
            style={{ transform: 'translateZ(20px)' }}
          >
            <PenTool className="h-7 w-7 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div key={siteName} className="flex items-center overflow-hidden">
        {siteName.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            custom={i}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl font-bold text-foreground"
            style={{ display: 'inline-block' }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;
