"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export interface FleetImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  /** Auto-advance interval in ms. Set to 0 to disable. */
  interval?: number;
  objectFit?: "cover" | "contain";
  priority?: boolean;
  sizes?: string;
  showArrows?: boolean;
  showDots?: boolean;
}

const FleetImageSlider: FC<FleetImageSliderProps> = ({
  images,
  alt,
  className = "",
  interval = 3500,
  objectFit = "cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  showArrows = true,
  showDots = true,
}) => {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const goTo = (next: number) => {
    if (images.length === 0) return;
    const wrapped = (next + images.length) % images.length;
    setSlide(([current]) => [wrapped, wrapped > current ? 1 : -1]);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!interval || paused || images.length < 2) return;
    const timer = window.setInterval(() => {
      setSlide(([current]) => [(current + 1) % images.length, 1]);
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval, paused, images.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: false,
    trackTouch: true,
    trackMouse: false,
  });

  if (images.length === 0) return null;

  return (
    <div
      {...swipeHandlers}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`relative h-full w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 select-none ${className}`}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${alt} ${index + 1} of ${images.length}`}
            fill
            priority={priority && index === 0}
            sizes={sizes}
            className={
              objectFit === "contain"
                ? "object-contain p-3 sm:p-5"
                : "object-cover"
            }
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom gradient for controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />

      {showArrows && images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-1.5 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white hover:scale-105 active:scale-95 sm:left-3 sm:p-2"
          >
            <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-1.5 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white hover:scale-105 active:scale-95 sm:right-3 sm:p-2"
          >
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur-sm">
          {images.map((image, i) => (
            <button
              key={`${image}-${i}`}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-amber-400" : "w-1.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FleetImageSlider;
