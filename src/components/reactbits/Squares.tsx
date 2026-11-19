"use client";

import React, { useRef, useEffect, useState } from "react";

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = "right",
  speed = 0.5,
  borderColor = "rgba(255, 255, 255, 0.08)",
  squareSize = 40,
  hoverFillColor = "rgba(245, 158, 11, 0.15)",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let offset = 0;
    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / squareSize) + 1;
      const rows = Math.ceil(canvas.height / squareSize) + 1;

      offset = (offset + speed) % squareSize;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * squareSize;
          let y = j * squareSize;

          if (direction === "right") x = (x + offset) % (cols * squareSize) - squareSize;
          if (direction === "left") x = (x - offset + cols * squareSize) % (cols * squareSize) - squareSize;
          if (direction === "down") y = (y + offset) % (rows * squareSize) - squareSize;
          if (direction === "up") y = (y - offset + rows * squareSize) % (rows * squareSize) - squareSize;

          // Check if hovered
          const isHovered =
            hoveredSquare &&
            hoveredSquare.x >= x &&
            hoveredSquare.x < x + squareSize &&
            hoveredSquare.y >= y &&
            hoveredSquare.y < y + squareSize;

          if (isHovered) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor, hoveredSquare]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setHoveredSquare({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => setHoveredSquare(null);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full h-full pointer-events-auto ${className}`}
    />
  );
};

export default Squares;
