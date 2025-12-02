import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate, Search, Filter, PenTool, ChevronDown, Briefcase, Building, LogOut, Heart, Mail, GraduationCap, Scale, FileText } from 'lucide-react';
import { LetterCategory } from '../types';
import { templates } from '../data/templates';
import { useTranslation } from '../context/LanguageContext';

const categoryIcons: { [key in LetterCategory]?: React.ElementType } = {
  'cover-letter': Briefcase,
  'business': Building,
  'resignation': LogOut,
  'thank-you': Heart,
  'invitation': Mail,
  'complaint': FileText,
  'recommendation': FileText,
  'application': FileText,
  'formal': FileText,
  'informal': FileText,
  'government': Scale,
  'education': GraduationCap,
};

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LetterCategory | 'all'>('all');

  const categories = [
    { value: 'all', labelKey: 'category_all' },
    { value: 'business', labelKey: 'category_business' },
    { value: 'cover-letter', labelKey: 'category_cover-letter' },
    { value: 'resignation', labelKey: 'category_resignation' },
    { value: 'complaint', labelKey: 'category_complaint' },
    { value: 'thank-you', labelKey: 'category_thank-you' },
    { value: 'invitation', labelKey: 'category_invitation' },
    { value: 'informal', labelKey: 'category_informal' },
    { value: 'government', labelKey: 'category_government' },
    { value: 'education', labelKey: 'category_education' },
  ];

  const filteredTemplates = templates.filter(template => {
    return (
      (template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || template.category === selectedCategory)
    );
  });

  const handleUseTemplate = (templateId: string) => {
    navigate(`/editor/${templateId}`);
  };
  
  const inputClass = "w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/80 transition-all";

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('templates_title')}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('templates_subtitle')}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-8 bg-secondary/30 p-6 rounded-xl shadow-lg border border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input type="text" placeholder={t('templates_search_placeholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`${inputClass} pl-12`} />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as any)} className={`${inputClass} w-full md:w-64 pl-12 appearance-none`}>
                {categories.map(c => <option key={c.value} value={c.value}>{t(c.labelKey)}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => {
            const Icon = categoryIcons[template.category] || LayoutTemplate;
            return (
              <motion.div 
                key={template.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 * index, duration: 0.5 }} 
                className="bg-secondary/30 rounded-xl p-6 hover:bg-accent/50 transition-colors border border-border flex flex-col h-full group"
              >
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-brand/10 rounded-full">
                      <Icon className="h-6 w-6 text-brand" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{template.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-4 mb-4">{template.description}</p>
                </div>
                
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-border">
                  <span className="px-3 py-1 bg-brand/10 text-brand text-xs rounded-full font-medium whitespace-nowrap">{t(`category_${template.category}`)}</span>
                  <button 
                    onClick={() => handleUseTemplate(template.id)} 
                    className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition inline-flex items-center justify-center space-x-2 text-sm"
                  >
                    <PenTool className="h-4 w-4" />
                    <span>{t('templates_use_button')}</span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center py-16">
            <LayoutTemplate className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">{t('templates_no_results_title')}</h3>
            <p className="text-muted-foreground">{t('templates_no_results_subtitle')}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Templates;
