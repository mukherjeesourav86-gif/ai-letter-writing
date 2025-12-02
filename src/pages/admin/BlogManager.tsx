import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { useLetterContext } from '../../context/LetterContext';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const BlogManager: React.FC = () => {
    const { blogPosts, deleteBlogPost, blogCategories } = useAdminData();
    const { allUsers } = useLetterContext();

    const getCategoryName = (id: string) => blogCategories.find(c => c.id === id)?.name || 'Uncategorized';
    const getAuthorName = (id: string) => allUsers.find(u => u.id === id)?.name || 'Unknown';

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
                    <p className="text-muted-foreground">Manage all blog posts.</p>
                </div>
                <Link to="/admin/blog/posts/new" className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2">
                    <PlusCircle className="h-5 w-5" />
                    <span>Create Post</span>
                </Link>
            </div>

            <div className="bg-secondary/30 border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary border-b border-border">
                            <tr>
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium">Category</th>
                                <th className="px-6 py-3 font-medium">Author</th>
                                <th className="px-6 py-3 font-medium">Last Modified</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogPosts.map(post => (
                                <tr key={post.id} className="border-b border-border hover:bg-accent/50">
                                    <td className="px-6 py-4 font-semibold">{post.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{getCategoryName(post.categoryId)}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{getAuthorName(post.authorId)}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{new Date(post.updatedAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/blog/${post.slug}`} target="_blank" className="p-2 text-muted-foreground hover:text-brand">View</Link>
                                        <Link to={`/admin/blog/posts/edit/${post.id}`} className="p-2 text-muted-foreground hover:text-brand"><Edit className="h-4 w-4"/></Link>
                                        <button onClick={() => window.confirm(`Delete "${post.title}"?`) && deleteBlogPost(post.id)} className="p-2 text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BlogManager;
