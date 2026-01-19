'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, X, Eye, FileText, Check, Globe, Upload, Image as ImageIcon } from 'lucide-react';

export default function BlogsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [blogs, setBlogs] = useState<Array<any>>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState<string | number | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        mainImage: '',
        author: 'Admin',
        category: 'Travel',
        tags: '',
        published: false,
        featured: false,
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from title if it's empty or hasn't been manually edited much
            if (name === 'title' && !isEditing) {
                newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }
            return newData;
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            mainImage: '',
            author: 'Admin',
            category: 'Travel',
            tags: '',
            published: false,
            featured: false,
        });
        setIsEditing(false);
        setSelectedBlogId(null);
    };

    const handleEdit = (blog: any) => {
        setFormData({
            ...blog,
            tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || ''),
        });
        setSelectedBlogId(blog.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBlogs(blogs.filter(b => b.id !== id));
            } else {
                alert('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setFormData(prev => ({ ...prev, mainImage: data.url }));
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Upload error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        };

        try {
            const url = isEditing ? `/api/blogs/${selectedBlogId}` : '/api/blogs';
            const res = await fetch(url, {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setShowModal(false);
                resetForm();
                fetchBlogs();
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to save blog');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-[#f8fafc] min-h-screen">
            {/* Slim Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Blogs
                    </h1>
                    <p className="text-[12px] text-slate-500">Manage your editorial content</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-md hover:opacity-90 transition-all text-xs font-medium shadow-sm"
                >
                    <Plus className="w-3.5 h-3.5" />
                    New Post
                </button>
            </div>

            {/* Smart Toolbar */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md flex-1 shadow-sm focus-within:border-primary transition-colors">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-[13px] flex-1 text-slate-600"
                    />
                </div>
            </div>

            {/* Slim Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                            <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Author</th>
                            <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading && blogs.length === 0 ? (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">Loading posts...</td></tr>
                        ) : blogs.length === 0 ? (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">No posts found</td></tr>
                        ) : (
                            blogs.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())).map((blog) => (
                                <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-2.5">
                                        <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${blog.published ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                            <div className={`w-1 h-1 rounded-full ${blog.published ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                            {blog.published ? 'Published' : 'Draft'}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <div className="text-[13px] font-medium text-slate-700 truncate max-w-[300px]">{blog.title}</div>
                                        <div className="text-[10px] text-slate-400 truncate max-w-[200px]">/{blog.slug}</div>
                                    </td>
                                    <td className="px-4 py-2.5 text-[12px] text-slate-600">{blog.category}</td>
                                    <td className="px-4 py-2.5 text-[12px] text-slate-600">{blog.author}</td>
                                    <td className="px-4 py-2.5 text-[11px] text-slate-400">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2.5 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(blog)} className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-primary transition-colors cursor-pointer">
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDelete(blog.id)} className="p-1 hover:bg-red-50 rounded text-slate-500 hover:text-red-500 transition-colors cursor-pointer">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Smart & Slim Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
                        {/* Modal Header */}
                        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-primary/10 rounded-md flex items-center justify-center">
                                    <Edit className="w-4 h-4 text-primary" />
                                </div>
                                <h2 className="text-[14px] font-semibold text-slate-800">{isEditing ? 'Edit Post' : 'New Post'}</h2>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-slate-200 rounded-md transition-colors cursor-pointer text-slate-400 hover:text-slate-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                            <div className="p-5 grid grid-cols-12 gap-5">
                                {/* Main Content Column */}
                                <div className="col-span-12 lg:col-span-8 space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Main Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter post title..."
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 shadow-sm"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Slug URL</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-200 bg-slate-50 text-slate-400 text-[11px]">/</span>
                                            <input
                                                type="text"
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleInputChange}
                                                placeholder="post-url-slug"
                                                required
                                                className="flex-1 min-w-0 px-3 py-2 border border-slate-200 rounded-r-md text-[13px] focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Content Body</label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            rows={10}
                                            placeholder="Write your story..."
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 shadow-sm font-sans leading-relaxed"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Short Excerpt</label>
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleInputChange}
                                            rows={2}
                                            placeholder="Brief summary for indexing..."
                                            className="w-full px-3 py-2 border border-slate-200 rounded-md text-[12px] focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 shadow-sm text-slate-600"
                                        />
                                    </div>
                                </div>

                                {/* Sidebar Column */}
                                <div className="col-span-12 lg:col-span-4 space-y-4">
                                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-3 space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight flex items-center justify-between">
                                                Cover Image
                                                {uploading && <span className="text-[10px] text-primary animate-pulse italic">Uploading...</span>}
                                            </label>
                                            <div className="relative group/img aspect-video bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:border-primary transition-all">
                                                {formData.mainImage ? (
                                                    <>
                                                        <img src={formData.mainImage} alt="Preview" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="text-white text-[10px] font-bold flex flex-col items-center gap-1">
                                                                <Upload className="w-4 h-4" />
                                                                CHANGE IMAGE
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-slate-400 flex flex-col items-center gap-2">
                                                        <ImageIcon className="w-6 h-6 opacity-30" />
                                                        <span className="text-[10px] font-medium">Click to upload</span>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                name="mainImage"
                                                value={formData.mainImage}
                                                onChange={handleInputChange}
                                                placeholder="Or paste image URL..."
                                                className="w-full px-2 py-1.5 border border-slate-200 rounded-md text-[11px] focus:outline-none focus:border-primary transition-colors mt-2"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange as any}
                                                className="w-full px-2 py-1.5 border border-slate-200 rounded-md text-[12px] focus:outline-none focus:border-primary transition-colors bg-white shadow-sm"
                                            >
                                                <option value="Travel">Travel</option>
                                                <option value="Guides">Guides</option>
                                                <option value="Hotels">Hotels</option>
                                                <option value="Deals">Deals</option>
                                                <option value="Lifestyle">Lifestyle</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Tags (comma-separated)</label>
                                            <input
                                                type="text"
                                                name="tags"
                                                value={formData.tags}
                                                onChange={handleInputChange}
                                                placeholder="tag1, tag2..."
                                                className="w-full px-2 py-1.5 border border-slate-200 rounded-md text-[11px] focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-3 space-y-2.5">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="published"
                                                checked={formData.published}
                                                onChange={handleCheckboxChange}
                                                className="w-3.5 h-3.5 rounded text-primary border-slate-300 focus:ring-primary transition-all"
                                            />
                                            <span className="text-[12px] text-slate-600 font-medium group-hover:text-slate-800 transition-colors">Publish immediately</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="featured"
                                                checked={formData.featured}
                                                onChange={handleCheckboxChange}
                                                className="w-3.5 h-3.5 rounded text-primary border-slate-300 focus:ring-primary transition-all"
                                            />
                                            <span className="text-[12px] text-slate-600 font-medium group-hover:text-slate-800 transition-colors">Featured Post</span>
                                        </label>
                                    </div>

                                    {/* Categorization & Visibility */}
                                    <div className="border border-slate-100 rounded-lg p-3 bg-white shadow-sm space-y-3">
                                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <Check className="w-3 h-3 text-slate-300" />
                                            Settings
                                        </h3>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Author Name</label>
                                            <input
                                                type="text"
                                                name="author"
                                                value={formData.author}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1.5 border border-slate-200 rounded-md text-[11px] focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Footer for Form */}
                            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2 sticky bottom-0">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-1.5 text-[12px] font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-md transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-1.5 bg-primary text-white text-[12px] font-semibold rounded-md hover:bg-primary-hover shadow-md shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                                >
                                    {loading ? (
                                        <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : <Check className="w-3.5 h-3.5" />}
                                    {isEditing ? 'Sync Changes' : 'Create Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .bg-primary { background-color: #0ea5e9; }
                .text-primary { color: #0ea5e9; }
                .border-primary { border-color: #0ea5e9; }
                .hover\:bg-primary-hover:hover { background-color: #0284c7; }
                .shadow-primary\/20 { shadow-color: rgba(14, 165, 233, 0.2); }
            `}</style>
        </div>
    );
}
