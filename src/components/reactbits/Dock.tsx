"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
  highlight?: boolean;
}

interface DockProps {
  items: DockItem[];
  className?: string;
  isInline?: boolean;
}

function DockIcon({
  item,
  mouseX,
}: {
  item: DockItem;
  mouseX: any;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [40, 54, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 12 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={`group relative flex items-center justify-center rounded-2xl shadow-md border transition-colors ${
        item.highlight
          ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
          : "bg-white/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border-neutral-200/80 dark:border-neutral-700/80 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
      }`}
    >
      <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>

      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 rounded-md bg-neutral-900 px-2 py-0.5 text-[11px] font-semibold text-white opacity-0 shadow transition-opacity group-hover:opacity-100 whitespace-nowrap">
        {item.label}
      </span>
    </motion.div>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={item.href as any}>{content}</Link>;
}

export const Dock: React.FC<DockProps> = ({ items, className = "", isInline = false }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`${
        isInline
          ? "relative flex items-center justify-center gap-2 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/60 dark:bg-neutral-800/50 p-2 backdrop-blur-md shadow-xs"
          : "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3 rounded-3xl border border-neutral-200/80 dark:border-neutral-700/80 bg-white/70 dark:bg-neutral-900/70 p-2.5 backdrop-blur-xl shadow-2xl"
      } ${className}`}
    >
      {items.map((item, idx) => (
        <DockIcon key={idx} item={item} mouseX={mouseX} />
      ))}
    </div>
  );
};

export default Dock;
