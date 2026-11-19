"use client";

import React, { useEffect } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        Something went wrong!
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-8">
        An unexpected error occurred while loading this page. Please try refreshing or return to homepage.
      </p>
      <div className="flex gap-4">
        <ButtonPrimary onClick={() => reset()}>Try Again</ButtonPrimary>
        <a
          href="/"
          className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-600 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
