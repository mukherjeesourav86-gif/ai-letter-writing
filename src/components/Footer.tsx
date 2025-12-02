import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Twitter, Linkedin, Github, Facebook, Youtube } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { siteName, footerTagline, footerQuickLinks, footerSocialLinks, footerCopyright } = useSite();

  const socialIcons: { [key: string]: React.ElementType } = {
    Twitter, Linkedin, Github, Facebook, Youtube
  };

  const allQuickLinks = [...footerQuickLinks, { label: 'Blog', path: '/blog' }];

  return (
    <footer className="bg-secondary/30 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <PenTool className="h-8 w-8 text-brand" />
              <span className="text-2xl font-bold text-foreground">{siteName}</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {footerTagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">{t('footer_quick_links')}</h3>
            <ul className="mt-4 space-y-2">
              {allQuickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-base text-muted-foreground hover:text-primary transition-colors">
                    {link.label === 'Blog' ? 'Blog' : t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">{t('footer_legal')}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy-policy" className="text-base text-muted-foreground hover:text-primary transition-colors">{t('footer_privacy')}</Link></li>
              <li><Link to="/terms-of-service" className="text-base text-muted-foreground hover:text-primary transition-colors">{t('footer_terms')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">{t('footer_connect')}</h3>
            <div className="flex space-x-4 mt-4">
              {footerSocialLinks.map(social => {
                const Icon = socialIcons[social.platform];
                return Icon ? (
                  <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <span className="sr-only">{social.platform}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-base text-muted-foreground">&copy; {new Date().getFullYear()} {siteName}. {footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
