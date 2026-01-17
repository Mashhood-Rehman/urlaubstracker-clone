'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [products, setProducts] = useState<Array<any>>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | number | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        title_fr: '',
        desc_fr: '',
        address: '',
        city: '',
        country: '',
        category: 'Hotel',
        price_per_night: '',
        total_price: '',
        currency: 'EUR',
        rating: '',
        review_count: '',
        amenities: '',
        check_in: '',
        check_out: '',
        notes: '',
    });


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products")
                const data = await res.json()
                setProducts(data.data)
                console.log("Products fetched:", data);
            } catch (error) {
                console.error("Error fetching products:", error);

            }
        }
        fetchProducts();
    }, [])
    console.log("Products state:", products);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            desc: '',
            title_fr: '',
            desc_fr: '',
            address: '',
            city: '',
            country: '',
            category: 'Hotel',
            price_per_night: '',
            total_price: '',
            currency: 'EUR',
            rating: '',
            review_count: '',
            amenities: '',
            check_in: '',
            check_out: '',
            notes: '',
        });
        setIsEditing(false);
        setSelectedProductId(null);
    };

    const handleEdit = (product: any) => {
        setFormData({
            title: product.title || '',
            desc: product.desc || '',
            title_fr: product.title_fr || '',
            desc_fr: product.desc_fr || '',
            address: product.address || '',
            city: product.city || '',
            country: product.country || '',
            category: product.category || 'Hotel',
            price_per_night: product.price_per_night || '',
            total_price: product.total_price || '',
            currency: product.currency || 'EUR',
            rating: product.rating || '',
            review_count: product.review_count || '',
            amenities: Array.isArray(product.amenities) ? product.amenities.join(', ') : '',
            check_in: product.check_in || '',
            check_out: product.check_out || '',
            notes: product.notes || '',
        });
        setSelectedProductId(product.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                setProducts(products.filter(p => p.id !== id));
                alert('Product deleted successfully');
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product');
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Parse amenities as JSON array
            const amenitiesArray = formData.amenities.split(',').map(item => item.trim()).filter(item => item);

            const url = isEditing ? `/api/products/${selectedProductId}` : '/api/products';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    amenities: amenitiesArray,
                    price_per_night: formData.price_per_night,
                    total_price: formData.total_price || null,
                    rating: formData.rating || null,
                    review_count: formData.review_count || null,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert(isEditing ? 'Product updated successfully!' : 'Product created successfully!');
                setShowModal(false);
                resetForm();

                // Refresh products list
                const res = await fetch("/api/products")
                const data = await res.json()
                setProducts(data.data)

            } else {
                console.log('Failed to save product error frontend:', result.error);
                alert('Failed to save product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Products Management</h1>
                <p className="text-sm text-gray-500 mt-1">Manage all products and packages</p>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg flex-1 max-w-md">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, city, country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm flex-1"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-primary"
                    >
                        <option value="All">All Categories</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Resort">Resort</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Hostel">Hostel</option>
                    </select>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">ID</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Hotel Name</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Category</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">City</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Price/Night</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Rating</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Reviews</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Amenities</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? (
                            products
                                .filter(p => {
                                    const matchesSearch = searchTerm === '' ||
                                        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.desc?.toLowerCase().includes(searchTerm.toLowerCase());

                                    // If "All" is selected, show everything
                                    // Otherwise, show items that match the category OR don't have a category set (null/undefined)
                                    const matchesCategory = categoryFilter === 'All' ||
                                        !p.category ||
                                        p.category === categoryFilter;

                                    return matchesSearch && matchesCategory;
                                })
                                .map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-2 text-sm text-gray-600">{product.id}</td>
                                        <td className="px-4 py-2 text-sm font-medium text-foreground">{product.title}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            <span className="inline-block bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">
                                                {product.category || 'Hotel'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{product.city}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            {product.currency} {product.price_per_night}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                                ⭐ {product.rating || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{product.review_count || 0}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            <div className="flex flex-wrap gap-1">
                                                {Array.isArray(product.amenities) && product.amenities.slice(0, 3).map((amenity: any, idx: any) => (
                                                    <span key={idx} className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                                        {amenity}
                                                    </span>
                                                ))}
                                                {Array.isArray(product.amenities) && product.amenities.length > 3 && (
                                                    <span className="text-xs text-gray-500">+{product.amenities.length - 3} more</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-1 hover:bg-gray-100 cursor-pointer rounded transition-colors"
                                                >
                                                    <Edit className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-1 hover:bg-gray-100 cursor-pointer rounded transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-center text-sm text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title (EN)</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title (FR)</label>
                                    <input
                                        type="text"
                                        name="title_fr"
                                        value={formData.title_fr}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Description (EN)</label>
                                    <textarea
                                        name="desc"
                                        value={formData.desc}
                                        onChange={handleInputChange}
                                        required
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Description (FR)</label>
                                    <textarea
                                        name="desc_fr"
                                        value={formData.desc_fr}
                                        onChange={handleInputChange}
                                        required
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    >
                                        <option value="Hotel">Hotel</option>
                                        <option value="Resort">Resort</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Hostel">Hostel</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
                                    <input
                                        type="text"
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Price per Night</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price_per_night"
                                        value={formData.price_per_night}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Total Price (Optional)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="total_price"
                                        value={formData.total_price}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Rating (Optional)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Review Count (Optional)</label>
                                    <input
                                        type="number"
                                        name="review_count"
                                        value={formData.review_count}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="amenities"
                                        value={formData.amenities}
                                        onChange={handleInputChange}
                                        placeholder="WiFi, Pool, Parking"
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Check-in</label>
                                    <input
                                        type="text"
                                        name="check_in"
                                        value={formData.check_in}
                                        onChange={handleInputChange}
                                        placeholder="14:00"
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Check-out</label>
                                    <input
                                        type="text"
                                        name="check_out"
                                        value={formData.check_out}
                                        onChange={handleInputChange}
                                        placeholder="11:00"
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Notes (Optional)</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
