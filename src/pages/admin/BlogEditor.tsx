import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { useLetterContext } from '../../context/LetterContext';
import { BlogPost } from '../../types';
import { Save } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';

const BlogEditor: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { blogPosts, blogCategories, addBlogPost, updateBlogPost } = useAdminData();
    const { currentUser } = useLetterContext();

    const [post, setPost] = useState<Partial<BlogPost>>({
        title: '',
        slug: '',
        content: '',
        categoryId: '',
        featuredImageUrl: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
    });

    const isNewPost = !postId;

    useEffect(() => {
        if (!isNewPost) {
            const existingPost = blogPosts.find(p => p.id === postId);
            if (existingPost) {
                setPost(existingPost);
            }
        }
    }, [postId, blogPosts, isNewPost]);

    const handleChange = (field: keyof Partial<BlogPost>, value: string) => {
        setPost(prev => ({ ...prev, [field]: value }));
    };

    const handleContentChange = (content: string) => {
        setPost(prev => ({ ...prev, content }));
    };

    const handleSave = () => {
        if (!post.title || !post.slug || !post.categoryId) {
            alert('Title, Slug, and Category are required.');
            return;
        }

        const postData = {
            ...post,
            authorId: currentUser!.id,
        } as Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;

        if (isNewPost) {
            addBlogPost(postData);
        } else {
            updateBlogPost({ ...postData, id: postId, createdAt: post.createdAt || new Date() } as BlogPost);
        }
        navigate('/admin/blog/posts');
    };

    const inputClass = "w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:ring-brand focus:outline-none";

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">{isNewPost ? 'Create New Blog Post' : 'Edit Blog Post'}</h1>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-secondary/30 border border-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Main Content</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Post Title</label>
                                <input type="text" value={post.title || ''} onChange={(e) => handleChange('title', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Content</label>
                                <RichTextEditor content={post.content || ''} onChange={handleContentChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-secondary/30 border border-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Post Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Slug</label>
                                <input type="text" value={post.slug || ''} onChange={(e) => handleChange('slug', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                                <select value={post.categoryId || ''} onChange={(e) => handleChange('categoryId', e.target.value)} className={inputClass}>
                                    <option value="">Select a category</option>
                                    {blogCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Featured Image URL</label>
                                <input type="text" value={post.featuredImageUrl || ''} onChange={(e) => handleChange('featuredImageUrl', e.target.value)} className={inputClass} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary/30 border border-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">SEO</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Meta Title</label>
                                <input type="text" value={post.metaTitle || ''} onChange={(e) => handleChange('metaTitle', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Meta Description</label>
                                <textarea value={post.metaDescription || ''} onChange={(e) => handleChange('metaDescription', e.target.value)} rows={3} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">Meta Keywords (comma-separated)</label>
                                <input type="text" value={post.metaKeywords || ''} onChange={(e) => handleChange('metaKeywords', e.target.value)} className={inputClass} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2">
                    <Save className="h-5 w-5" />
                    <span>Save Post</span>
                </button>
            </div>
        </div>
    );
};

export default BlogEditor;
