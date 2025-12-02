import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wand2, LayoutTemplate, ArrowRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const ActionCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, description, gradient, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
      whileHover={{ y: -10, scale: 1.03, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      className={`relative rounded-2xl p-8 overflow-hidden border border-white/10 ${gradient} text-white shadow-2xl`}
    >
      <div className="relative z-10">
        <div className="p-3 bg-white/20 rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-lg">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-white/80 mb-8 max-w-md">{description}</p>
        {children}
      </div>
    </motion.div>
  );
};

const ActionCardsSection: React.FC = () => {
    const [keywords, setKeywords] = useState('');
    const { t } = useTranslation();

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                        {t('home_title')}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t('home_subtitle')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <ActionCard
                        icon={Wand2}
                        title={t('home_card_ai_title')}
                        description={t('home_card_ai_desc')}
                        gradient="bg-gradient-to-br from-brand-500 to-purple-600"
                    >
                        <div className="relative">
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder={t('home_card_ai_placeholder')}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 transition-all"
                        />
                        <Link
                            to="/generator"
                            state={{ keywords }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-brand-600 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-200 transition flex items-center justify-center"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        </div>
                    </ActionCard>

                    <ActionCard
                        icon={LayoutTemplate}
                        title={t('home_card_manual_title')}
                        description={t('home_card_manual_desc')}
                        gradient="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
                    >
                        <Link
                        to="/templates"
                        className="bg-white/90 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-white transition flex items-center justify-center space-x-2"
                        >
                        <span>{t('home_card_manual_button')}</span>
                        <ArrowRight className="h-5 w-5" />
                        </Link>
                    </ActionCard>
                </div>
            </div>
        </section>
    );
};

export default ActionCardsSection;
