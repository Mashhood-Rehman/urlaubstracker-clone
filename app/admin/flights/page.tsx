'use client';

import { useEffect, useState } from 'react';
import { icons } from '@/assets/icons';
import toast from 'react-hot-toast';
import ImageUpload from '../components/ImageUpload';

export default function FlightsAdminPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [flights, setFlights] = useState<Array<any>>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        airline: '',
        departureCity: '',
        arrivalCity: '',
        duration: '',
        price: '',
        currency: 'EUR',
        flightClass: 'Economy',
        baggage: '',
        services: '',
        whyAdore: '',
        flexibleDates: false,
        extras: '',
        tips: '',
        offerLink: '',
        images: [] as string[],
        link: '',
    });

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const res = await fetch('/api/flights');
            const data = await res.json();
            if (data.success) {
                setFlights(data.data);
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData({ ...formData, [name]: val });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            airline: '',
            departureCity: '',
            arrivalCity: '',
            duration: '',
            price: '',
            currency: 'EUR',
            flightClass: 'Economy',
            baggage: '',
            services: '',
            whyAdore: '',
            flexibleDates: false,
            extras: '',
            tips: '',
            offerLink: '',
            images: [],
            link: '',
        });
        setIsEditing(false);
        setSelectedFlightId(null);
    };

    const handleEdit = (flight: any) => {
        setFormData({
            title: flight.title || '',
            description: flight.description || '',
            airline: flight.airline || '',
            departureCity: flight.departureCity || '',
            arrivalCity: flight.arrivalCity || '',
            duration: flight.duration || '',
            price: flight.price?.toString() || '',
            currency: flight.currency || 'EUR',
            flightClass: flight.flightClass || 'Economy',
            baggage: flight.baggage || '',
            services: Array.isArray(flight.services) ? flight.services.join(', ') : '',
            whyAdore: Array.isArray(flight.whyAdore) ? flight.whyAdore.join(', ') : '',
            flexibleDates: !!flight.flexibleDates,
            extras: flight.extras ? JSON.stringify(flight.extras, null, 2) : '',
            tips: flight.tips ? JSON.stringify(flight.tips, null, 2) : '',
            offerLink: flight.offerLink || '',
            images: flight.images || [],
            link: flight.link || '',
        });
        setSelectedFlightId(flight.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch(`/api/flights/${id}`, {
                        method: 'DELETE',
                    });
                    const result = await response.json();

                    if (result.success) {
                        setFlights(flights.filter(f => f.id !== id));
                        resolve(result);
                    } else {
                        reject(new Error('Failed to delete flight'));
                    }
                } catch (error) {
                    console.error('Error deleting flight:', error);
                    reject(error);
                }
            }),
            {
                loading: 'Deleting flight...',
                success: 'Flight deleted successfully!',
                error: 'Failed to delete flight',
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const servicesArray = formData.services.split(',').map(item => item.trim()).filter(item => item);
            const whyAdoreArray = formData.whyAdore.split(',').map(item => item.trim()).filter(item => item);

            let extrasObj = null;
            let tipsObj = null;
            try {
                if (formData.extras) extrasObj = JSON.parse(formData.extras);
                if (formData.tips) tipsObj = JSON.parse(formData.tips);
            } catch (e) {
                toast.error('Invalid JSON in Extras or Tips');
                setLoading(false);
                return;
            }

            const url = isEditing ? `/api/flights/${selectedFlightId}` : '/api/flights';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    services: servicesArray,
                    whyAdore: whyAdoreArray,
                    extras: extrasObj,
                    tips: tipsObj,
                }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(isEditing ? 'Flight updated successfully!' : 'Flight created successfully!');
                setShowModal(false);
                resetForm();
                fetchFlights();
            } else {
                toast.error('Failed to save flight');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error saving flight');
        } finally {
            setLoading(false);
        }
    };

    const filteredFlights = flights.filter(f =>
        f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.departureCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.arrivalCity.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-(--foreground)">Flights Management</h1>
                <p className="text-sm text-(--gray-500) mt-1">Manage all available flights and routes</p>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-(--white) border border-(--gray-200) rounded-lg flex-1 max-w-md">
                    <icons.Search className="w-4 h-4 text-(--gray-400)" />
                    <input
                        type="text"
                        placeholder="Search flights..."
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
                    className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-(--white) rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                >
                    <icons.Plus className="w-4 h-4" />
                    Add Flight
                </button>
            </div>

            <div className="bg-(--white) rounded-lg border border-(--gray-200) overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-(--gray-50) border-b border-(--gray-200)">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-(--gray-600)">ID</th>
                            <th className="px-4 py-3 text-left font-semibold text-(--gray-600)">Title / Airline</th>
                            <th className="px-4 py-3 text-left font-semibold text-(--gray-600)">Route</th>
                            <th className="px-4 py-3 text-left font-semibold text-(--gray-600)">Duration</th>
                            <th className="px-4 py-3 text-left font-semibold text-(--gray-600)">Price</th>
                            <th className="px-4 py-3 text-left font-semibold text-(--gray-600)">Class</th>
                            <th className="px-4 py-3 text-left font-semibold text-(--gray-600)">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFlights.length > 0 ? (
                            filteredFlights.map((flight) => (
                                <tr key={flight.id} className="border-b border-(--gray-100) hover:bg-(--gray-50) transition-colors">
                                    <td className="px-4 py-3 text-(--gray-600)">{flight.id}</td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-(--foreground)">{flight.title}</div>
                                        <div className="text-xs text-(--gray-400)">{flight.airline}</div>
                                    </td>
                                    <td className="px-4 py-3 text-(--gray-600)">
                                        {flight.departureCity} ✈ {flight.arrivalCity}
                                    </td>
                                    <td className="px-4 py-3 text-(--gray-600)">{flight.duration}</td>
                                    <td className="px-4 py-3 text-(--gray-600)">
                                        {flight.currency} {flight.price}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="bg-(--success)/10 text-(--success) px-2 py-0.5 rounded text-xs">
                                            {flight.flightClass}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(flight)}
                                                className="p-1 hover:bg-(--gray-100) rounded text-(--primary)"
                                            >
                                                <icons.Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(flight.id)}
                                                className="p-1 hover:bg-(--gray-100) rounded text-(--error)"
                                            >
                                                <icons.Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-(--gray-500)">
                                    No flights found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-(--black)/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-(--white) rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-(--white) border-b border-(--gray-200) px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-(--foreground)">{isEditing ? 'Edit Flight' : 'Add New Flight'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-(--gray-100) rounded">
                                <icons.X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
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

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Airline</label>
                                    <input
                                        type="text"
                                        name="airline"
                                        value={formData.airline}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 2h 30m"
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Departure City</label>
                                    <input
                                        type="text"
                                        name="departureCity"
                                        value={formData.departureCity}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Arrival City</label>
                                    <input
                                        type="text"
                                        name="arrivalCity"
                                        value={formData.arrivalCity}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
                                    <input
                                        type="text"
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Class</label>
                                    <select
                                        name="flightClass"
                                        value={formData.flightClass}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    >
                                        <option value="Economy">Economy</option>
                                        <option value="Business">Business</option>
                                        <option value="First">First</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Baggage</label>
                                    <input
                                        type="text"
                                        name="baggage"
                                        value={formData.baggage}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 20kg"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Services (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="services"
                                        value={formData.services}
                                        onChange={handleInputChange}
                                        placeholder="WiFi, Meal, Drinks"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Why Adore (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="whyAdore"
                                        value={formData.whyAdore}
                                        onChange={handleInputChange}
                                        placeholder="Great crew, Modern plane"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="flexibleDates"
                                            checked={formData.flexibleDates}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                        />
                                        Flexible Dates Available
                                    </label>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Extras (JSON)</label>
                                    <textarea
                                        name="extras"
                                        value={formData.extras}
                                        onChange={handleInputChange}
                                        rows={2}
                                        placeholder='{ "Seat Selection": "Free", "Lounge": "$10" }'
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-xs focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Tips (JSON array)</label>
                                    <textarea
                                        name="tips"
                                        value={formData.tips}
                                        onChange={handleInputChange}
                                        rows={2}
                                        placeholder='["Check in 2h before", "Check baggage size"]'
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-xs focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">External Link (Booking/Info URL)</label>
                                    <input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <ImageUpload
                                        images={formData.images}
                                        onImagesChange={(images) => setFormData({ ...formData, images })}
                                        maxImages={10}
                                        label="Flight Images"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-(--gray-200) text-(--gray-700) rounded-lg hover:bg-(--gray-50) transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-(--primary) text-(--white) rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : (isEditing ? 'Update Flight' : 'Create Flight')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
