import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { SitePage } from '../../types';
import { Save } from 'lucide-react';

const PageEditor: React.FC = () => {
    const { pageId } = useParams<{ pageId: string }>();
    const navigate = useNavigate();
    const { sitePages, addPage, updatePage } = useAdminData();
    
    const [title, setTitle] = useState('');
    const [path, setPath] = useState('');
    const [content, setContent] = useState('');
    const [showAds, setShowAds] = useState(true);

    const isNewPage = !pageId;

    useEffect(() => {
        if (!isNewPage) {
            const page = sitePages.find(p => p.id === pageId);
            if (page) {
                setTitle(page.title);
                setPath(page.path);
                setContent(page.content);
                setShowAds(page.showAds);
            }
        }
    }, [pageId, sitePages, isNewPage]);

    const handleSave = () => {
        if (!title || !path) {
            alert('Title and Path are required.');
            return;
        }
        const pageData = { title, path: path.startsWith('/') ? path : `/${path}`, content, showAds };
        if (isNewPage) {
            addPage(pageData);
        } else {
            updatePage({ ...pageData, id: pageId, lastModified: new Date() });
        }
        navigate('/admin/pages');
    };

    const inputClass = "w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:ring-brand focus:outline-none";

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">{isNewPage ? 'Create New Page' : 'Edit Page'}</h1>
                <p className="text-muted-foreground">Fill in the details for your custom page.</p>
            </div>
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Page Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Page Path</label>
                        <div className="flex items-center">
                            <span className="px-3 py-2 bg-muted border border-r-0 border-border rounded-l-lg text-muted-foreground">/</span>
                            <input type="text" value={path.replace('/', '')} onChange={(e) => setPath(`/${e.target.value}`)} className={`${inputClass} rounded-l-none`} />
                        </div>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Content (HTML supported)</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={15} className={`${inputClass} font-mono`} />
                </div>
                <div>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={showAds} onChange={(e) => setShowAds(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand" />
                        <span className="text-sm text-muted-foreground">Show Ads on this page</span>
                    </label>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2">
                    <Save className="h-5 w-5" />
                    <span>Save Page</span>
                </button>
            </div>
        </div>
    );
};

export default PageEditor;
