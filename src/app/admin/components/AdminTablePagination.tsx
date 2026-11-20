"use client";

import React, { FC } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export interface AdminTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  className?: string;
}

const AdminTablePagination: FC<AdminTablePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
  className = "",
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate smart page pills (1, 2, ... totalPages)
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={`p-3.5 sm:p-5 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs select-none bg-neutral-50/60 dark:bg-neutral-900/60 backdrop-blur-md transition-colors ${className}`}
    >
      {/* Left side: Results Count & Rows Per Page Dropdown */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 text-neutral-600 dark:text-neutral-400 w-full sm:w-auto">
        <div className="text-[11px] sm:text-xs">
          Showing{" "}
          <span className="font-black text-neutral-900 dark:text-white">
            {startItem}
          </span>{" "}
          to{" "}
          <span className="font-black text-neutral-900 dark:text-white">
            {endItem}
          </span>{" "}
          of{" "}
          <span className="font-black text-neutral-900 dark:text-white">
            {totalItems}
          </span>{" "}
          entries
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-[11px] sm:text-xs outline-none shadow-2xs hover:border-primary-500 focus:border-primary-500 transition-colors"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right side: Page Navigation Controls */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full sm:w-auto">
        {/* First Page */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          className="p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-2xs"
          title="First Page"
        >
          <ChevronDoubleLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-2xs"
          title="Previous Page"
        >
          <ChevronLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Mobile Page Indicator */}
        <span className="sm:hidden px-2.5 py-1 text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          {currentPage} / {totalPages}
        </span>

        {/* Numbered Page Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-1 px-1">
          {pageNumbers.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-7 h-7 flex items-center justify-center text-neutral-400 font-mono"
                >
                  ...
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-primary-6000 text-white shadow-md shadow-primary-6000/30 scale-105"
                    : "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-2xs"
          title="Next Page"
        >
          <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          className="p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-2xs"
          title="Last Page"
        >
          <ChevronDoubleRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminTablePagination;