import React from 'react';
import { icons } from '@/assets/icons';

export const travelHacks = [
    {
        id: 1,
        title: "Book Cheap Flights",
        description: "Master the art of finding error fares and hidden gems.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&w=800&q=80",
        tag: "Pro Tip"
    },
    {
        id: 2,
        title: "Packing Like a Pro",
        description: "Fit everything into your carry-on with these space-saving hacks.",
        image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80",
        tag: "Efficiency"
    },
    {
        id: 3,
        title: "Visa Secrets",
        description: "Navigate global entry requirements without the stress.",
        image: "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=800&q=80",
        tag: "Global"
    },
    {
        id: 4,
        title: "Essential Apps",
        description: "The 2024 digital toolkit every traveler needs.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        tag: "Tech"
    }
];

export const exceptionalHotels = [
    {
        id: 1,
        title: "Ubud Treehouse",
        location: "Bali, Indonesia",
        price: "From €120",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Jukkasjärvi Ice",
        location: "Stockholm, Sweden",
        price: "From €250",
        image: "https://images.unsplash.com/photo-1517524008436-bbdb63ac4368?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Cave Haven",
        location: "Cappadocia, Turkey",
        price: "From €180",
        image: "https://images.unsplash.com/photo-1524230507669-5ff97982ca5e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Azure Underwater",
        location: "Conrad, Maldives",
        price: "From €900",
        image: "https://images.unsplash.com/photo-1540202404-a2f29036bb57?auto=format&fit=crop&w=800&q=80"
    }
];

export const moods = [
    {
        title: 'Adventure',
        desc: 'Peak experiences for the brave.',
        icon: icons.Plane,
        color: 'bg-orange-500',
        size: 'md:col-span-2 md:row-span-2',
        image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'Serenity',
        desc: 'Quiet escapes and calm waters.',
        icon: icons.Hotel,
        color: 'bg-blue-400',
        size: 'md:col-span-1 md:row-span-1',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'Urban Pulse',
        desc: 'City lights and neon nights.',
        icon: icons.MapPin,
        color: 'bg-purple-600',
        size: 'md:col-span-1 md:row-span-2',
        image: 'https://images.unsplash.com/photo-1449153001399-4c0af90ad4d9?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'Hidden Gems',
        desc: 'Off the beaten path secrets.',
        icon: icons.Globe,
        color: 'bg-emerald-500',
        size: 'md:col-span-1 md:row-span-1',
        image: 'https://images.unsplash.com/photo-1516483642775-8209864e831f?auto=format&fit=crop&q=80&w=1000'
    },
];

export const destinations = [
    { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Iceland', country: 'Europe', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Amalfi Coast', country: 'Italy', image: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000' },
];

export const appHacks = [
    { title: 'Packing Like a Pro', desc: 'Space-saving techniques for long trips.', icon: icons.Ticket },
    { title: 'Finding Cheap Flights', desc: 'The best days to book and fly.', icon: icons.Plane },
    { title: 'Travel Insurance Guide', desc: 'What you really need to be covered.', icon: icons.Bell },
];

export const bookingTabs = [
    { name: 'Flights', icon: icons.Plane },
    { name: 'Hotels', icon: icons.Hotel },
    { name: 'Car Rental', icon: icons.Car },
];

export const calendarData = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
