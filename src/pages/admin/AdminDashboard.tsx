import React from 'react';
import { useLetterContext } from '../../context/LetterContext';
import { useAdminData } from '../../context/AdminDataContext';
import { Users, FileText } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: number | string; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <div className="bg-secondary/50 border border-border rounded-lg p-6 flex items-center space-x-4">
        <div className="p-3 bg-brand/10 rounded-full">
            <Icon className="h-8 w-8 text-brand" />
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const { currentUser, allUsers } = useLetterContext();
    const { sitePages } = useAdminData();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, {currentUser?.name}!</h1>
                <p className="text-muted-foreground">Here's a quick overview of your site.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Users" value={allUsers.length} icon={Users} />
                <StatCard title="Total Pages" value={sitePages.length} icon={FileText} />
            </div>
        </div>
    );
};

export default AdminDashboard;
