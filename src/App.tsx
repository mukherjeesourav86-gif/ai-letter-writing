import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { LetterProvider } from './context/LetterContext';
import { LanguageProvider } from './context/LanguageContext';
import { SiteProvider } from './context/SiteContext';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LetterGenerator from './pages/LetterGenerator';
import Templates from './pages/Templates';
import Account from './pages/Account';
import HowToWrite from './pages/HowToWrite';
import IndianLanguagesSection from './components/IndianLanguagesSection';
import ManualEditor from './pages/ManualEditor';
import RunningLetterboxAnimation from './components/RunningLetterboxAnimation';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import BlogSlider from './components/BlogSlider';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManager from './pages/admin/UserManager';
import PageManager from './pages/admin/PageManager';
import PageEditor from './pages/admin/PageEditor';
import Settings from './pages/admin/Settings';
import BlogManager from './pages/admin/BlogManager';
import BlogEditor from './pages/admin/BlogEditor';
import BlogCategoryManager from './pages/admin/BlogCategoryManager';
import HtmlRenderer from './components/HtmlRenderer';

const CustomPage: React.FC = () => {
    const { pagePath } = useParams<{ pagePath: string }>();
    const { sitePages } = useAdminData();
    const page = sitePages.find(p => p.path === `/${pagePath}`);

    if (!page) {
        return <div className="text-center py-20">404 - Page Not Found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
            <div className="prose dark:prose-invert max-w-none">
                <HtmlRenderer htmlContent={page.content} />
            </div>
        </div>
    );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="no-print">
        <Navbar />
        <RunningLetterboxAnimation />
      </div>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<LetterGenerator />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/editor/:templateId" element={<ManualEditor />} />
          <Route path="/how-to-write" element={<HowToWrite />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/account" element={<Account />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManager />} />
            <Route path="pages" element={<PageManager />} />
            <Route path="pages/new" element={<PageEditor />} />
            <Route path="pages/edit/:pageId" element={<PageEditor />} />
            <Route path="blog/posts" element={<BlogManager />} />
            <Route path="blog/posts/new" element={<BlogEditor />} />
            <Route path="blog/posts/edit/:postId" element={<BlogEditor />} />
            <Route path="blog/categories" element={<BlogCategoryManager />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/:pagePath" element={<CustomPage />} />
        </Routes>
      </main>
      <div className="no-print">
        {isHomePage && <BlogSlider />}
        <IndianLanguagesSection />
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <SiteProvider>
        <AdminDataProvider>
          <LetterProvider>
            <Router>
              <AppContent />
            </Router>
          </LetterProvider>
        </AdminDataProvider>
      </SiteProvider>
    </LanguageProvider>
  );
}

export default App;
