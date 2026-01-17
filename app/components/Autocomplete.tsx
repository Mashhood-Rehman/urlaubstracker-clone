'use client';

import React, { useState, useEffect, useRef } from 'react';
import { icons } from '@/assets/icons';

interface Suggestion {
    id: number;
    text: string;
    type: string;
    data: any;
}

interface AutocompleteProps {
    placeholder: string;
    onSelect: (value: string) => void;
    icon?: React.ReactNode;
    initialValue?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ placeholder, onSelect, icon, initialValue = '' }) => {
    const [query, setQuery] = useState(initialValue);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`/api/search/suggestions?query=${encodeURIComponent(query)}`);
                const data = await res.json();
                if (data.success) {
                    setSuggestions(data.data);
                    setIsOpen(true);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (suggestion: Suggestion) => {
        setQuery(suggestion.text);
        onSelect(suggestion.text);
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onSelect(e.target.value);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary">
                        {icon}
                    </div>
                )}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => { if (suggestions.length > 0) setIsOpen(true); }}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all"
                />
            </div>

            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion.id}
                            onClick={() => handleSelect(suggestion)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b last:border-0 border-gray-50"
                        >
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                <icons.MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{suggestion.data.title}</p>
                                <p className="text-xs text-gray-500">{suggestion.data.city}, {suggestion.data.country}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Autocomplete;
