import prisma from '@/lib/prisma';
import { icons } from '@/assets/icons';
import Link from 'next/link';

// Helper to format currency
const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedSearchParams = await searchParams;
    const location = typeof resolvedSearchParams.location === 'string' ? resolvedSearchParams.location : '';
    const startDate = typeof resolvedSearchParams.startDate === 'string' ? resolvedSearchParams.startDate : '';
    const endDate = typeof resolvedSearchParams.endDate === 'string' ? resolvedSearchParams.endDate : '';

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // New Logic: If searching for a specific hotel, find its city and show all hotels in that city
    let hotels = [];
    if (location) {
        const specificHotel = await prisma.hotel.findFirst({
            where: {
                title: { contains: location, mode: 'insensitive' },
            },
        });

        if (specificHotel) {
            hotels = await prisma.hotel.findMany({
                where: {
                    city: { equals: specificHotel.city, mode: 'insensitive' },
                },
                orderBy: { createdAt: 'desc' },
            });
        } else {
            // Fallback to general search
            hotels = await prisma.hotel.findMany({
                where: {
                    OR: [
                        { city: { contains: location, mode: 'insensitive' } },
                        { country: { contains: location, mode: 'insensitive' } },
                        { title: { contains: location, mode: 'insensitive' } },
                    ],
                },
                orderBy: { createdAt: 'desc' },
            });
        }
    } else {
        hotels = await prisma.hotel.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Setup a simple header for now since Navbar might be active via layout */}
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl text-primary">TravelApp</Link>
                    <div className="flex-1 max-w-xl mx-auto flex items-center justify-center gap-8 px-8">
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</span>
                            <div className="flex items-center gap-2 text-sm text-gray-900 font-bold">
                                <icons.MapPin className="w-3 h-3 text-secondary" />
                                {location || 'Anywhere'}
                            </div>
                        </div>
                        <div className="h-8 w-px bg-gray-100"></div>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dates</span>
                            <div className="flex items-center gap-2 text-sm text-gray-900 font-bold">
                                <icons.Calendar className="w-3 h-3 text-secondary" />
                                {startDate ? (
                                    endDate ? `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}` : formatDisplayDate(startDate)
                                ) : 'Flexible'}
                            </div>
                        </div>
                    </div>
                    <Link href="/" className="px-4 py-2 border border-gray-100 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors uppercase tracking-widest">
                        New Search
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">
                    {hotels.length} places to stay in {location || 'anywhere'}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {hotels.map((hotel: any) => (
                        <Link href={`/hotels/${hotel.id}`} key={hotel.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                {/* Placeholder for image since we don't have images easily available yet, using a colored block or first image if available */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                    <icons.Hotel className="w-8 h-8 opacity-20" />
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">{hotel.title}</h3>
                                    {hotel.rating && (
                                        <div className="flex items-center gap-1 text-sm font-medium">
                                            <span className="text-yellow-500">★</span>
                                            {hotel.rating}
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mb-3">{hotel.city}, {hotel.country}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-xs text-gray-400">
                                        Per night
                                    </div>
                                    <div className="font-bold text-lg text-primary">
                                        {formatCurrency(hotel.price_per_night, hotel.currency)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {hotels.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <icons.Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-500">Try adjusting your search location</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
