'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { icons } from '@/assets/icons';
import Autocomplete from './Autocomplete';
import Calendar from './Calendar';

const BookingEngine = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Flights');

    // Tab-specific states
    const [tabStates, setTabStates] = useState({
        'Flights': { from: '', to: '', startDate: '', endDate: '' },
        'Hotels': { from: '', to: '', startDate: '', endDate: '' },
        'Car Rental': { from: '', to: '', startDate: '', endDate: '' }
    });

    const updateTabState = (field: string, value: any) => {
        setTabStates(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab as keyof typeof prev],
                [field]: value
            }
        }));
    };

    const currentState = tabStates[activeTab as keyof typeof tabStates];

    const handleSearch = () => {
        const { from, to, startDate, endDate } = currentState;
        if (activeTab === 'Flights') {
            const params = new URLSearchParams();
            if (from) params.append('from', from);
            if (to) params.append('to', to);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            router.push(`/flights/search?${params.toString()}`);
        } else if (activeTab === 'Hotels') {
            const params = new URLSearchParams();
            if (from) params.append('location', from);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            router.push(`/search?${params.toString()}`);
        } else if (activeTab === 'Car Rental') {
            const params = new URLSearchParams();
            if (from) params.append('location', from);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            router.push(`/rentals/search?${params.toString()}`);
        }
    };



    const tabs = [
        { name: 'Flights', icon: icons.Plane },
        { name: 'Hotels', icon: icons.Hotel },
        { name: 'Car Rental', icon: icons.Car },
    ];

    return (
        <div className="relative z-20 w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl animate-in zoom-in duration-500 delay-200">
                {/* Tabs */}
                <div className="flex border-b">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex-1 py-2 px-6 flex items-center justify-center gap-2 font-semibold transition-all ${activeTab === tab.name
                                ? 'text-secondary border-b-2 border-secondary bg-secondary/5'
                                : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full text-left" key={`${activeTab}-from`}>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                            {activeTab === 'Hotels' ? 'Destination' : activeTab === 'Car Rental' ? 'Pickup Location' : 'Departure Airport'}
                        </label>
                        {activeTab === 'Hotels' ? (
                            <div className='relative z-50'>
                                <Autocomplete
                                    placeholder="Where are you going?"
                                    onSelect={(val) => updateTabState('from', val)}
                                    initialValue={currentState.from}
                                    icon={<icons.MapPin className="w-5 h-5" />}
                                    type="hotels"
                                />
                            </div>
                        ) : (
                            <div className='relative z-50'>
                                <Autocomplete
                                    placeholder={activeTab === 'Car Rental' ? 'Pick-up location' : 'Where are you flying from?'}
                                    onSelect={(val) => updateTabState('from', val)}
                                    initialValue={currentState.from}
                                    icon={<icons.MapPin className="w-5 h-5" />}
                                    type={activeTab === 'Car Rental' ? 'rentals' : 'flights'}
                                />
                            </div>
                        )}
                    </div>

                    {activeTab === 'Flights' && (
                        <div className="flex-1 w-full text-left relative z-40" key="flights-to">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Destination</label>
                            <Autocomplete
                                placeholder="Where are you going?"
                                onSelect={(val) => updateTabState('to', val)}
                                initialValue={currentState.to}
                                icon={<icons.Globe className="w-5 h-5" />}
                                type="flights"
                            />
                        </div>
                    )}

                    <div className="flex-1 w-full text-left relative z-30" key={`${activeTab}-date`}>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Travel Dates</label>
                        <Calendar
                            startDate={currentState.startDate}
                            endDate={currentState.endDate}
                            onRangeSelect={(start, end) => {
                                updateTabState('startDate', start);
                                updateTabState('endDate', end);
                            }}
                            isRange={true}
                            placeholder="When are you traveling?"
                            minDate={new Date()}
                        />
                    </div>


                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 group"
                    >
                        <icons.Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Search
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BookingEngine;
