import React from 'react';
import { motion } from 'framer-motion';
import { Letter } from '../types';
import { Download, FileText, File, X } from 'lucide-react';
import { generateLetterPdf } from '../utils/pdfGenerator';

interface ExportOptionsProps {
  letter: Letter;
  onClose: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ letter, onClose }) => {
  const exportAsTxt = () => {
    const blob = new Blob([letter.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${letter.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  const exportAsPdf = () => {
    generateLetterPdf(letter);
    onClose();
  };

  const exportAsDocx = () => {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Poppins&family=Noto+Sans&family=Noto+Sans+Bengali&family=Noto+Sans+Devanagari&family=Noto+Sans+Tamil&display=swap';
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${letter.language}">
        <head>
          <meta charset="utf-8">
          <title>${letter.title}</title>
          <link href="${fontUrl}" rel="stylesheet">
          <style>
            body { 
              font-family: 'Poppins', 'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Tamil', sans-serif; 
              line-height: 1.6; 
              margin: 40px; 
            }
            pre { 
              white-space: pre-wrap; 
              font-family: inherit; 
            }
          </style>
        </head>
        <body>
          <h1>${letter.title}</h1>
          <pre>${letter.content}</pre>
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${letter.title.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  const iconColorClasses: { [key: string]: string } = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    gray: 'text-gray-500',
  };

  const exportOptions = [
    { icon: FileText, title: 'PDF', description: 'Professional, fixed format', action: exportAsPdf, color: 'red' },
    { icon: File, title: 'DOCX/HTML', description: 'Editable document', action: exportAsDocx, color: 'blue' },
    { icon: FileText, title: 'TXT', description: 'Plain text, universal', action: exportAsTxt, color: 'gray' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-secondary rounded-xl shadow-xl max-w-md w-full p-6 border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Download className="h-6 w-6 text-brand" />
            <h2 className="text-xl font-semibold text-foreground">Export Letter</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {exportOptions.map((option, index) => (
            <motion.button
              key={option.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={option.action}
              className="w-full p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left flex items-center space-x-4"
            >
              <option.icon className={`h-8 w-8 ${iconColorClasses[option.color]}`} />
              <div>
                <h3 className="font-semibold text-foreground">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExportOptions;
