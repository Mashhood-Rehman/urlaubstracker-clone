'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../components/ImageUpload';

export default function RentalsAdminPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [rentals, setRentals] = useState<Array<any>>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRentalId, setSelectedRentalId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        category: 'car',
        title: '',
        description: '',
        mainHeading: '',
        mainDescription: '',
        offer: '',
        whySuperDeal: '',
        thingsToDo: '',
        additionalInfo: '',
        ecoTip: '',
        images: [] as string[],
    });

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const res = await fetch('/api/rentals');
            const data = await res.json();
            if (data.success) {
                setRentals(data.data);
            }
        } catch (error) {
            console.error('Error fetching rentals:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            category: 'car',
            title: '',
            description: '',
            mainHeading: '',
            mainDescription: '',
            offer: '',
            whySuperDeal: '',
            thingsToDo: '',
            additionalInfo: '',
            ecoTip: '',
            images: [],
        });
        setIsEditing(false);
        setSelectedRentalId(null);
    };

    const handleEdit = (rental: any) => {
        setFormData({
            category: rental.category || 'car',
            title: rental.title || '',
            description: rental.description || '',
            mainHeading: rental.mainHeading || '',
            mainDescription: rental.mainDescription || '',
            offer: rental.offer ? JSON.stringify(rental.offer, null, 2) : '',
            whySuperDeal: rental.whySuperDeal || '',
            thingsToDo: Array.isArray(rental.thingsToDo) ? rental.thingsToDo.join(', ') : '',
            additionalInfo: rental.additionalInfo ? JSON.stringify(rental.additionalInfo, null, 2) : '',
            ecoTip: rental.ecoTip || '',
            images: rental.images || [],
        });
        setSelectedRentalId(rental.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch(`/api/rentals/${id}`, {
                        method: 'DELETE',
                    });
                    const result = await response.json();

                    if (result.success) {
                        setRentals(rentals.filter(r => r.id !== id));
                        resolve(result);
                    } else {
                        reject(new Error('Failed to delete rental'));
                    }
                } catch (error) {
                    console.error('Error deleting rental:', error);
                    reject(error);
                }
            }),
            {
                loading: 'Deleting rental...',
                success: 'Rental deleted successfully!',
                error: 'Failed to delete rental',
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const thingsToDoArray = formData.thingsToDo.split(',').map(item => item.trim()).filter(item => item);

            let offerObj = null;
            let additionalInfoObj = null;
            try {
                if (formData.offer) offerObj = JSON.parse(formData.offer);
                if (formData.additionalInfo) additionalInfoObj = JSON.parse(formData.additionalInfo);
            } catch (e) {
                toast.error('Invalid JSON in Offer or Additional Info');
                setLoading(false);
                return;
            }

            const url = isEditing ? `/api/rentals/${selectedRentalId}` : '/api/rentals';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    thingsToDo: thingsToDoArray,
                    offer: offerObj,
                    additionalInfo: additionalInfoObj,
                }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(isEditing ? 'Rental updated successfully!' : 'Rental created successfully!');
                setShowModal(false);
                resetForm();
                fetchRentals();
            } else {
                toast.error('Failed to save rental');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error saving rental');
        } finally {
            setLoading(false);
        }
    };

    const filteredRentals = rentals.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Rentals Management</h1>
                <p className="text-sm text-gray-500 mt-1">Manage all rentals (Cars, Motorbikes, Parking)</p>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg flex-1 max-w-md">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search rentals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm flex-1"
                    />
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Rental
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">ID</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Title</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Category</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Price Info</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRentals.length > 0 ? (
                            filteredRentals.map((rental) => (
                                <tr key={rental.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-gray-600">{rental.id}</td>
                                    <td className="px-4 py-3 font-medium text-foreground">{rental.title}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 rounded text-xs capitalize ${rental.category === 'car' ? 'bg-blue-100 text-blue-800' :
                                            rental.category === 'parking' ? 'bg-gray-100 text-gray-800' :
                                                'bg-purple-100 text-purple-800'
                                            }`}>
                                            {rental.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {rental.offer?.pricePerDay ? `${rental.offer.pricePerDay} ${rental.offer.currency || '€'} / day` :
                                            rental.offer?.price ? `${rental.offer.price} ${rental.offer.currency || '€'}` : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(rental)}
                                                className="p-1 hover:bg-gray-100 rounded text-blue-600"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(rental.id)}
                                                className="p-1 hover:bg-gray-100 rounded text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    No rentals found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">{isEditing ? 'Edit Rental' : 'Add New Rental'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    >
                                        <option value="car">Car</option>
                                        <option value="motorbike">Motorbike</option>
                                        <option value="parking">Parking</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Main Heading</label>
                                    <input
                                        type="text"
                                        name="mainHeading"
                                        value={formData.mainHeading}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Main Description</label>
                                    <textarea
                                        name="mainDescription"
                                        value={formData.mainDescription}
                                        onChange={handleInputChange}
                                        required
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Offer (JSON)</label>
                                    <textarea
                                        name="offer"
                                        value={formData.offer}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        placeholder='{ "vehicle": "Fiat Panda", "pricePerDay": 6, "currency": "€" }'
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-xs focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Why Super Deal</label>
                                    <textarea
                                        name="whySuperDeal"
                                        value={formData.whySuperDeal}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Things To Do (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="thingsToDo"
                                        value={formData.thingsToDo}
                                        onChange={handleInputChange}
                                        placeholder="Explore beaches, Visit villages"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Additional Info (JSON)</label>
                                    <textarea
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder='{ "vehicleType": "Compact", "pickup": "Airport" }'
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-xs focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Eco Tip</label>
                                    <input
                                        type="text"
                                        name="ecoTip"
                                        value={formData.ecoTip}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <ImageUpload
                                        images={formData.images}
                                        onImagesChange={(images) => setFormData({ ...formData, images })}
                                        maxImages={10}
                                        label="Rental Images"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : (isEditing ? 'Update Rental' : 'Create Rental')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
