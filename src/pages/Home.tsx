import React from 'react';
import { motion } from 'framer-motion';
import { Languages, LayoutGrid, BrainCircuit, FileText, SlidersHorizontal, Download } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import ActionCardsSection from '../components/ActionCardsSection';

const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}> = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-secondary/30 p-6 rounded-xl border border-border text-center hover:bg-accent/50 transition-colors"
    >
      <div className="inline-block p-4 bg-brand/10 rounded-full mb-4">
        <Icon className="h-8 w-8 text-brand" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Languages, title: 'Multi-Language Support', description: 'Generate letters in 22+ languages with accurate grammar and tone.' },
    { icon: LayoutGrid, title: '18+ Letter Categories', description: 'Cover all types of letters from business to personal with pre-defined templates.' },
    { icon: BrainCircuit, title: 'Smart Keyword Processing', description: 'Our AI analyzes your keywords to generate contextually relevant content.' },
    { icon: FileText, title: 'Full Letter Structure', description: 'Auto-formats letters with proper salutations, body, closings, and signatures.' },
    { icon: SlidersHorizontal, title: 'Customization Options', description: 'Easily adjust tone, length, and specific details before finalizing your letter.' },
    { icon: Download, title: 'Export & Sharing', description: 'Download in multiple formats (PDF, DOCX, TXT) and share via email.' },
  ];

  return (
    <div className="pt-16">
      <ActionCardsSection />

      {/* Feature Grid Section */}
      <section className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('home_features_title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('home_features_subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
