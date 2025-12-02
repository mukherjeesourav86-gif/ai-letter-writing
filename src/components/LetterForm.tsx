import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';
import { LetterGenerationRequest, LetterCategory, LetterTone, LetterLength } from '../types';
import { Wand2, Settings, ChevronDown, User, Mail } from 'lucide-react';
import { allLanguages } from '../data/languages';
import { useTranslation } from '../context/LanguageContext';

interface LetterFormProps {
  onGenerate: (request: LetterGenerationRequest) => void;
  disabled?: boolean;
  initialKeywords?: string;
}

const LetterForm: React.FC<LetterFormProps> = ({ onGenerate, disabled, initialKeywords = '' }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<LetterGenerationRequest>({
    keywords: initialKeywords,
    category: 'business',
    tone: 'professional',
    length: 'medium',
    language: 'English',
    senderName: '',
    senderAddress: '',
    recipientName: '',
    recipientAddress: '',
    customInstructions: '',
  });
  const [languageFilter, setLanguageFilter] = useState<'all' | 'indian' | 'international'>('all');
  const [showSenderDetails, setShowSenderDetails] = useState(false);
  const [showRecipientDetails, setShowRecipientDetails] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (initialKeywords) {
      setFormData(prev => ({ ...prev, keywords: initialKeywords }));
    }
  }, [initialKeywords]);

  const categories: { value: LetterCategory; labelKey: string }[] = [
    { value: 'business', labelKey: 'category_business' },
    { value: 'cover-letter', labelKey: 'category_cover-letter' },
    { value: 'resignation', labelKey: 'category_resignation' },
    { value: 'complaint', labelKey: 'category_complaint' },
    { value: 'thank-you', labelKey: 'category_thank-you' },
    { value: 'invitation', labelKey: 'category_invitation' },
    { value: 'recommendation', labelKey: 'category_recommendation' },
    { value: 'application', labelKey: 'category_application' },
    { value: 'formal', labelKey: 'category_formal' },
    { value: 'informal', labelKey: 'category_informal' },
    { value: 'government', labelKey: 'category_government' },
    { value: 'education', labelKey: 'category_education' },
  ];

  const tones: { value: LetterTone; labelKey: string }[] = [
    { value: 'professional', labelKey: 'tone_professional' },
    { value: 'friendly', labelKey: 'tone_friendly' },
    { value: 'persuasive', labelKey: 'tone_persuasive' },
    { value: 'formal', labelKey: 'tone_formal' },
    { value: 'casual', labelKey: 'tone_casual' },
  ];

  const lengths: { value: LetterLength; labelKey: string }[] = [
    { value: 'short', labelKey: 'length_short' },
    { value: 'medium', labelKey: 'length_medium' },
    { value: 'long', labelKey: 'length_long' },
  ];
  
  const filteredLanguages = allLanguages.filter(lang => {
    if (languageFilter === 'all') return true;
    return lang.group.toLowerCase() === languageFilter;
  });

  const groupedLanguages = filteredLanguages.reduce((acc, lang) => {
    (acc[lang.group] = acc[lang.group] || []).push(lang);
    return acc;
  }, {} as Record<string, typeof allLanguages>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.keywords.trim()) {
      alert('Please provide at least some keywords or context for your letter.');
      return;
    }
    onGenerate(formData);
  };

  const handleInputChange = (field: keyof LetterGenerationRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <label className="block text-sm font-medium text-muted-foreground mb-2">{children}</label>
  );

  const SelectWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative">
      {children}
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
    </div>
  );

  const inputClass = "w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/80 transition-all";

  return (
    <motion.div
      className="bg-secondary/30 rounded-xl shadow-2xl border border-border"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Wand2 className="h-6 w-6 text-brand" />
          <h2 className="text-xl font-semibold text-foreground">{t('form_title')}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <Label>{t('form_keywords_label')}</Label>
          <TextareaAutosize
            value={formData.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            placeholder={t('form_keywords_placeholder')}
            className={`${inputClass} resize-none`}
            minRows={3}
            maxRows={6}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>{t('form_category_label')}</Label>
            <SelectWrapper>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                {categories.map(c => <option key={c.value} value={c.value}>{t(c.labelKey)}</option>)}
              </select>
            </SelectWrapper>
          </div>
          <div>
            <Label>{t('form_language_label')}</Label>
            <div className="flex items-center gap-2 mb-2">
              <button type="button" onClick={() => setLanguageFilter('all')} className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${languageFilter === 'all' ? 'bg-brand text-white' : 'bg-secondary hover:bg-accent'}`}>{t('form_language_filter_all')}</button>
              <button type="button" onClick={() => setLanguageFilter('indian')} className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${languageFilter === 'indian' ? 'bg-brand text-white' : 'bg-secondary hover:bg-accent'}`}>{t('form_language_filter_indian')}</button>
              <button type="button" onClick={() => setLanguageFilter('international')} className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${languageFilter === 'international' ? 'bg-brand text-white' : 'bg-secondary hover:bg-accent'}`}>{t('form_language_filter_intl')}</button>
            </div>
            <SelectWrapper>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                {Object.entries(groupedLanguages).map(([group, languages]) => (
                  <optgroup key={group} label={group}>
                    {languages.map(l => (
                      <option key={l.name} value={l.name}>
                        {l.flag} {l.name} ({l.native})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </SelectWrapper>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>{t('form_tone_label')}</Label>
            <SelectWrapper>
              <select
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                {tones.map(tone => <option key={tone.value} value={tone.value}>{t(tone.labelKey)}</option>)}
              </select>
            </SelectWrapper>
          </div>
          <div>
            <Label>{t('form_length_label')}</Label>
            <SelectWrapper>
              <select
                value={formData.length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                {lengths.map(l => <option key={l.value} value={l.value}>{t(l.labelKey)}</option>)}
              </select>
            </SelectWrapper>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-secondary/50 rounded-lg border border-border">
            <button type="button" onClick={() => setShowSenderDetails(!showSenderDetails)} className="w-full p-4 flex justify-between items-center transition-colors hover:bg-accent/50 rounded-t-lg">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{t('form_sender_info')}</span>
              </h3>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${showSenderDetails ? 'rotate-180' : ''}`} />
            </button>
            {showSenderDetails && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-4 border-t border-border space-y-4">
                  <input type="text" value={formData.senderName} onChange={(e) => handleInputChange('senderName', e.target.value)} placeholder={t('form_sender_name')} className={`${inputClass} text-sm`} />
                  <input type="text" value={formData.senderAddress} onChange={(e) => handleInputChange('senderAddress', e.target.value)} placeholder={t('form_sender_address')} className={`${inputClass} text-sm`} />
                </div>
              </motion.div>
            )}
          </div>

          <div className="bg-secondary/50 rounded-lg border border-border">
            <button type="button" onClick={() => setShowRecipientDetails(!showRecipientDetails)} className="w-full p-4 flex justify-between items-center transition-colors hover:bg-accent/50 rounded-t-lg">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{t('form_recipient_info')}</span>
              </h3>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${showRecipientDetails ? 'rotate-180' : ''}`} />
            </button>
            {showRecipientDetails && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-4 border-t border-border space-y-4">
                  <input type="text" value={formData.recipientName} onChange={(e) => handleInputChange('recipientName', e.target.value)} placeholder={t('form_recipient_name')} className={`${inputClass} text-sm`} />
                  <input type="text" value={formData.recipientAddress} onChange={(e) => handleInputChange('recipientAddress', e.target.value)} placeholder={t('form_recipient_address')} className={`${inputClass} text-sm`} />
                </div>
              </motion.div>
            )}
          </div>

          <div className="bg-secondary/50 rounded-lg border border-border">
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="w-full p-4 flex justify-between items-center transition-colors hover:bg-accent/50 rounded-t-lg">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>{t('form_advanced_options')}</span>
              </h3>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
            {showAdvanced && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-4 border-t border-border">
                  <Label>{t('form_custom_instructions_label')}</Label>
                  <TextareaAutosize
                    value={formData.customInstructions}
                    onChange={(e) => handleInputChange('customInstructions', e.target.value)}
                    placeholder={t('form_custom_instructions_placeholder')}
                    className={`${inputClass} resize-none`}
                    minRows={2}
                    maxRows={4}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="w-full bg-brand text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mt-6"
        >
          <Wand2 className="h-5 w-5" />
          <span>{disabled ? t('form_generating_button') : t('form_generate_button')}</span>
        </button>
      </form>
    </motion.div>
  );
};

export default LetterForm;
