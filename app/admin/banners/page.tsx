'use client';

import { useEffect, useState } from 'react';
import { icons } from '@/assets/icons';
import toast from 'react-hot-toast';

export default function BannersPage() {
    const [banners, setBanners] = useState<Array<any>>([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBannerId, setSelectedBannerId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        image: '',
        link: '',
        isActive: true,
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/banners');
            const data = await res.json();
            if (data.success) {
                setBanners(data.data);
            }
        } catch (error) {
            console.error('Error fetching banners:', error);
            toast.error('Failed to fetch banners');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };

    const resetForm = () => {
        setFormData({
            image: '',
            link: '',
            isActive: true,
        });
        setIsEditing(false);
        setSelectedBannerId(null);
    };

    const handleEdit = (banner: any) => {
        setFormData({
            image: banner.image,
            link: banner.link,
            isActive: banner.isActive,
        });
        setSelectedBannerId(banner.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this banner?')) return;

        try {
            const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Banner deleted successfully!');
                fetchBanners();
            } else {
                toast.error('Failed to delete banner');
            }
        } catch (error) {
            console.error('Error deleting banner:', error);
            toast.error('Error deleting banner');
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
                setFormData(prev => ({ ...prev, image: data.url }));
                toast.success('Image uploaded successfully!');
            } else {
                toast.error('Upload failed: ' + data.error);
            }
        } catch (error) {
            console.error('Error uploading:', error);
            toast.error('Upload error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = isEditing ? `/api/banners/${selectedBannerId}` : '/api/banners';
            const res = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(isEditing ? 'Banner updated successfully!' : 'Banner created successfully!');
                setShowModal(false);
                resetForm();
                fetchBanners();
            } else {
                const error = await res.json();
                toast.error(error.error || 'Failed to save banner');
            }
        } catch (error) {
            console.error('Error saving banner:', error);
            toast.error('Error saving banner');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <icons.ImageIcon className="w-6 h-6 text-primary" />
                        Ads Banners
                    </h1>
                    <p className="text-sm text-gray-500 text-left">Manage promotional banners for the landing page</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-all font-medium shadow-md"
                >
                    <icons.Plus className="w-4 h-4" />
                    Add New Banner
                </button>
            </div>

            <div className="grid grid-cols-1 mt-12 mb-12 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading && banners.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-400">Loading banners...</div>
                ) : banners.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-400">No banners found</div>
                ) : (
                    banners.map((banner) => (
                        <div key={banner.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm group hover:shadow-md transition-all">
                            <div className="aspect-4/5 bg-gray-100 relative group-hover:opacity-90 transition-opacity overflow-hidden">
                                <img src={banner.image} alt="Banner" className="w-full h-full object-cover" />
                                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${banner.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {banner.isActive ? 'Active' : 'Inactive'}
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-gray-400 mb-2 truncate" title={banner.link}>{banner.link}</p>
                                <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => handleEdit(banner)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-primary transition-colors">
                                        <icons.Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(banner.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600 transition-colors">
                                        <icons.Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50  backdrop-blur-sm flex items-center justify-center z-100 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                            <h2 className="text-lg font-bold text-gray-900">{isEditing ? 'Edit Banner' : 'New Ad Banner'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <icons.X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Banner Image</label>
                                    <div className="relative aspect-4/5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex flex-col items-center justify-center group hover:border-primary transition-colors cursor-pointer">
                                        {formData.image ? (
                                            <>
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                                    CHANGE IMAGE
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-gray-400 flex flex-col items-center gap-2">
                                                <icons.ImageIcon className="w-8 h-8 opacity-20" />
                                                <span className="text-xs font-medium">{uploading ? 'Uploading...' : 'Click to upload'}</span>
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
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="Or enter image URL..."
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Target Link</label>
                                    <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary transition-colors">
                                        <icons.LinkIcon className="w-4 h-4 text-gray-400" />
                                        <input
                                            type="url"
                                            name="link"
                                            value={formData.link}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/ad"
                                            required
                                            className="flex-1 bg-transparent border-none outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Display this banner</span>
                                </label>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all bg-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || uploading}
                                    className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <icons.Check className="w-4 h-4" />
                                            {isEditing ? 'Update Banner' : 'Save Banner'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
