"use client";

import React, { useRef, useEffect } from "react";

export interface PixelCardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "blue" | "yellow" | "pink";
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  className = "",
  gap = 6,
  speed = 35,
  colors = "#f59e0b,#ea580c,#0284c7",
  noFocus = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const colorArray = colors.split(",");

    const onResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    let mouseX = -100;
    let mouseY = -100;
    let isHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovered = true;
    };

    const onMouseLeave = () => {
      isHovered = false;
      mouseX = -100;
      mouseY = -100;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const pixels: { x: number; y: number; alpha: number; color: string }[] = [];
    const cols = Math.floor(width / gap);
    const rows = Math.floor(height / gap);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        pixels.push({
          x: c * gap,
          y: r * gap,
          alpha: 0,
          color: colorArray[Math.floor(Math.random() * colorArray.length)],
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pixels.forEach((p) => {
        if (isHovered) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            p.alpha = Math.min(1, p.alpha + 0.15);
          } else {
            p.alpha = Math.max(0, p.alpha - 0.04);
          }
        } else {
          p.alpha = Math.max(0, p.alpha - 0.05);
        }

        if (p.alpha > 0.01) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.45;
          ctx.fillRect(p.x, p.y, gap - 1, gap - 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gap, speed, colors]);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
      <div className="relative z-0 h-full w-full">{children}</div>
    </div>
  );
};

export default PixelCard;
