import React from 'react';
import { motion } from 'framer-motion';
import { allLanguages } from '../data/languages';
import { useTranslation } from '../context/LanguageContext';

const IndianLanguagesSection: React.FC = () => {
  const indianLanguages = allLanguages.filter(lang => lang.group === 'Indian');
  const { t } = useTranslation();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-secondary/30 rounded-2xl p-8 md:p-12 border border-border relative overflow-hidden">
        <motion.img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
          alt="Indian Flag"
          className="absolute -top-8 -right-8 w-48 h-auto opacity-15"
          style={{ zIndex: 0 }}
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('indian_section_title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('indian_section_desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {indianLanguages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                viewport={{ once: true }}
                className="bg-accent/50 border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-brand hover:text-white transition-colors cursor-default"
              >
                {lang.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default IndianLanguagesSection;
