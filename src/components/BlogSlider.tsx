import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminData } from '../context/AdminDataContext';
import { useLetterContext } from '../context/LetterContext';
import { User, Calendar } from 'lucide-react';

const BlogSlider: React.FC = () => {
    const { blogPosts, blogCategories } = useAdminData();
    const { allUsers } = useLetterContext();

    const getAuthorName = (id: string) => allUsers.find(u => u.id === id)?.name || 'Unknown Author';
    const getCategoryName = (id: string) => blogCategories.find(c => c.id === id)?.name || 'Uncategorized';

    const sortedPosts = [...blogPosts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 8);

    const placeholderImage = "https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=2070&auto=format&fit=crop";

    if (sortedPosts.length === 0) {
        return null;
    }

    return (
        <section className="py-16 overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        From Our Blog
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Latest articles, tips, and insights from our team.
                    </p>
                </motion.div>
            </div>

            <div className="relative">
                <div className="flex space-x-8 overflow-x-auto pb-8 scrollbar-hide px-4 sm:px-6 lg:px-8">
                    {sortedPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex-shrink-0 w-80"
                        >
                            <Link to={`/blog/${post.slug}`} className="block group bg-secondary/30 rounded-2xl overflow-hidden border border-border h-full flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                <div className="overflow-hidden h-40">
                                    <img src={post.featuredImageUrl || placeholderImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <span className="text-xs font-semibold text-brand mb-2 inline-block">{getCategoryName(post.categoryId)}</span>
                                        <h3 className="text-md font-bold text-foreground group-hover:text-brand transition-colors mb-2 line-clamp-2">{post.title}</h3>
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
                 <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
                 <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            </div>
        </section>
    );
};

export default BlogSlider;
