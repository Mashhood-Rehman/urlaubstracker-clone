'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../components/ImageUpload';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [products, setProducts] = useState<Array<any>>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | number | null>(null);

    const [categories, setCategories] = useState<any[]>([]);
    const [mainCategory, setMainCategory] = useState<string>('Hotel');

    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCategories(data.data);
                }
            })
            .catch(err => console.error("Failed to load categories", err));
    }, []);

    const [formData, setFormData] = useState<any>({
        // Hotel common fields
        title_fr: '',
        desc_fr: '',
        address: '',
        city: '',
        country: '',
        category: 'Hotel', // This is sub-category for hotels or general category
        price_per_night: '',
        total_price: '',
        currency: 'EUR',
        rating: '',
        review_count: '',
        amenities: '',
        check_in: '',
        check_out: '',
        notes: '',
        // Flight fields
        airline: '',
        departureCity: '',
        arrivalCity: '',
        duration: '',
        price: '',
        flightClass: 'Economy',
        baggage: '',
        services: '',
        whyAdore: '',
        flexibleDates: false,
        extras: '',
        tips: '',
        offerLink: '',
        // Rental fields
        mainHeading: '',
        mainDescription: '',
        offer: '',
        whySuperDeal: '',
        thingsToDo: '',
        additionalInfo: '',
        ecoTip: '',
        // Images
        images: [] as string[],
    });


    const [isFetching, setIsFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsFetching(true);
            try {
                const res = await fetch("/api/products")
                const data = await res.json()
                setProducts(data.data)
                console.log("Products fetched:", data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsFetching(false);
            }
        }
        fetchProducts();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);

    const filteredProducts = products ? products.filter(p => {
        const matchesSearch = searchTerm === '' ||
            p.title_fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.desc_fr?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter === 'All' ||
            p.mainCategory === categoryFilter ||
            (categoryFilter === 'Hotel' && (!p.mainCategory || p.mainCategory === 'Hotel'));

        return matchesSearch && matchesCategory;
    }) : [];

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({
            title_fr: '', desc_fr: '', address: '', city: '', country: '', category: 'Hotel',
            price_per_night: '', total_price: '', currency: 'EUR', rating: '', review_count: '', amenities: '',
            check_in: '', check_out: '', notes: '',
            airline: '', departureCity: '', arrivalCity: '', duration: '', price: '', flightClass: 'Economy',
            baggage: '', services: '', whyAdore: '', flexibleDates: false, extras: '', tips: '', offerLink: '',
            mainHeading: '', mainDescription: '', offer: '', whySuperDeal: '', thingsToDo: '', additionalInfo: '', ecoTip: '',
            images: [],
        });
        setMainCategory('Hotel');
        setIsEditing(false);
        setSelectedProductId(null);
    };

    const handleEdit = (product: any) => {
        setMainCategory(product.mainCategory || 'Hotel');
        setFormData({
            ...product,
            amenities: Array.isArray(product.amenities) ? product.amenities.join(', ') : (product.amenities || ''),
            services: Array.isArray(product.services) ? product.services.join(', ') : (product.services || ''),
            whyAdore: Array.isArray(product.whyAdore) ? product.whyAdore.join(', ') : (product.whyAdore || ''),
            thingsToDo: Array.isArray(product.thingsToDo) ? product.thingsToDo.join(', ') : (product.thingsToDo || ''),
            offer: typeof product.offer === 'object' ? JSON.stringify(product.offer) : (product.offer || ''),
            additionalInfo: typeof product.additionalInfo === 'object' ? JSON.stringify(product.additionalInfo) : (product.additionalInfo || ''),
            extras: typeof product.extras === 'object' ? JSON.stringify(product.extras) : (product.extras || ''),
            tips: typeof product.tips === 'object' ? JSON.stringify(product.tips) : (product.tips || ''),
            images: Array.isArray(product.images) ? product.images : [],
        });
        setSelectedProductId(product.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (product: any) => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const endpoint = (() => {
                        if (product.mainCategory === 'Flight') return `/api/flights/${product.id}`;
                        if (product.mainCategory === 'Rental') return `/api/rentals/${product.id}`;
                        return `/api/hotels/${product.id}`;
                    })();

                    const response = await fetch(endpoint, {
                        method: 'DELETE',
                    });
                    const result = await response.json();

                    if (result.success) {
                        setProducts(products.filter(p => p.id !== product.id));
                        resolve(result);
                    } else {
                        reject(new Error('Failed to delete product'));
                    }
                } catch (error) {
                    console.error('Error deleting product:', error);
                    reject(error);
                }
            }),
            {
                loading: 'Deleting product...',
                success: 'Product deleted successfully!',
                error: 'Failed to delete product',
            }
        );
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const method = isEditing ? 'PUT' : 'POST';

            let payload: any = { mainCategory };

            if (mainCategory === 'Flight') {
                payload = {
                    mainCategory,
                    title: formData.title_fr,
                    description: formData.desc_fr,
                    airline: formData.airline,
                    departureCity: formData.departureCity,
                    arrivalCity: formData.arrivalCity,
                    duration: formData.duration,
                    price: formData.price,
                    currency: formData.currency,
                    flightClass: formData.flightClass,
                    baggage: formData.baggage,
                    services: formData.services.split(',').map((s: string) => s.trim()).filter((s: string) => s),
                    whyAdore: formData.whyAdore.split(',').map((s: string) => s.trim()).filter((s: string) => s),
                    flexibleDates: formData.flexibleDates,
                    extras: formData.extras ? JSON.parse(formData.extras) : null,
                    tips: formData.tips ? JSON.parse(formData.tips) : null,
                    offerLink: formData.offerLink,
                    images: formData.images,
                };
            } else if (mainCategory === 'Rental') {
                payload = {
                    mainCategory,
                    category: formData.category,
                    title: formData.title_fr,
                    description: formData.desc_fr,
                    mainHeading: formData.mainHeading,
                    mainDescription: formData.mainDescription,
                    offer: formData.offer ? JSON.parse(formData.offer) : {},
                    whySuperDeal: formData.whySuperDeal,
                    thingsToDo: formData.thingsToDo.split(',').map((s: string) => s.trim()).filter((s: string) => s),
                    additionalInfo: formData.additionalInfo ? JSON.parse(formData.additionalInfo) : {},
                    ecoTip: formData.ecoTip,
                    images: formData.images,
                };
            } else {
                // Hotel
                payload = {
                    mainCategory,
                    title: formData.title_fr,
                    desc: formData.desc_fr,
                    title_fr: formData.title_fr,
                    desc_fr: formData.desc_fr,
                    address: formData.address,
                    city: formData.city,
                    country: formData.country,
                    price_per_night: formData.price_per_night,
                    total_price: formData.total_price,
                    currency: formData.currency,
                    rating: formData.rating,
                    review_count: formData.review_count,
                    amenities: formData.amenities.split(',').map((s: string) => s.trim()).filter((s: string) => s),
                    check_in: formData.check_in,
                    check_out: formData.check_out,
                    notes: formData.notes,
                    images: formData.images,
                };
            }

            const endpoint = (() => {
                if (isEditing) {
                    if (mainCategory === 'Flight') return `/api/flights/${selectedProductId}`;
                    if (mainCategory === 'Rental') return `/api/rentals/${selectedProductId}`;
                    return `/api/hotels/${selectedProductId}`;
                } else {
                    return '/api/products';
                }
            })();

            const response = await fetch(endpoint, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(isEditing ? 'Product updated successfully!' : 'Product created successfully!');
                setShowModal(false);
                resetForm();

                // Refresh products list
                const res = await fetch("/api/products")
                const data = await res.json()
                setProducts(data.data)

            } else {
                console.log('Failed to save product error frontend:', result);
                toast.error('Failed to save product');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error saving product');
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
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-4 gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg flex-1 sm:max-w-md">
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name, city, country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm flex-1 min-w-0"
                        />
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="flex-1 sm:flex-none px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-primary"
                        >
                            <option value="All">ALL</option>
                            <option value="Hotel">Hotels</option>
                            <option value="Flight">Flight</option>
                            <option value="Rental">Rentals</option>
                        </select>
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2">
                            <span className="hidden sm:inline">Show:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="bg-transparent border-none outline-none font-medium text-gray-700"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Product</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">ID</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                                {categoryFilter === 'Flight' ? 'Flight Title' : categoryFilter === 'Rental' ? 'Rental Name' : 'Hotel Name'}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Category</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                                {categoryFilter === 'Flight' ? 'Route' : 'City'}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                                {categoryFilter === 'Flight' ? 'Price' : categoryFilter === 'Rental' ? 'Offer' : 'Price/Night'}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                                {categoryFilter === 'Flight' ? 'Class' : 'Rating'}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                                {categoryFilter === 'Flight' ? 'Duration' : 'Reviews'}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                                {categoryFilter === 'Flight' ? 'Airline' : categoryFilter === 'Rental' ? 'Details' : 'Amenities'}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isFetching ? (
                            Array.from({ length: itemsPerPage }).map((_, idx) => (
                                <tr key={`skeleton-${idx}`} className="border-b border-gray-100 animate-pulse">
                                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-10"></div></td>
                                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                    <td className="px-4 py-4">
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <tr key={`${product.mainCategory}-${product.id}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-2 text-sm text-gray-600">{product.id}</td>
                                    <td className="px-4 py-2 text-sm font-medium text-foreground">{product.title_fr || product.mainHeading}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${product.mainCategory === 'Flight' ? 'bg-blue-100 text-blue-700' :
                                            product.mainCategory === 'Rental' ? 'bg-green-100 text-green-700' :
                                                'bg-purple-100 text-purple-700'
                                            }`}>
                                            {product.mainCategory || 'Hotel'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{product.city || product.departureCity || '-'}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        {product.currency || 'EUR'} {product.price_per_night || product.price || '-'}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                            ⭐ {product.rating ? Number(product.rating).toFixed(1) : 'N/A'}
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
                                            {product.mainCategory === 'Flight' && (
                                                <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                                    {product.airline}
                                                </span>
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
                                                onClick={() => handleDelete(product)}
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
                                <td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {!isFetching && filteredProducts.length > 0 && (
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of{' '}
                        <span className="font-medium">{filteredProducts.length}</span> results
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-2 sm:px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="hidden sm:inline">Previous</span>
                            <span className="sm:hidden">Prev</span>
                        </button>

                        {/* Page Numbers - Hidden on very small screens, show 3 on mobile, all on desktop */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page => {
                                    // On mobile (< 640px), show first, current-1, current, current+1, last
                                    if (window.innerWidth < 640) {
                                        return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                                    }
                                    // On desktop, show all if <= 7, otherwise show first, last, and 2 around current
                                    if (totalPages <= 7) return true;
                                    return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                                })
                                .map((page, i, array) => (
                                    <div key={page} className="flex items-center">
                                        {i > 0 && array[i - 1] !== page - 1 && (
                                            <span className="px-1 sm:px-2 text-gray-400 text-xs sm:text-sm">...</span>
                                        )}
                                        <button
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-colors ${currentPage === page
                                                ? 'bg-primary text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    </div>
                                ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-2 sm:px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
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
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Main Category</label>
                                <div className="flex gap-4">
                                    {categories.map((cat) => (
                                        <label key={cat.name} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="mainCategory"
                                                checked={mainCategory === cat.name}
                                                onChange={() => setMainCategory(cat.name)}
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <span className={`text-sm ${mainCategory === cat.name ? 'text-primary font-bold' : 'text-gray-600'}`}>
                                                {cat.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {mainCategory === 'Hotel' && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Title (FR)</label>
                                            <input type="text" name="title_fr" value={formData.title_fr} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Description (FR)</label>
                                            <textarea name="desc_fr" value={formData.desc_fr} onChange={handleInputChange} required rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                                            <input type="text" name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Sub-Category</label>
                                            <select name="category" value={formData.category} onChange={handleSelectChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                                                <option value="Hotel">Hotel</option>
                                                <option value="Resort">Resort</option>
                                                <option value="Apartment">Apartment</option>
                                                <option value="Villa">Villa</option>
                                                <option value="Hostel">Hostel</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Price per Night</label>
                                            <input type="number" step="0.01" name="price_per_night" value={formData.price_per_night} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
                                            <input type="text" name="amenities" value={formData.amenities} onChange={handleInputChange} placeholder="WiFi, Pool, Parking" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                    </>
                                )}

                                {mainCategory === 'Flight' && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Flight Title (FR)</label>
                                            <input type="text" name="title_fr" value={formData.title_fr} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Description (FR)</label>
                                            <textarea name="desc_fr" value={formData.desc_fr} onChange={handleInputChange} required rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Airline</label>
                                            <input type="text" name="airline" value={formData.airline} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Departure City</label>
                                            <input type="text" name="departureCity" value={formData.departureCity} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Arrival City</label>
                                            <input type="text" name="arrivalCity" value={formData.arrivalCity} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                                            <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="2h 30m" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Class</label>
                                            <select name="flightClass" value={formData.flightClass} onChange={handleSelectChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                                                <option value="Economy">Economy</option>
                                                <option value="Premium Economy">Premium Economy</option>
                                                <option value="Business">Business</option>
                                                <option value="First Class">First Class</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Services (comma-separated)</label>
                                            <input type="text" name="services" value={formData.services} onChange={handleInputChange} placeholder="Meals, WiFi, USB Power" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                    </>
                                )}

                                {mainCategory === 'Rental' && (
                                    <>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Main Heading</label>
                                            <input type="text" name="mainHeading" value={formData.mainHeading} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Rental Category</label>
                                            <select name="category" value={formData.category} onChange={handleSelectChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                                                <option value="Car">Car</option>
                                                <option value="Bike">Bike</option>
                                                <option value="Parking">Parking</option>
                                                <option value="Equipment">Equipment</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Main Description</label>
                                            <textarea name="mainDescription" value={formData.mainDescription} onChange={handleInputChange} required rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Super Deal Reason</label>
                                            <input type="text" name="whySuperDeal" value={formData.whySuperDeal} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Offer (JSON)</label>
                                            <input type="text" name="offer" value={formData.offer} onChange={handleInputChange} placeholder='{"price": 45, "unit": "day"}' className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                    </>
                                )}

                                {/* Images for Hotel/Flight/Rental */}
                                {(mainCategory === 'Hotel' || mainCategory === 'Flight' || mainCategory === 'Rental') && (
                                    <div className="col-span-2">
                                        <ImageUpload
                                            images={formData.images}
                                            onImagesChange={(images) => setFormData({ ...formData, images })}
                                            maxImages={10}
                                            label={`${mainCategory} Images`}
                                        />
                                    </div>
                                )}
                            </div>

                            {mainCategory !== 'Hotel' && mainCategory !== 'Flight' && mainCategory !== 'Rental' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                        <input type="text" name="title" value={formData.title || formData.title_fr || ''} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                        <textarea name="description" value={formData.description || formData.desc_fr || ''} onChange={handleInputChange} required rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                                        <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
                                        <input type="text" name="currency" value={formData.currency} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Additional Details (JSON)</label>
                                        <textarea
                                            name="details"
                                            value={typeof formData.details === 'object' ? JSON.stringify(formData.details) : formData.details || ''}
                                            onChange={handleInputChange}
                                            rows={2}
                                            placeholder='{"key": "value"}'
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <ImageUpload
                                            images={formData.images}
                                            onImagesChange={(images) => setFormData({ ...formData, images })}
                                            maxImages={10}
                                            label={`${mainCategory} Images`}
                                        />
                                    </div>
                                </div>
                            )}

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
