'use client';

import React, { useState, useRef, useEffect } from 'react';
import { icons } from '@/assets/icons';
import { calendarData } from '@/app/data';
const { months, daysOfWeek } = calendarData;

interface CalendarProps {
    selectedDate?: string;
    startDate?: string;
    endDate?: string;
    onDateSelect?: (date: string) => void;
    onRangeSelect?: (start: string, end: string) => void;
    placeholder?: string;
    minDate?: Date;
    isRange?: boolean;
}

export default function Calendar({
    selectedDate,
    startDate,
    endDate,
    onDateSelect,
    onRangeSelect,
    placeholder = 'Select date',
    minDate,
    isRange = false
}: CalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const calendarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);



    // Update dropdown position when opening or scrolling
    useEffect(() => {
        const updatePosition = () => {
            if (isOpen && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + 8,
                    left: Math.max(10, Math.min(rect.left, window.innerWidth - 330))
                });
            }
        };

        updatePosition();

        if (isOpen) {
            window.addEventListener('scroll', updatePosition);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition);
                window.removeEventListener('resize', updatePosition);
            };
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
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const parseDate = (dateStr?: string) => {
        if (!dateStr) return null;
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const isDateDisabled = (date: Date) => {
        if (!minDate) return false;
        const compareDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        return date < compareDate;
    };

    const isSameDay = (date1: Date, date2: Date | null) => {
        if (!date2) return false;
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };

    const isDateInRange = (date: Date) => {
        if (!startDate || !endDate) return false;
        const start = parseDate(startDate)!;
        const end = parseDate(endDate)!;
        return date > start && date < end;
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return isSameDay(date, today);
    };

    const handleDateClick = (day: number) => {
        const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (isDateDisabled(selected)) return;

        if (isRange) {
            if (!startDate || (startDate && endDate)) {
                onRangeSelect?.(formatDate(selected), '');
            } else {
                const currentStart = parseDate(startDate)!;
                if (selected < currentStart) {
                    onRangeSelect?.(formatDate(selected), '');
                } else {
                    onRangeSelect?.(startDate, formatDate(selected));
                    setIsOpen(false);
                }
            }
        } else {
            onDateSelect?.(formatDate(selected));
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

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isSelected = isRange
                ? (isSameDay(date, parseDate(startDate)) || isSameDay(date, parseDate(endDate)))
                : isSameDay(date, parseDate(selectedDate));
            const isInRange = isRange && isDateInRange(date);
            const isDisabled = isDateDisabled(date);
            const isTodayDate = isToday(date);
            const isStart = isRange && isSameDay(date, parseDate(startDate));
            const isEnd = isRange && isSameDay(date, parseDate(endDate));

            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isDisabled}
                    className={`
                        h-10 w-full text-sm font-medium transition-all relative
                        ${isSelected ? 'bg-primary text-white z-10' : ''}
                        ${isStart ? 'rounded-l-lg' : ''}
                        ${isEnd ? 'rounded-r-lg' : ''}
                        ${!isRange && isSelected ? 'rounded-lg shadow-lg scale-105' : ''}
                        ${isInRange ? 'bg-primary/10 text-primary' : ''}
                        ${!isSelected && isTodayDate ? 'text-secondary font-bold' : ''}
                        ${!isSelected && !isInRange && !isTodayDate && !isDisabled ? 'hover:bg-gray-100 text-gray-700 rounded-lg' : ''}
                        ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    {day}
                    {isTodayDate && !isSelected && !isInRange && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-secondary rounded-full"></div>
                    )}
                </button>
            );
        }

        return days;
    };

    const formatDisplayDate = (dateStr?: string) => {
        if (!dateStr) return '';
        const date = parseDate(dateStr);
        if (!date) return '';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const displayValue = isRange
        ? (startDate ? `${formatDisplayDate(startDate)}${endDate ? ` - ${formatDisplayDate(endDate)}` : ' - ...'}` : placeholder)
        : (selectedDate ? parseDate(selectedDate)?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }) : placeholder);

    return (
        <div ref={calendarRef} className="relative w-full">
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-primary/30 transition-all focus:outline-none focus:border-primary"
            >
                <span className={`text-sm ${(isRange ? startDate : selectedDate) ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                    {displayValue}
                </span>
                <icons.Calendar className="w-5 h-5 text-gray-400" />
            </button>

            {isOpen && (
                <div
                    className="fixed bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-9999 w-[265px]"
                    style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                            <icons.ChevronDown className="w-5 h-5 text-gray-600 rotate-90" />
                        </button>
                        <div className="text-lg font-bold text-primary">
                            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </div>
                        <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                            <icons.ChevronDown className="w-5 h-5 text-gray-600 -rotate-90" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {daysOfWeek.map(day => (
                            <div key={day} className="h-8 flex items-center justify-center text-xs font-bold text-gray-400 uppercase">{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {renderCalendarDays()}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                if (isRange) {
                                    onRangeSelect?.(formatDate(new Date()), '');
                                } else {
                                    onDateSelect?.(formatDate(new Date()));
                                }
                                setIsOpen(false);
                            }}
                            className="text-xs font-semibold text-secondary"
                        >
                            Today
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (isRange) {
                                    onRangeSelect?.('', '');
                                } else {
                                    onDateSelect?.('');
                                }
                                setIsOpen(false);
                            }}
                            className="text-xs font-semibold text-gray-400"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

