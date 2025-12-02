import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, Rss, ChevronDown } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const [isBlogOpen, setIsBlogOpen] = useState(true);

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/pages', label: 'Pages', icon: FileText },
  ];

  const blogNavItems = [
    { to: '/admin/blog/posts', label: 'Posts' },
    { to: '/admin/blog/categories', label: 'Categories' },
  ];

  const linkClasses = "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium";
  const activeLinkClasses = "bg-brand text-white shadow-lg";
  const inactiveLinkClasses = "text-muted-foreground hover:bg-accent hover:text-foreground";

  return (
    <aside className="bg-secondary/30 rounded-xl shadow-lg border border-border p-4">
      <nav className="space-y-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <div>
          <button onClick={() => setIsBlogOpen(!isBlogOpen)} className={`${linkClasses} w-full justify-between ${inactiveLinkClasses}`}>
            <div className="flex items-center space-x-3">
              <Rss className="h-5 w-5" />
              <span>Blog</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isBlogOpen ? 'rotate-180' : ''}`} />
          </button>
          {isBlogOpen && (
            <div className="pl-6 mt-2 space-y-1">
              {blogNavItems.map(item => (
                 <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `block px-4 py-2 text-sm rounded-md ${isActive ? 'text-brand font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <NavLink to="/admin/settings" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
