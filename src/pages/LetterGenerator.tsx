import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLetterContext } from '../context/LetterContext';
import { useTranslation } from '../context/LanguageContext';
import LetterForm from '../components/LetterForm';
import LetterPreview from '../components/LetterPreview';
import LoadingSpinner from '../components/LoadingSpinner';
import { LetterGenerationRequest } from '../types';

const LetterGenerator: React.FC = () => {
  const { currentLetter, isGenerating, generateLetter } = useLetterContext();
  const { t } = useTranslation();
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const initialKeywords = location.state?.keywords || '';

  const handleGenerateLetter = async (request: LetterGenerationRequest) => {
    await generateLetter(request);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  if (isGenerating) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 no-print"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('generator_title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('generator_subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            className="lg:col-span-2 no-print"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <LetterForm 
              onGenerate={handleGenerateLetter} 
              disabled={isGenerating}
              initialKeywords={initialKeywords}
            />
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {currentLetter ? (
              <LetterPreview 
                letter={currentLetter} 
                onBack={showPreview ? handleBackToForm : undefined}
              />
            ) : (
              <div className="bg-secondary/30 rounded-xl shadow-lg p-8 text-center h-full flex flex-col justify-center items-center border-2 border-dashed border-border no-print">
                <div className="text-muted-foreground mb-4">
                  <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">{t('preview_title')}</h3>
                <p className="text-muted-foreground">{t('preview_subtitle')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LetterGenerator;
