import { faker } from '@faker-js/faker';
import { User, SitePage, Letter, BlogPost, BlogCategory } from '../types';

export const mockAdmin: User = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'saurav9614256047@gmail.com',
  password: 'services08#9614',
  role: 'admin',
  createdAt: new Date('2024-01-01'),
};

export const mockUser: User = {
  id: 'user-123',
  name: 'Alex Mercer',
  email: 'alex.mercer@example.com',
  password: 'password123',
  role: 'user',
  createdAt: new Date('2024-05-10'),
};

export const mockUsers: User[] = Array.from({ length: 15 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'user',
  createdAt: faker.date.past({ years: 1 }),
}));

export const mockDbUsers = [mockAdmin, mockUser, ...mockUsers];

export const mockSitePages: SitePage[] = [
  { id: 'page-privacy', path: '/privacy-policy', title: 'Privacy Policy', content: '<h1>Privacy Policy</h1><p>Your privacy is important to us...</p>', lastModified: new Date(), showAds: false },
  { id: 'page-terms', path: '/terms-of-service', title: 'Terms of Service', content: '<h1>Terms of Service</h1><p>By using our service, you agree to these terms...</p>', lastModified: new Date(), showAds: true },
];

export const mockSavedLetters: Letter[] = [
    { id: '1', title: 'Cover Letter - Software Engineer', category: 'cover-letter', language: 'English', tone: 'professional', content: faker.lorem.paragraphs(3), createdAt: new Date('2025-01-15'), updatedAt: new Date('2025-01-15') },
    { id: '2', title: 'Business Proposal Letter', category: 'business', language: 'English', tone: 'formal', content: faker.lorem.paragraphs(4), createdAt: new Date('2025-01-10'), updatedAt: new Date('2025-01-12') },
];

export const mockBlogCategories: BlogCategory[] = [
  { id: 'cat-1', name: 'Technology', slug: 'technology', description: 'Latest trends in tech.' },
  { id: 'cat-2', name: 'Productivity', slug: 'productivity', description: 'Tips and tricks to be more productive.' },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Future of AI in Letter Writing',
    slug: 'future-of-ai-letter-writing',
    content: '<h2>Introduction</h2><p>Artificial intelligence is revolutionizing how we communicate. In this post, we explore the exciting future of AI in crafting personal and professional letters.</p><h3>Key Developments</h3><ul><li>Natural Language Generation</li><li>Tone and Style Adaptation</li></ul>',
    authorId: 'admin-001',
    categoryId: 'cat-1',
    featuredImageUrl: 'https://images.unsplash.com/photo-1620712943543-2858200f745a?q=80&w=2070&auto=format&fit=crop',
    metaTitle: 'The Future of AI in Letter Writing | LetterCraft AI',
    metaDescription: 'Explore the exciting future of AI in crafting personal and professional letters, from natural language generation to style adaptation.',
    metaKeywords: 'AI, letter writing, future of technology',
    createdAt: new Date('2025-08-15'),
    updatedAt: new Date('2025-08-15'),
  },
  {
    id: 'post-2',
    title: '5 Tips for a More Productive Workday',
    slug: '5-tips-productive-workday',
    content: '<h2>Boost Your Efficiency</h2><p>Struggling to stay focused? Here are five simple tips to help you get more done every day.</p><ol><li>Prioritize Your Tasks</li><li>Take Regular Breaks</li><li>Minimize Distractions</li><li>Set Clear Goals</li><li>Review Your Day</li></ol>',
    authorId: 'admin-001',
    categoryId: 'cat-2',
    featuredImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    metaTitle: '5 Tips for a More Productive Workday | LetterCraft AI',
    metaDescription: 'Boost your efficiency with these five simple tips for a more productive workday. Learn to prioritize, take breaks, and set clear goals.',
    metaKeywords: 'productivity, tips, workday, efficiency',
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2025-08-10'),
  },
];
