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
    type?: 'flights' | 'hotels' | 'rentals';
}

const Autocomplete: React.FC<AutocompleteProps> = ({ placeholder, onSelect, icon, initialValue = '', type = 'hotels' }) => {
    const [query, setQuery] = useState(initialValue);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

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
            if (query.length < 4) {
                setSuggestions([]);
                setIsOpen(false);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setIsOpen(true);
            try {
                const res = await fetch(`/api/search/suggestions?query=${encodeURIComponent(query)}&type=${type}`);
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setSuggestions(data.data);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query, type]);

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
                    onFocus={() => {
                        const hasRedundantSuggestions = suggestions.some(s => s.text.toLowerCase() === query.toLowerCase());
                        if (query.length >= 4 && !hasRedundantSuggestions) setIsOpen(true);
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all"
                />
            </div>

            {isOpen && (query.length >= 4) && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <div className="px-4 py-4 flex items-center justify-center gap-3 text-gray-500">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm font-medium">Searching...</span>
                        </div>
                    ) : suggestions.filter(s => s.text.toLowerCase() !== query.toLowerCase()).length > 0 ? (
                        suggestions
                            .filter(s => s.text.toLowerCase() !== query.toLowerCase())
                            .map((suggestion) => (

                                <button
                                    key={suggestion.id}
                                    onClick={() => handleSelect(suggestion)}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b last:border-0 border-gray-50"
                                >
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600 shrink-0">
                                        <icons.MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{suggestion.data.title || suggestion.text}</p>
                                        {(suggestion.data.city || suggestion.data.country) && (
                                            <p className="text-xs text-gray-500">
                                                {[suggestion.data.city, suggestion.data.country].filter(Boolean).join(', ')}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))
                    ) : null}
                </div>
            )}
        </div>
    );
};


export default Autocomplete;
