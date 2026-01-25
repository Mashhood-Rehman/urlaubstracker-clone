'use client';

import { useState, useEffect } from 'react';
import { icons } from '@/assets/icons';
import ImageUpload from '../components/ImageUpload';
import Loading from '../../components/Loading';

interface Brand {
    id: number;
    name: string;
    websiteLink: string | null;
    images: string[];
    description: string | null;
    _count?: { coupons: number };
}

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [formData, setFormData] = useState<{
        name: string;
        websiteLink: string;
        images: string[];
        description: string;
    }>({
        name: '',
        websiteLink: '',
        images: [],
        description: '',
    });

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/brands');
            const data = await response.json();
            setBrands(data);
        } catch (error) {
            console.error('Failed to fetch brands:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const method = editingBrand ? 'PUT' : 'POST';
            const url = editingBrand ? `/api/brands/${editingBrand.id}` : '/api/brands';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowForm(false);
                setEditingBrand(null);
                setFormData({ name: '', websiteLink: '', images: [], description: '' });
                fetchBrands();
            }
        } catch (error) {
            console.error('Error saving brand:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            try {
                await fetch(`/api/brands/${id}`, { method: 'DELETE' });
                fetchBrands();
            } catch (error) {
                console.error('Error deleting brand:', error);
            }
        }
    };

    const handleEdit = (brand: Brand) => {
        setEditingBrand(brand);
        setFormData({
            name: brand.name,
            websiteLink: brand.websiteLink || '',
            images: brand.images || [],
            description: brand.description || '',
        });
        setShowForm(true);
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Brands Management</h1>
                    <p className="text-gray-600 mt-1">Manage partner brands and their details</p>
                </div>
                <button
                    onClick={() => {
                        setEditingBrand(null);
                        setFormData({ name: '', websiteLink: '', images: [], description: '' });
                        setShowForm(!showForm);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <icons.Plus className="w-5 h-5" />
                    Add Brand
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Brand Name *</label>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Website Link</label>
                            <input
                                value={formData.websiteLink}
                                onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                    </div>
                    <div>
                        <ImageUpload
                            images={formData.images}
                            onImagesChange={(urls) => setFormData({ ...formData, images: urls })}
                            label="Brand Images / Logos"
                            folder="brands"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg h-24"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 text-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                        >
                            {loading && <icons.Loader className="w-4 h-4 animate-spin" />}
                            {editingBrand ? 'Update' : 'Create'} Brand
                        </button>
                    </div>
                </form>
            )}

            {loading && !brands.length ? (
                <Loading variant="container" text="Loading partner brands..." />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brands.map((brand) => (
                        <div key={brand.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                                    {brand.images && brand.images.length > 0 ? (
                                        <img src={brand.images[0]} alt={brand.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <icons.ImageIcon className="w-8 h-8 text-gray-300" />
                                    )}
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => handleEdit(brand)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                        <icons.Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(brand.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                        <icons.Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{brand.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-4">{brand.description || 'No description provided.'}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="text-sm font-medium text-gray-600">
                                    {brand._count?.coupons || 0} active coupons
                                </div>
                                {brand.websiteLink && (
                                    <a href={brand.websiteLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                                        <icons.Globe className="w-4 h-4" />
                                        Visit site
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
