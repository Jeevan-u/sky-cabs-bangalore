"use client";

import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export interface PaginationProps {
  className?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={`nc-Pagination inline-flex items-center space-x-1.5 text-sm font-semibold ${className}`}
      aria-label="Pagination"
    >
      {/* Previous Page Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        className="inline-flex h-10 px-3 items-center justify-center gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-bold"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        <span>Prev</span>
      </button>

      {/* Numbered Page Buttons */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange && onPageChange(page)}
            className={`inline-flex w-10 h-10 items-center justify-center rounded-xl text-xs font-bold transition-all ${
              isActive
                ? `bg-primary-6000 text-white shadow-md shadow-primary-6000/25 ${twFocusClass()}`
                : `bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 dark:text-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        className="inline-flex h-10 px-3 items-center justify-center gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-bold"
      >
        <span>Next</span>
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
