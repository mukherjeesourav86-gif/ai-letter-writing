export interface Letter {
  id: string;
  title: string;
  category: LetterCategory;
  language: string;
  tone: LetterTone;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LetterCategory = 
  | 'formal' 
  | 'informal' 
  | 'business' 
  | 'cover-letter' 
  | 'resignation' 
  | 'invitation' 
  | 'complaint' 
  | 'thank-you' 
  | 'recommendation' 
  | 'application'
  | 'government'
  | 'education';

export type LetterTone = 'professional' | 'friendly' | 'persuasive' | 'formal' | 'casual';

export type LetterLength = 'short' | 'medium' | 'long';

export interface LetterGenerationRequest {
  keywords: string;
  category: LetterCategory;
  tone: LetterTone;
  length: LetterLength;
  language: string;
  
  senderName?: string;
  senderAddress?: string;
  
  recipientName?: string;
  recipientAddress?: string;

  customInstructions?: string;
}

export interface Placeholder {
  key: string;
  labelKey: string;
}

export interface LetterTemplate {
  id: string;
  name: string;
  category: LetterCategory;
  description: string;
  templateString: string;
  placeholders: Placeholder[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface SitePage {
  id: string;
  path: string;
  title: string;
  content: string;
  lastModified: Date;
  showAds: boolean;
}

export interface FooterLink {
  label: string;
  path: string;
}

export interface SocialLink {
  id: string;
  platform: 'Twitter' | 'Linkedin' | 'Github' | 'Facebook' | 'YouTube';
  href: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  categoryId: string;
  featuredImageUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  createdAt: Date;
  updatedAt: Date;
}
