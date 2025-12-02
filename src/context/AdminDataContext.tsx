import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SitePage, BlogPost, BlogCategory } from '../types';
import { mockSitePages, mockBlogPosts, mockBlogCategories } from '../data/mockAdminData';

interface AdminDataContextType {
  sitePages: SitePage[];
  setSitePages: (pages: SitePage[]) => void;
  updatePage: (page: SitePage) => void;
  addPage: (page: Omit<SitePage, 'id' | 'lastModified'>) => void;
  deletePage: (pageId: string) => void;

  blogPosts: BlogPost[];
  setBlogPosts: (posts: BlogPost[]) => void;
  updateBlogPost: (post: BlogPost) => void;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteBlogPost: (postId: string) => void;

  blogCategories: BlogCategory[];
  setBlogCategories: (categories: BlogCategory[]) => void;
  updateBlogCategory: (category: BlogCategory) => void;
  addBlogCategory: (category: Omit<BlogCategory, 'id'>) => void;
  deleteBlogCategory: (categoryId: string) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const useAdminData = () => {
    const context = useContext(AdminDataContext);
    if (!context) throw new Error('useAdminData must be used within an AdminDataProvider');
    return context;
};

export const AdminDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sitePages, setSitePages] = useState<SitePage[]>(() => {
        const saved = localStorage.getItem('sitePages');
        return saved ? JSON.parse(saved) : mockSitePages;
    });

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
        const saved = localStorage.getItem('blogPosts');
        return saved ? JSON.parse(saved) : mockBlogPosts;
    });

    const [blogCategories, setBlogCategories] = useState<BlogCategory[]>(() => {
        const saved = localStorage.getItem('blogCategories');
        return saved ? JSON.parse(saved) : mockBlogCategories;
    });

    useEffect(() => { localStorage.setItem('sitePages', JSON.stringify(sitePages)); }, [sitePages]);
    useEffect(() => { localStorage.setItem('blogPosts', JSON.stringify(blogPosts)); }, [blogPosts]);
    useEffect(() => { localStorage.setItem('blogCategories', JSON.stringify(blogCategories)); }, [blogCategories]);

    const updatePage = (updatedPage: SitePage) => {
        setSitePages(prev => prev.map(p => p.id === updatedPage.id ? { ...updatedPage, lastModified: new Date() } : p));
    };

    const addPage = (newPageData: Omit<SitePage, 'id' | 'lastModified'>) => {
        const newPage: SitePage = {
            ...newPageData,
            id: `page-${Date.now()}`,
            lastModified: new Date(),
        };
        setSitePages(prev => [...prev, newPage]);
    };

    const deletePage = (pageId: string) => {
        setSitePages(prev => prev.filter(p => p.id !== pageId));
    };

    const updateBlogPost = (updatedPost: BlogPost) => {
        setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? { ...updatedPost, updatedAt: new Date() } : p));
    };

    const addBlogPost = (newPostData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newPost: BlogPost = {
            ...newPostData,
            id: `post-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setBlogPosts(prev => [newPost, ...prev]);
    };

    const deleteBlogPost = (postId: string) => {
        setBlogPosts(prev => prev.filter(p => p.id !== postId));
    };

    const updateBlogCategory = (updatedCategory: BlogCategory) => {
        setBlogCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    };

    const addBlogCategory = (newCategoryData: Omit<BlogCategory, 'id'>) => {
        const newCategory: BlogCategory = {
            ...newCategoryData,
            id: `cat-${Date.now()}`,
        };
        setBlogCategories(prev => [...prev, newCategory]);
    };

    const deleteBlogCategory = (categoryId: string) => {
        setBlogCategories(prev => prev.filter(c => c.id !== categoryId));
    };

    return (
        <AdminDataContext.Provider value={{
            sitePages, setSitePages, updatePage, addPage, deletePage,
            blogPosts, setBlogPosts, updateBlogPost, addBlogPost, deleteBlogPost,
            blogCategories, setBlogCategories, updateBlogCategory, addBlogCategory, deleteBlogCategory,
        }}>
            {children}
        </AdminDataContext.Provider>
    );
};
