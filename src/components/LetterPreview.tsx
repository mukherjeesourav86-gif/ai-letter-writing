import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';
import { Letter } from '../types';
import { Download, Edit3, Save, Share2, ArrowLeft, Copy, Check, Printer } from 'lucide-react';
import ExportOptions from './ExportOptions';
import { generateLetterPdf } from '../utils/pdfGenerator';

interface LetterPreviewProps {
  letter: Letter;
  onBack?: () => void;
}

const LetterPreview: React.FC<LetterPreviewProps> = ({ letter, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(letter.content);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const letterContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedContent(letter.content);
  }, [letter]);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would update the context/backend
  };

  const handleCopy = () => {
    const textToCopy = editedContent;
    
    // Modern clipboard API with fallback
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
      title: letter.title,
      text: editedContent,
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadA4 = () => {
    generateLetterPdf({ ...letter, content: editedContent });
  };

  const primaryBtn = "bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition";
  const secondaryBtn = "bg-secondary text-foreground border border-border font-semibold py-2 px-4 rounded-lg hover:bg-accent transition";

  return (
    <>
      <motion.div className="bg-secondary/30 rounded-xl shadow-2xl h-full flex flex-col border border-border no-print">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">{letter.title}</h2>
            {onBack && (
              <button onClick={onBack} className={`${secondaryBtn} !text-xs`}>
                <ArrowLeft className="h-4 w-4 inline mr-1" />
                Back
              </button>
            )}
          </div>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          {isEditing ? (
            <TextareaAutosize
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full bg-background/70 border border-border rounded-lg p-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/80 transition-all resize-none font-mono text-sm leading-relaxed"
              minRows={15}
            />
          ) : (
            <div ref={letterContentRef} className="bg-background/50 rounded-lg p-6 min-h-[400px] border border-border">
              <pre className="whitespace-pre-wrap text-muted-foreground text-base leading-relaxed font-sans">
                {editedContent}
              </pre>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border bg-secondary/50 rounded-b-xl">
          {isEditing ? (
            <div className="flex space-x-2">
              <button onClick={handleSave} className={`${primaryBtn} flex-1 flex items-center justify-center space-x-2`}>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
              <button onClick={() => setIsEditing(false)} className={`${secondaryBtn} flex-1`}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setIsEditing(true)} className={secondaryBtn}><Edit3 className="h-4 w-4 inline mr-2" />Edit</button>
                <button onClick={handleCopy} className={`${secondaryBtn} transition-colors ${copySuccess ? 'border-green-500 bg-green-500/10 text-green-400' : ''}`}>
                  {copySuccess ? <Check className="h-4 w-4 inline mr-2" /> : <Copy className="h-4 w-4 inline mr-2" />}
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={handleShare} className={secondaryBtn}><Share2 className="h-4 w-4 inline mr-2" />Share</button>
                <button onClick={handlePrint} className={secondaryBtn}><Printer className="h-4 w-4 inline mr-2" />Print</button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={handleDownloadA4} className={primaryBtn}><Download className="h-4 w-4 inline mr-2" />Download A4</button>
                <button onClick={() => setShowExportOptions(true)} className={secondaryBtn}>More Formats</button>
              </div>
            </div>
          )}
        </div>

        {showExportOptions && (
          <ExportOptions
            letter={{ ...letter, content: editedContent }}
            onClose={() => setShowExportOptions(false)}
          />
        )}
      </motion.div>
      
      {/* Hidden div for printing */}
      <div className="printable hidden">
        <h1 className="text-2xl font-bold mb-4">{letter.title}</h1>
        <pre className="whitespace-pre-wrap font-sans text-base">{editedContent}</pre>
      </div>
    </>
  );
};

export default LetterPreview;
