import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminData } from '../context/AdminDataContext';
import { useLetterContext } from '../context/LetterContext';
import { Calendar, User } from 'lucide-react';

const Blog: React.FC = () => {
    const { blogPosts, blogCategories } = useAdminData();
    const { allUsers } = useLetterContext();

    const getAuthorName = (id: string) => allUsers.find(u => u.id === id)?.name || 'Unknown Author';
    const getCategoryName = (id: string) => blogCategories.find(c => c.id === id)?.name || 'Uncategorized';

    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const featuredPost = sortedPosts[0];
    const latestPosts = sortedPosts.slice(1);

    const placeholderImage = "https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=2070&auto=format&fit=crop";

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Blog</h1>
                    <p className="text-lg text-muted-foreground">Insights, tips, and updates from the LetterCraft AI team.</p>
                </motion.div>

                {featuredPost && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
                        <Link to={`/blog/${featuredPost.slug}`} className="block group">
                            <div className="grid lg:grid-cols-2 gap-8 items-center bg-secondary/30 rounded-2xl p-6 border border-border overflow-hidden">
                                <div className="order-2 lg:order-1">
                                    <span className="text-sm font-semibold text-brand mb-2 inline-block">{getCategoryName(featuredPost.categoryId)}</span>
                                    <h2 className="text-3xl font-bold text-foreground group-hover:text-brand transition-colors mb-4">{featuredPost.title}</h2>
                                    <p className="text-muted-foreground mb-4 line-clamp-3">{featuredPost.metaDescription}</p>
                                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                        <span className="flex items-center gap-2"><User className="h-4 w-4"/>{getAuthorName(featuredPost.authorId)}</span>
                                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4"/>{new Date(featuredPost.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2 h-64 lg:h-full">
                                    <img src={featuredPost.featuredImageUrl || placeholderImage} alt={featuredPost.title} className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"/>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map((post, index) => (
                        <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.6 }}>
                            <Link to={`/blog/${post.slug}`} className="block group bg-secondary/30 rounded-2xl overflow-hidden border border-border h-full flex flex-col">
                                <div className="overflow-hidden">
                                    <img src={post.featuredImageUrl || placeholderImage} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"/>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <span className="text-xs font-semibold text-brand mb-2 inline-block">{getCategoryName(post.categoryId)}</span>
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-brand transition-colors mb-2">{post.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-3">{post.metaDescription}</p>
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground space-x-4 mt-4 pt-4 border-t border-border">
                                        <span className="flex items-center gap-1"><User className="h-3 w-3"/>{getAuthorName(post.authorId)}</span>
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{new Date(post.createdAt).toLocaleDateString('en-GB')}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
