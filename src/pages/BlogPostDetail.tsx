import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdminData } from '../context/AdminDataContext';
import { useLetterContext } from '../context/LetterContext';
import HtmlRenderer from '../components/HtmlRenderer';
import { Calendar, User } from 'lucide-react';
import RelatedPosts from '../components/RelatedPosts';
import ActionCardsSection from '../components/ActionCardsSection';

const BlogPostDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { blogPosts, blogCategories } = useAdminData();
    const { allUsers } = useLetterContext();

    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <div className="text-center py-20">404 - Post Not Found</div>;
    }

    const author = allUsers.find(u => u.id === post.authorId);
    const category = blogCategories.find(c => c.id === post.categoryId);
    const placeholderImage = "https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=2070&auto=format&fit=crop";

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <article className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        {category && (
                            <Link to={`/blog/category/${category.slug}`} className="text-base font-semibold text-brand hover:underline">
                                {category.name}
                            </Link>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">{post.title}</h1>
                        <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
                            {author && <span className="flex items-center gap-2"><User className="h-4 w-4"/>By {author.name}</span>}
                            <span className="flex items-center gap-2"><Calendar className="h-4 w-4"/>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </header>

                    {post.featuredImageUrl && (
                        <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
                            <img src={post.featuredImageUrl || placeholderImage} alt={post.title} className="w-full h-auto object-cover"/>
                        </div>
                    )}
                    
                    <div className="prose dark:prose-invert max-w-none prose-lg">
                        <HtmlRenderer htmlContent={post.content} />
                    </div>
                </article>

                <RelatedPosts currentPostId={post.id} currentCategoryId={post.categoryId} />
                
                <div className="mt-16">
                  <ActionCardsSection />
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetail;
