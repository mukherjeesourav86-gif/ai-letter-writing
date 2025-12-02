import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';

interface UserCreateModalProps {
  onClose: () => void;
  onSave: (newUser: { name: string; email: string; password?: string; role: 'user' }) => void;
}

const UserCreateModal: React.FC<UserCreateModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'user'; // Simplified for rollback

  const handleSave = () => {
    if (!name || !email || !password) {
      alert('Name, Email, and Password are required.');
      return;
    }
    onSave({ name, email, password, role });
  };

  const inputClass = "w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:ring-brand focus:outline-none";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-secondary/80 rounded-xl shadow-xl max-w-lg w-full p-6 border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">Create New User</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-accent"><X className="h-5 w-5"/></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required />
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={onClose} className="bg-muted text-foreground border border-border font-semibold py-2 px-4 rounded-lg hover:bg-accent transition">Cancel</button>
          <button onClick={handleSave} className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Create User</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserCreateModal;
