import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PenTool, FileText, LayoutTemplate, User, BookOpen, LogOut, ShieldCheck, Rss } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../context/LanguageContext';
import { useLetterContext } from '../context/LetterContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser, logout } = useLetterContext();

  const navItems = [
    { path: '/', label: 'nav_home', icon: PenTool },
    { path: '/generator', label: 'nav_generator', icon: FileText },
    { path: '/templates', label: 'nav_templates', icon: LayoutTemplate },
    { path: '/how-to-write', label: 'nav_how_to_write', icon: BookOpen },
    { path: '/blog', label: 'Blog', icon: Rss },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <AnimatedLogo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {label === 'Blog' ? 'Blog' : t(label)}
                {location.pathname === path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
             {currentUser?.role === 'admin' && (
              <Link to="/admin" className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Admin
                {location.pathname.startsWith('/admin') && (
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" layoutId="underline" />
                )}
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <LanguageSelector />
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground hidden sm:block">Hi, {currentUser.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors" title="Logout">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/account" className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors" title="Account">
                <User className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
