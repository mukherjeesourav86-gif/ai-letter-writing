import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FooterLink, SocialLink } from '../types';

interface SiteContextType {
  siteName: string;
  setSiteName: (name: string) => void;
  footerTagline: string;
  setFooterTagline: (tagline: string) => void;
  footerCopyright: string;
  setFooterCopyright: (copyright: string) => void;
  footerQuickLinks: FooterLink[];
  setFooterQuickLinks: (links: FooterLink[]) => void;
  footerSocialLinks: SocialLink[];
  setFooterSocialLinks: (links: SocialLink[]) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const useSite = () => {
    const context = useContext(SiteContext);
    if (!context) throw new Error('useSite must be used within a SiteProvider');
    return context;
};

const initialSettings = {
  siteName: 'LetterCraft AI',
  footerTagline: 'Generate professional letters in seconds with the power of AI.',
  footerCopyright: 'All rights reserved.',
  footerQuickLinks: [
    { label: 'nav_home', path: '/' },
    { label: 'nav_generator', path: '/generator' },
    { label: 'nav_templates', path: '/templates' },
    { label: 'nav_how_to_write', path: '/how-to-write' },
  ],
  footerSocialLinks: [
    { id: 'social-1', platform: 'Twitter' as const, href: '#' },
    { id: 'social-2', platform: 'Linkedin' as const, href: '#' },
    { id: 'social-3', platform: 'Github' as const, href: '#' },
    { id: 'social-4', platform: 'Facebook' as const, href: '#' },
    { id: 'social-5', platform: 'YouTube' as const, href: '#' },
  ],
};

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [siteName, setSiteName] = useState<string>(() => localStorage.getItem('siteName') || initialSettings.siteName);
    const [footerTagline, setFooterTagline] = useState<string>(() => localStorage.getItem('footerTagline') || initialSettings.footerTagline);
    const [footerCopyright, setFooterCopyright] = useState<string>(() => localStorage.getItem('footerCopyright') || initialSettings.footerCopyright);
    const [footerQuickLinks, setFooterQuickLinks] = useState<FooterLink[]>(() => JSON.parse(localStorage.getItem('footerQuickLinks') || JSON.stringify(initialSettings.footerQuickLinks)));
    const [footerSocialLinks, setFooterSocialLinks] = useState<SocialLink[]>(() => JSON.parse(localStorage.getItem('footerSocialLinks') || JSON.stringify(initialSettings.footerSocialLinks)));

    useEffect(() => { localStorage.setItem('siteName', siteName); }, [siteName]);
    useEffect(() => { localStorage.setItem('footerTagline', footerTagline); }, [footerTagline]);
    useEffect(() => { localStorage.setItem('footerCopyright', footerCopyright); }, [footerCopyright]);
    useEffect(() => { localStorage.setItem('footerQuickLinks', JSON.stringify(footerQuickLinks)); }, [footerQuickLinks]);
    useEffect(() => { localStorage.setItem('footerSocialLinks', JSON.stringify(footerSocialLinks)); }, [footerSocialLinks]);

    return (
        <SiteContext.Provider value={{
            siteName, setSiteName,
            footerTagline, setFooterTagline,
            footerCopyright, setFooterCopyright,
            footerQuickLinks, setFooterQuickLinks,
            footerSocialLinks, setFooterSocialLinks,
        }}>
            {children}
        </SiteContext.Provider>
    );
};
