import React, { useState } from 'react';
import { useLetterContext } from '../../context/LetterContext';
import { User } from '../../types';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import UserCreateModal from '../../components/admin/UserCreateModal';
import UserEditModal from '../../components/admin/UserEditModal';

const UserManager: React.FC = () => {
    const { allUsers, deleteUser, registerUser, updateUser } = useLetterContext();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleCreateUser = (newUser: { name: string; email: string; password?: string; role: 'user' }) => {
        try {
            registerUser(newUser);
            setIsCreateModalOpen(false);
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Failed to create user');
        }
    };

    const handleUpdateUser = (updatedUser: User) => {
        updateUser(updatedUser);
        setEditingUser(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">User Management</h1>
                    <p className="text-muted-foreground">Manage all registered users.</p>
                </div>
                <button onClick={() => setIsCreateModalOpen(true)} className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2">
                    <PlusCircle className="h-5 w-5" />
                    <span>Create User</span>
                </button>
            </div>

            <div className="bg-secondary/30 border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary border-b border-border">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Email</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Created At</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user: User) => (
                                <tr key={user.id} className="border-b border-border hover:bg-accent/50">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{user.role}</span></td>
                                    <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => setEditingUser(user)} className="p-2 text-muted-foreground hover:text-brand"><Edit className="h-4 w-4"/></button>
                                        <button onClick={() => window.confirm(`Delete ${user.name}?`) && deleteUser(user.id)} className="p-2 text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isCreateModalOpen && <UserCreateModal onClose={() => setIsCreateModalOpen(false)} onSave={handleCreateUser} />}
            {editingUser && <UserEditModal user={editingUser} onClose={() => setEditingUser(null)} onSave={handleUpdateUser} />}
        </div>
    );
};

export default UserManager;
