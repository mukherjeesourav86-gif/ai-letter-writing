import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLetterContext } from '../context/LetterContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';
import AccountDetails from './AccountDetails';
import { useTranslation } from '../context/LanguageContext';

const Account: React.FC = () => {
  const { login, registerUser, currentUser } = useLetterContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        navigate('/admin');
      } else {
        // For regular users, you might redirect to a dashboard or stay on an account page.
        // Here, we are showing the AccountDetails component.
      }
    }
  }, [currentUser, navigate]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLoginView) {
      const user = login(email, password);
      if (!user) {
        setError(t('account_error_invalid_credentials'));
      }
    } else {
      if (!name || !email || !password) {
        setError(t('account_error_all_fields'));
        return;
      }
      try {
        const newUser = registerUser({ name, email, password });
        login(newUser.email, newUser.password || '');
        navigate('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : t('account_error_registration_failed'));
      }
    }
  };

  if (currentUser) {
    return (
      <div className="min-h-screen py-12 px-4">
        <AccountDetails />
      </div>
    );
  }

  const inputClass = "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-brand focus:outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="bg-secondary/30 rounded-xl shadow-2xl p-8 max-w-md w-full border border-border"
      >
        <div className="mx-auto mb-6 w-fit">
          <AnimatedLogo />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
          {isLoginView ? t('account_welcome_back') : t('account_create_account')}
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          {isLoginView ? t('account_sign_in_prompt') : t('account_sign_up_prompt')}
        </p>
        
        {error && <p className="bg-red-500/10 text-red-400 text-sm p-3 rounded-md mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">{t('account_full_name_label')}</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">{t('account_email_label')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">{t('account_password_label')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </div>
          <button type="submit" className="w-full bg-brand text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center justify-center space-x-2">
            {isLoginView ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
            <span>{isLoginView ? t('account_sign_in_button') : t('account_create_button')}</span>
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLoginView ? t('account_no_account_prompt') : t('account_has_account_prompt')}
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-brand hover:underline ml-1">
            {isLoginView ? t('account_sign_up_link') : t('account_sign_in_link')}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Account;
