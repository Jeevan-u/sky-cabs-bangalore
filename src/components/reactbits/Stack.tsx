"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface StackCardItem {
  id: string | number;
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
}

export interface StackProps {
  cards: StackCardItem[];
  className?: string;
  onCardClick?: (card: StackCardItem) => void;
  sendToBackOnClick?: boolean;
  sensitivity?: number;
}

export const Stack: React.FC<StackProps> = ({
  cards: initialCards,
  className = "",
  onCardClick,
  sendToBackOnClick = true,
}) => {
  const [cards, setCards] = useState<StackCardItem[]>(initialCards);

  const sendToBack = (id: string | number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((c) => c.id === id);
      if (index === -1) return prev;
      const [moved] = newCards.splice(index, 1);
      newCards.push(moved);
      return newCards;
    });
  };

  return (
    <div className={`relative w-full h-[380px] sm:h-[420px] flex items-center justify-center select-none ${className}`}>
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          const isTop = index === 0;
          // Calculate offset rotation and scale for stack depth
          const rotation = index === 0 ? 0 : index === 1 ? -4 : index === 2 ? 3 : -2;
          const yOffset = index * 12;
          const scale = 1 - index * 0.05;
          const zIndex = cards.length - index;

          if (index > 3) return null; // Render max 4 in stack for performance

          return (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{
                scale,
                rotate: rotation,
                y: yOffset,
                opacity: 1 - index * 0.18,
                zIndex,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                y: -60,
                rotate: rotation * 2,
                transition: { duration: 0.3 },
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              whileHover={isTop ? { scale: 1.02, rotate: 0 } : undefined}
              onClick={() => {
                if (onCardClick) onCardClick(card);
                if (sendToBackOnClick && isTop) {
                  sendToBack(card.id);
                }
              }}
              className={`absolute w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-neutral-900 cursor-pointer ${
                isTop ? "cursor-grab active:cursor-grabbing" : ""
              }`}
            >
              {/* Card Image */}
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
              </div>

              {/* Gradient Backdrop Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Card Meta Text */}
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                {card.tag && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-neutral-950 mb-1.5 shadow-sm">
                    {card.tag}
                  </span>
                )}
                <h4 className="text-base sm:text-lg font-black tracking-tight drop-shadow-md">
                  {card.title}
                </h4>
                {card.subtitle && (
                  <p className="text-xs text-neutral-300 font-medium line-clamp-1 drop-shadow">
                    {card.subtitle}
                  </p>
                )}
              </div>

              {/* Hint badge on top card */}
              {isTop && (
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white/90 border border-white/10 flex items-center gap-1">
                  <span>Tap to swap</span>
                  <span>↷</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Stack;
