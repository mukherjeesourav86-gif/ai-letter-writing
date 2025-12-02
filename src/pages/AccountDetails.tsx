import React, { useState } from 'react';
import { useLetterContext } from '../context/LetterContext';
import { Save } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const AccountDetails: React.FC = () => {
    const { currentUser, changePassword } = useLetterContext();
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    if (!currentUser) return null;

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: t('account_password_mismatch') });
            return;
        }
        if (!currentPassword || !newPassword) {
            setMessage({ type: 'error', text: t('account_error_all_fields') });
            return;
        }
        
        try {
            changePassword(currentUser.id, currentPassword, newPassword);
            setMessage({ type: 'success', text: t('account_password_success') });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage({ type: 'error', text: error instanceof Error ? error.message : 'An unknown error occurred.' });
        }
    };

    const inputClass = "w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:ring-brand focus:outline-none";

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">{t('account_my_account_title')}</h1>
                <p className="text-muted-foreground">{t('account_manage_settings')}</p>
            </div>
            <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{t('account_profile_info')}</h3>
                <div className="space-y-2 text-sm">
                    <p><strong>{t('account_name_label')}:</strong> {currentUser.name}</p>
                    <p><strong>{t('account_email_label')}:</strong> {currentUser.email}</p>
                    <p><strong>{t('account_role_label')}:</strong> <span className={`px-2 py-1 rounded-full text-xs ${currentUser.role === 'admin' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{currentUser.role}</span></p>
                </div>
            </div>
            <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{t('account_change_password_title')}</h3>
                {message && (
                    <p className={`p-3 rounded-md text-sm mb-4 ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {message.text}
                    </p>
                )}
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">{t('account_current_password_label')}</label>
                        <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className={inputClass} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">{t('account_new_password_label')}</label>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className={inputClass} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">{t('account_confirm_password_label')}</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={inputClass} required />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2">
                            <Save className="h-4 w-4" />
                            <span>{t('account_update_password_button')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountDetails;
