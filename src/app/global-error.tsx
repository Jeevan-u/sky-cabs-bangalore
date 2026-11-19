"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white text-neutral-900 font-sans">
        <h1 className="text-4xl font-bold mb-4">500 - Server-Side Error</h1>
        <p className="text-neutral-600 max-w-md mb-8">
          A critical system error occurred. Our dispatch operations team has been alerted.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
