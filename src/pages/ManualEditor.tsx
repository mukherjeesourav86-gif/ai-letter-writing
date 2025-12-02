import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { templates } from '../data/templates';
import { allLanguages } from '../data/languages';
import { ArrowLeft, Edit, Download, Copy, Check, Share2, Languages, ChevronDown, Loader } from 'lucide-react';
import ExportOptions from '../components/ExportOptions';
import { Letter } from '../types';
import { useTranslation } from '../context/LanguageContext';

const ManualEditor: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { t } = useTranslation();
  const template = useMemo(() => templates.find(t => t.id === templateId), [templateId]);
  
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>(() => {
    if (!template) return {};
    return template.placeholders.reduce((acc, placeholder) => {
      acc[placeholder.key] = '';
      return acc;
    }, {} as Record<string, string>);
  });

  const [copySuccess, setCopySuccess] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [languageFilter, setLanguageFilter] = useState<'all' | 'indian' | 'international'>('all');

  const handleInputChange = (placeholderKey: string, value: string) => {
    setPlaceholderValues(prev => ({ ...prev, [placeholderKey]: value }));
    setTranslatedContent(null); // Reset translation when input changes
  };

  const letterContent = useMemo(() => {
    if (!template) return 'Template not found.';
    let content = template.templateString;
    for (const key in placeholderValues) {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      content = content.replace(regex, placeholderValues[key] || `[${key}]`);
    }
    return content;
  }, [template, placeholderValues]);

  const handleTranslate = async () => {
    setIsTranslating(true);
    setTranslatedContent('Translating...');

    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey.includes("****************")) {
      alert('DeepSeek API key is not configured. Please add your key to the .env file and refresh.');
      setIsTranslating(false);
      setTranslatedContent('API Key not configured.');
      return;
    }

    const systemPrompt = "You are an expert multilingual translator. Your task is to translate the given text accurately into the specified language, preserving the original formatting (including line breaks) and tone. Only output the translated text, with no additional comments or explanations.";
    const userPrompt = `Translate the following letter into ${targetLanguage}. Ensure the translation is natural and culturally appropriate. Maintain all original line breaks and paragraph structures.\n\n---\n\n${letterContent}`;

    try {
      const response = await axios.post(
        'https://api.deepseek.com/chat/completions',
        {
          model: 'deepseek-chat',
          messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
          temperature: 0.5,
          max_tokens: 2048,
        },
        {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        }
      );
      setTranslatedContent(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error calling translation API:', error);
      let errorMessage = 'An error occurred during translation.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = `API Error: ${error.response.data?.error?.message || 'Unknown error'}`;
      }
      setTranslatedContent(errorMessage);
    } finally {
      setIsTranslating(false);
    }
  };

  const finalContent = translatedContent ?? letterContent;

  const handleCopy = () => {
    const textToCopy = finalContent;
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }).catch(err => {
        console.error('Modern clipboard write failed:', err);
        fallbackCopy(textToCopy);
      });
    } else {
      fallbackCopy(textToCopy);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('Failed to copy text. Please try again.');
    }
    document.body.removeChild(textArea);
  };

  const handleShare = async () => {
    const shareData = {
      title: template ? template.name : 'Letter',
      text: finalContent,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Sharing failed:', error);
        alert('Sharing was cancelled or failed.');
      }
    } else {
      handleCopy();
      alert('Web Share not supported. The letter has been copied to your clipboard.');
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-destructive">Template Not Found</h1>
          <p className="text-muted-foreground mt-2">The template you are looking for does not exist.</p>
          <Link to="/templates" className="mt-4 inline-block bg-brand text-white font-semibold py-2 px-4 rounded-lg">
            Back to Templates
          </Link>
        </div>
      </div>
    );
  }

  const mockLetter: Letter = {
    id: template.id,
    title: template.name,
    category: template.category,
    content: finalContent,
    language: targetLanguage,
    tone: 'formal',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const filteredLanguages = allLanguages.filter(lang => {
    if (languageFilter === 'all') return true;
    return lang.group.toLowerCase() === languageFilter;
  });

  const groupedLanguages = filteredLanguages.reduce((acc, lang) => {
    (acc[lang.group] = acc[lang.group] || []).push(lang);
    return acc;
  }, {} as Record<string, typeof allLanguages>);

  const secondaryBtn = "bg-secondary text-foreground border border-border font-semibold py-2 px-4 rounded-lg hover:bg-accent transition";
  const inputClass = "w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand/80 transition-all resize-none text-sm";

  return (
    <div className="min-h-[calc(100vh-80px)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/templates" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>{t('editor_back_button')}</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4">{template.name}</h1>
          <p className="text-lg text-muted-foreground">{template.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <div className="relative rounded-2xl p-8 overflow-hidden border border-white/10 bg-gradient-to-br from-purple-600/20 via-brand-500/20 to-sky-500/20 text-white shadow-2xl backdrop-blur-sm h-full">
              <div className="relative z-10 flex flex-col h-full">
                <div className="p-6 border-b border-white/10 flex items-center space-x-3 -mx-8 -mt-8 mb-6 px-8 pt-8">
                  <Edit className="h-6 w-6 text-brand" />
                  <h2 className="text-xl font-semibold text-white">{t('editor_fill_blanks_title')}</h2>
                </div>
                <div className="space-y-4 flex-grow overflow-y-auto pr-4 -mr-4">
                  {template.placeholders.map((p, index) => (
                    <motion.div 
                      key={p.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                    >
                      <label className="block text-sm font-medium text-white/80 mb-1.5">{t(p.labelKey)}</label>
                      <TextareaAutosize 
                        value={placeholderValues[p.key]} 
                        onChange={(e) => handleInputChange(p.key, e.target.value)} 
                        placeholder={t('editor_placeholder_generic')} 
                        className={inputClass}
                        minRows={1} 
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <div className="bg-secondary/30 rounded-xl shadow-2xl h-full flex flex-col border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">{t('editor_preview_title')}</h2>
              </div>
              <div className="p-6 flex-grow overflow-y-auto bg-background/50">
                <pre className="whitespace-pre-wrap text-muted-foreground text-base leading-relaxed font-sans">
                  {finalContent}
                </pre>
              </div>
              <div className="p-6 border-t border-border bg-secondary/50 rounded-b-xl space-y-6">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-muted-foreground">{t('editor_translate_label')}</label>
                    <div className="flex items-center gap-2">
                        <button key='all' type="button" onClick={() => setLanguageFilter('all')} className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${languageFilter === 'all' ? 'bg-brand text-white' : 'bg-secondary hover:bg-accent'}`}>{t('form_language_filter_all')}</button>
                        <button key='indian' type="button" onClick={() => setLanguageFilter('indian')} className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${languageFilter === 'indian' ? 'bg-brand text-white' : 'bg-secondary hover:bg-accent'}`}>{t('form_language_filter_indian')}</button>
                        <button key='international' type="button" onClick={() => setLanguageFilter('international')} className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${languageFilter === 'international' ? 'bg-brand text-white' : 'bg-secondary hover:bg-accent'}`}>{t('form_language_filter_intl')}</button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-grow">
                            <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} className={`w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/80 transition-all resize-none text-sm appearance-none !py-2`}>
                                {Object.entries(groupedLanguages).map(([group, languages]) => (
                                <optgroup key={group} label={group}>
                                    {languages.map(l => (
                                    <option key={l.name} value={l.name}>{l.flag} {l.name}</option>
                                    ))}
                                </optgroup>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                        <button onClick={handleTranslate} disabled={isTranslating} className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center justify-center space-x-2 disabled:opacity-50">
                            {isTranslating ? <Loader className="h-5 w-5 animate-spin" /> : <Languages className="h-5 w-5" />}
                            <span>{isTranslating ? t('editor_translating_button') : t('editor_translate_button')}</span>
                        </button>
                    </div>
                </div>
                <div className="border-t border-border"></div>
                <div className="flex flex-wrap gap-3 justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={handleCopy} className={`${secondaryBtn} transition-colors ${copySuccess ? 'border-green-500 bg-green-500/10 text-green-400' : ''}`}>
                      {copySuccess ? <Check className="h-4 w-4 inline mr-2" /> : <Copy className="h-4 w-4 inline mr-2" />}
                      {copySuccess ? t('editor_copied_button') : t('editor_copy_button')}
                    </button>
                    <button onClick={handleShare} className={secondaryBtn}>
                      <Share2 className="h-4 w-4 inline mr-2" />{t('editor_share_button')}
                    </button>
                  </div>
                  <button onClick={() => setShowExportOptions(true)} className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition">
                    <Download className="h-4 w-4 inline mr-2" />{t('editor_export_button')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {showExportOptions && (
        <ExportOptions
          letter={mockLetter}
          onClose={() => setShowExportOptions(false)}
        />
      )}
    </div>
  );
};

export default ManualEditor;
