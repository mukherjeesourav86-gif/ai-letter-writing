import React, { useRef, useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { useAdminData } from '../../context/AdminDataContext';
import { useLetterContext } from '../../context/LetterContext';
import { Save, Download, Upload, Trash2, PlusCircle } from 'lucide-react';
import { FooterLink, SocialLink } from '../../types';

const Settings: React.FC = () => {
  const { 
    siteName, setSiteName, footerTagline, setFooterTagline, footerQuickLinks, setFooterQuickLinks, 
    footerSocialLinks, setFooterSocialLinks, footerCopyright, setFooterCopyright, 
  } = useSite();
  
  const { sitePages, setSitePages, blogPosts, setBlogPosts, blogCategories, setBlogCategories } = useAdminData();
  const { allUsers, setAllUsers } = useLetterContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tempSiteName, setTempSiteName] = useState(siteName);
  const [tempFooterTagline, setTempFooterTagline] = useState(footerTagline);
  const [tempQuickLinks, setTempQuickLinks] = useState<FooterLink[]>([]);
  const [tempSocialLinks, setTempSocialLinks] = useState<SocialLink[]>([]);
  const [tempCopyright, setTempCopyright] = useState(footerCopyright);

  useEffect(() => {
    setTempSiteName(siteName);
    setTempFooterTagline(footerTagline);
    setTempQuickLinks(footerQuickLinks);
    setTempSocialLinks(footerSocialLinks);
    setTempCopyright(footerCopyright);
  }, [siteName, footerTagline, footerQuickLinks, footerSocialLinks, footerCopyright]);

  const handleSave = () => {
    setSiteName(tempSiteName);
    setFooterTagline(tempFooterTagline);
    setFooterQuickLinks(tempQuickLinks);
    setFooterSocialLinks(tempSocialLinks);
    setFooterCopyright(tempCopyright);
    alert('Site settings saved!');
  };

  const handleBackup = () => {
    const backupData = {
      siteSettings: {
        siteName: tempSiteName, 
        footerTagline: tempFooterTagline, 
        footerQuickLinks: tempQuickLinks, 
        footerSocialLinks: tempSocialLinks, 
        footerCopyright: tempCopyright
      },
      users: allUsers,
      sitePages,
      blogPosts,
      blogCategories,
      backupDate: new Date().toISOString(),
    };
    const jsonString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lettercraft-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error('Invalid file content');
        const data = JSON.parse(text);

        if (window.confirm('Are you sure you want to restore from this backup? This will overwrite all current data.')) {
          if (data.siteSettings) {
            setSiteName(data.siteSettings.siteName || siteName);
            setFooterTagline(data.siteSettings.footerTagline || footerTagline);
            setFooterQuickLinks(data.siteSettings.footerQuickLinks || footerQuickLinks);
            setFooterSocialLinks(data.siteSettings.footerSocialLinks || footerSocialLinks);
            setFooterCopyright(data.siteSettings.footerCopyright || footerCopyright);
          }
          if (data.users) setAllUsers(data.users);
          if (data.sitePages) setSitePages(data.sitePages);
          if (data.blogPosts) setBlogPosts(data.blogPosts);
          if (data.blogCategories) setBlogCategories(data.blogCategories);
          
          alert('Data restored successfully!');
        }
      } catch (error) {
        console.error('Failed to restore data:', error);
        alert('Failed to read or parse the backup file. Please ensure it is a valid JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  const handleQuickLinkChange = (index: number, field: keyof FooterLink, value: string) => {
    const newLinks = [...tempQuickLinks];
    newLinks[index][field] = value;
    setTempQuickLinks(newLinks);
  };
  const removeQuickLink = (index: number) => setTempQuickLinks(tempQuickLinks.filter((_, i) => i !== index));
  const addQuickLink = () => setTempQuickLinks([...tempQuickLinks, { label: 'new_link', path: '/new-path' }]);

  const handleSocialLinkChange = (index: number, field: keyof Omit<SocialLink, 'id'>, value: string) => {
    const newLinks = [...tempSocialLinks];
    (newLinks[index] as any)[field] = value;
    setTempSocialLinks(newLinks);
  };
  const removeSocialLink = (index: number) => setTempSocialLinks(tempSocialLinks.filter((_, i) => i !== index));
  const addSocialLink = () => setTempSocialLinks([...tempSocialLinks, { id: `social-${Date.now()}`, platform: 'Twitter', href: '#' }]);

  const inputClass = "w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:ring-brand focus:outline-none";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
        <p className="text-muted-foreground">Manage general website settings and content.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-secondary/30 border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Site Name</label>
              <input type="text" value={tempSiteName} onChange={(e) => setTempSiteName(e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Footer Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Footer Tagline</label>
              <input type="text" value={tempFooterTagline} onChange={(e) => setTempFooterTagline(e.target.value)} className={inputClass} />
            </div>
             <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Copyright Text</label>
              <input type="text" value={tempCopyright} onChange={(e) => setTempCopyright(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Quick Links</label>
              <div className="space-y-2">
                {tempQuickLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input type="text" placeholder="Label Key (e.g., nav_home)" value={link.label} onChange={(e) => handleQuickLinkChange(index, 'label', e.target.value)} className={inputClass} />
                    <input type="text" placeholder="Path (e.g., /)" value={link.path} onChange={(e) => handleQuickLinkChange(index, 'path', e.target.value)} className={inputClass} />
                    <button onClick={() => removeQuickLink(index)} className="p-2 text-red-500 hover:bg-accent rounded-md"><Trash2 className="h-4 w-4"/></button>
                  </div>
                ))}
              </div>
              <button onClick={addQuickLink} className="mt-2 text-sm text-brand hover:underline flex items-center gap-1"><PlusCircle className="h-4 w-4"/>Add Quick Link</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Social Media Links</label>
              <div className="space-y-2">
                {tempSocialLinks.map((link, index) => (
                  <div key={link.id} className="flex gap-2 items-center">
                    <select value={link.platform} onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)} className={inputClass}>
                      <option>Twitter</option>
                      <option>Linkedin</option>
                      <option>Github</option>
                      <option>Facebook</option>
                      <option>YouTube</option>
                    </select>
                    <input type="text" placeholder="Full URL" value={link.href} onChange={(e) => handleSocialLinkChange(index, 'href', e.target.value)} className={inputClass} />
                    <button onClick={() => removeSocialLink(index)} className="p-2 text-red-500 hover:bg-accent rounded-md"><Trash2 className="h-4 w-4"/></button>
                  </div>
                ))}
              </div>
              <button onClick={addSocialLink} className="mt-2 text-sm text-brand hover:underline flex items-center gap-1"><PlusCircle className="h-4 w-4"/>Add Social Link</button>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Backup & Restore</h3>
          <p className="text-sm text-muted-foreground mb-4">Download a backup of all your site data or restore from a previous backup file.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleBackup} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"><Download className="h-4 w-4" /><span>Backup All Data</span></button>
            <button onClick={() => fileInputRef.current?.click()} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center space-x-2"><Upload className="h-4 w-4" /><span>Restore from Backup</span></button>
            <input type="file" ref={fileInputRef} onChange={handleRestore} className="hidden" accept=".json" />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={handleSave} className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2"><Save className="h-4 w-4" /><span>Save All Settings</span></button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
