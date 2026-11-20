"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export interface CustomDateTimePickerProps {
  travelDate: string; // YYYY-MM-DD
  travelTime: string; // e.g. "06:00 AM"
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  className?: string;
}

const QUICK_TIMES = [
  "06:00 AM",
  "09:00 AM",
  "12:00 PM",
  "03:30 PM",
  "06:00 PM",
  "09:30 PM",
  "11:00 PM",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  travelDate,
  travelTime,
  onDateChange,
  onTimeChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date
  const parsedDate = useMemo(() => {
    try {
      if (!travelDate) return new Date();
      const [year, month, day] = travelDate.split("-").map(Number);
      return new Date(year, month - 1, day);
    } catch {
      return new Date();
    }
  }, [travelDate]);

  // Calendar month/year navigation state
  const [viewYear, setViewYear] = useState(parsedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsedDate.getMonth());

  // Keep view aligned if external travelDate changes
  useEffect(() => {
    setViewYear(parsedDate.getFullYear());
    setViewMonth(parsedDate.getMonth());
  }, [parsedDate]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format display string
  const formattedDisplay = useMemo(() => {
    try {
      const today = new Date();
      const isToday =
        parsedDate.getDate() === today.getDate() &&
        parsedDate.getMonth() === today.getMonth() &&
        parsedDate.getFullYear() === today.getFullYear();

      const dayStr = parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });

      const prefix = isToday ? "Today, " : "";
      return `${prefix}${dayStr} • ${travelTime || "06:00 AM"}`;
    } catch {
      return `${travelDate} • ${travelTime}`;
    }
  }, [parsedDate, travelDate, travelTime]);

  // Calendar days grid generator
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const monthStr = String(viewMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = `${viewYear}-${monthStr}-${dayStr}`;
    onDateChange(dateStr);
  };

  const handleShortcut = (offsetDays: number) => {
    const target = new Date();
    target.setDate(target.getDate() + offsetDays);
    const year = target.getFullYear();
    const month = String(target.getMonth() + 1).padStart(2, "0");
    const day = String(target.getDate()).padStart(2, "0");
    onDateChange(`${year}-${month}-${day}`);
    setViewYear(year);
    setViewMonth(target.getMonth());
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-1.5">
        Date & Time
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-left outline-none hover:border-amber-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[44px] flex items-center justify-between group"
      >
        <CalendarDaysIcon className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="flex-1 min-w-0 pr-2">
          <span className="text-base sm:text-xs font-bold text-neutral-900 dark:text-white truncate block">
            {formattedDisplay}
          </span>
        </div>

        <ChevronDownIcon
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180 text-amber-500" : ""
          }`}
        />
      </button>

      {/* Calendar & Time Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-[70] right-0 sm:left-auto w-[310px] sm:w-[340px] max-w-[calc(100vw-2.5rem)] mt-2 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200/80 dark:border-neutral-700/80 overflow-hidden flex flex-col backdrop-blur-md p-3.5"
          >
            {/* Quick Date Shortcuts */}
            <div className="flex items-center gap-1.5 pb-2.5 border-b border-neutral-100 dark:border-neutral-800 text-[11px]">
              <span className="text-[10px] font-bold text-neutral-400 uppercase mr-0.5">Quick:</span>
              <button
                type="button"
                onClick={() => handleShortcut(0)}
                className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold hover:bg-amber-500/20 hover:text-amber-600 transition"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleShortcut(1)}
                className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold hover:bg-amber-500/20 hover:text-amber-600 transition"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleShortcut(2)}
                className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold hover:bg-amber-500/20 hover:text-amber-600 transition"
              >
                +2 Days
              </button>
            </div>

            {/* Month & Year Navigation Header */}
            <div className="flex items-center justify-between pt-2.5 pb-2">
              <span className="text-xs font-black text-neutral-900 dark:text-white">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {DAY_NAMES.map((d) => (
                <span
                  key={d}
                  className="text-[10px] font-bold uppercase text-neutral-400 py-1"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty leading padding days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="w-8 h-8" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected =
                  parsedDate.getDate() === day &&
                  parsedDate.getMonth() === viewMonth &&
                  parsedDate.getFullYear() === viewYear;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                      isSelected
                        ? "bg-amber-500 text-neutral-950 font-black shadow-md shadow-amber-500/30 scale-105"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/15 hover:text-amber-600 dark:hover:text-amber-400 active:scale-95"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Pickup Time Selection Section */}
            <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pickup Time</span>
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {travelTime}
                </span>
              </div>

              {/* Quick Time Pills */}
              <div className="flex flex-wrap gap-1">
                {QUICK_TIMES.map((t) => {
                  const isTimeSelected = t === travelTime;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => onTimeChange(t)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all ${
                        isTimeSelected
                          ? "bg-amber-500 text-neutral-950 shadow-sm"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Done Action Button */}
            <div className="mt-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-xs font-bold transition shadow-sm active:scale-98"
              >
                Apply Schedule
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDateTimePicker;
