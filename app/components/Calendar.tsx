'use client';

import React, { useState, useRef, useEffect } from 'react';
import { icons } from '@/assets/icons';

interface CalendarProps {
    selectedDate: string;
    onDateSelect: (date: string) => void;
    placeholder?: string;
    minDate?: Date;
}

export default function Calendar({ selectedDate, onDateSelect, placeholder = 'Select date', minDate }: CalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const calendarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Update dropdown position when opening or scrolling
    useEffect(() => {
        const updatePosition = () => {
            if (isOpen && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + 8,
                    left: rect.left
                });
            }
        };

        updatePosition();
        
        if (isOpen) {
            window.addEventListener('scroll', updatePosition);
            return () => window.removeEventListener('scroll', updatePosition);
        }
    }, [isOpen]);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const parseDate = (dateStr: string) => {
        if (!dateStr) return null;
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const isDateDisabled = (date: Date) => {
        if (!minDate) return false;
        return date < minDate;
    };

    const isSameDay = (date1: Date, date2: Date | null) => {
        if (!date2) return false;
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return isSameDay(date, today);
    };

    const handleDateClick = (day: number) => {
        const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (!isDateDisabled(selected)) {
            onDateSelect(formatDate(selected));
            setIsOpen(false);
        }
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10"></div>);
        }

        // Actual days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isSelected = isSameDay(date, parseDate(selectedDate));
            const isDisabled = isDateDisabled(date);
            const isTodayDate = isToday(date);

            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isDisabled}
                    className={`
                        h-10 rounded-lg text-sm font-medium transition-all
                        ${isSelected ? 'bg-primary text-white shadow-lg scale-105' : ''}
                        ${!isSelected && isTodayDate ? 'bg-secondary/10 text-secondary font-bold' : ''}
                        ${!isSelected && !isTodayDate && !isDisabled ? 'hover:bg-gray-100 text-gray-700' : ''}
                        ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    const displayValue = selectedDate ? parseDate(selectedDate)?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : placeholder;

    return (
        <div ref={calendarRef} className="relative w-full">
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-primary/30 transition-all focus:outline-none focus:border-primary"
            >
                <span className={`text-sm ${selectedDate ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                    {displayValue}
                </span>
                <icons.Calendar className="w-5 h-5 text-gray-400" />
            </button>

            {isOpen && (
                <div
                    className="fixed bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-[9999] w-80"
                    style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
                >
                    {/* Month/Year Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <icons.ChevronDown className="w-5 h-5 text-gray-600 rotate-90" />
                        </button>
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <icons.ChevronDown className="w-5 h-5 text-gray-600 -rotate-90" />
                        </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {daysOfWeek.map(day => (
                            <div key={day} className="h-8 flex items-center justify-center text-xs font-bold text-gray-400 uppercase">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {renderCalendarDays()}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                onDateSelect(formatDate(new Date()));
                                setIsOpen(false);
                            }}
                            className="text-xs font-semibold text-secondary hover:text-primary transition-colors"
                        >
                            Today
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onDateSelect('');
                                setIsOpen(false);
                            }}
                            className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
