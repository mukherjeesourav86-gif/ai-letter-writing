import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { SitePage } from '../../types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const PageManager: React.FC = () => {
    const { sitePages, deletePage } = useAdminData();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Page Management</h1>
                    <p className="text-muted-foreground">Manage custom website pages.</p>
                </div>
                <Link to="/admin/pages/new" className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2">
                    <PlusCircle className="h-5 w-5" />
                    <span>Create Page</span>
                </Link>
            </div>

            <div className="bg-secondary/30 border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary border-b border-border">
                            <tr>
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium">Path</th>
                                <th className="px-6 py-3 font-medium">Last Modified</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sitePages.map((page: SitePage) => (
                                <tr key={page.id} className="border-b border-border hover:bg-accent/50">
                                    <td className="px-6 py-4">{page.title}</td>
                                    <td className="px-6 py-4"><a href={page.path} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{page.path}</a></td>
                                    <td className="px-6 py-4">{new Date(page.lastModified).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/admin/pages/edit/${page.id}`} className="p-2 text-muted-foreground hover:text-brand"><Edit className="h-4 w-4"/></Link>
                                        <button onClick={() => window.confirm(`Delete "${page.title}"?`) && deletePage(page.id)} className="p-2 text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4"/></button>
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

export default PageManager;
