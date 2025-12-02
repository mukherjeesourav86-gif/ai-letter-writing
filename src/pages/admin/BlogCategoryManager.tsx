import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { BlogCategory } from '../../types';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

const BlogCategoryManager: React.FC = () => {
  const { blogCategories, addBlogCategory, updateBlogCategory, deleteBlogCategory } = useAdminData();
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });

  const handleSave = () => {
    if (editingCategory) {
      updateBlogCategory(editingCategory);
      setEditingCategory(null);
    } else {
      if (!newCategory.name || !newCategory.slug) {
        alert('Name and Slug are required for new categories.');
        return;
      }
      addBlogCategory(newCategory);
      setNewCategory({ name: '', slug: '', description: '' });
    }
  };

  const startEditing = (category: BlogCategory) => {
    setEditingCategory({ ...category });
  };

  const inputClass = "w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:ring-brand focus:outline-none";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Blog Categories</h1>
        <p className="text-muted-foreground">Manage your blog post categories.</p>
      </div>

      <div className="bg-secondary/30 border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Category Name" value={editingCategory ? editingCategory.name : newCategory.name} onChange={(e) => editingCategory ? setEditingCategory({ ...editingCategory, name: e.target.value }) : setNewCategory({ ...newCategory, name: e.target.value })} className={inputClass} />
          <input type="text" placeholder="Category Slug" value={editingCategory ? editingCategory.slug : newCategory.slug} onChange={(e) => editingCategory ? setEditingCategory({ ...editingCategory, slug: e.target.value }) : setNewCategory({ ...newCategory, slug: e.target.value })} className={inputClass} />
        </div>
        <textarea placeholder="Description" value={editingCategory ? editingCategory.description : newCategory.description} onChange={(e) => editingCategory ? setEditingCategory({ ...editingCategory, description: e.target.value }) : setNewCategory({ ...newCategory, description: e.target.value })} className={`${inputClass} min-h-[80px]`} />
        <div className="flex justify-end gap-2 mt-4">
          {editingCategory && <button onClick={() => setEditingCategory(null)} className="bg-muted text-foreground border border-border font-semibold py-2 px-4 rounded-lg hover:bg-accent transition">Cancel</button>}
          <button onClick={handleSave} className="bg-brand text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-700 transition flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>{editingCategory ? 'Save Changes' : 'Add Category'}</span>
          </button>
        </div>
      </div>

      <div className="bg-secondary/30 border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Slug</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogCategories.map((cat) => (
              <tr key={cat.id} className="border-b border-border hover:bg-accent/50">
                <td className="px-6 py-4 font-semibold">{cat.name}</td>
                <td className="px-6 py-4 text-muted-foreground">/blog/category/{cat.slug}</td>
                <td className="px-6 py-4 text-muted-foreground">{cat.description}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => startEditing(cat)} className="p-2 text-muted-foreground hover:text-brand"><Edit className="h-4 w-4" /></button>
                  <button onClick={() => window.confirm(`Delete "${cat.name}"?`) && deleteBlogCategory(cat.id)} className="p-2 text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogCategoryManager;
