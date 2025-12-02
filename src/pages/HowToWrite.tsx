import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, BookOpen, FileText, Signature, CheckCircle, Type, ClipboardCheck, ArrowRight, PenTool } from 'lucide-react';

const HowToWrite: React.FC = () => {
  const steps = [
    { icon: User, title: "Sender's Information", description: "Your address and the date, top right." },
    { icon: Mail, title: "Recipient's Information", description: "Recipient's name, title, and address on the left." },
    { icon: BookOpen, title: "Salutation", description: 'A polite greeting, like "Dear Ms. Smith,".' },
    { icon: FileText, title: "Opening Paragraph", description: "State your purpose immediately and clearly." },
    { icon: FileText, title: "Body Paragraphs", description: "Provide details and supporting facts in organized paragraphs." },
    { icon: FileText, title: "Concluding Paragraph", description: "Summarize and state expected actions." },
    { icon: Signature, title: "Closing & Signature", description: 'End with "Sincerely," and your signed name.' }
  ];

  const tips = [
    { icon: CheckCircle, title: "Be Clear & Concise", description: "Use short, direct sentences." },
    { icon: ClipboardCheck, title: "Proofread", description: "Check for spelling and grammar errors." },
    { icon: Type, title: "Use Appropriate Tone", description: "Match your tone to the letter's purpose." },
    { icon: FileText, title: "Organize Content", description: "Use paragraphs for readability." }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How to Write a Professional Letter</h1>
          <p className="text-lg text-muted-foreground">A step-by-step guide to crafting effective correspondence.</p>
        </motion.div>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">7 Steps to a Perfect Letter</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center text-2xl font-bold">{index + 1}</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground mt-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Key Tips for Success</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-secondary/30 p-6 rounded-xl border border-border">
                <div className="p-3 bg-blue-500/10 rounded-full w-14 h-14 flex items-center justify-center mb-4"><tip.icon className="h-8 w-8 text-blue-400" /></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="py-12 bg-secondary/30 rounded-xl border border-border">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Practice?</h2>
            <p className="text-lg mb-6 text-muted-foreground">Use our AI Letter Generator to apply these principles and create a perfect letter in seconds.</p>
            <Link to="/generator" className="bg-brand text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-brand-700 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center space-x-2">
              <PenTool className="h-5 w-5" />
              <span>Start Writing Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HowToWrite;
