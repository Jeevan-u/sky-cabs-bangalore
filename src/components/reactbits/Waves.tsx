"use client";

import React, { useRef, useEffect } from "react";

interface WavesProps {
  lineColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  className?: string;
}

export const Waves: React.FC<WavesProps> = ({
  lineColor = "rgba(245, 158, 11, 0.25)",
  waveSpeedX = 0.015,
  waveSpeedY = 0.01,
  waveAmpX = 35,
  waveAmpY = 20,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step++;

      const height = canvas.height;
      const width = canvas.width;
      const lines = 4;

      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = lineColor;

        for (let x = 0; x <= width; x += 15) {
          const y =
            height / 2 +
            Math.sin(x * waveSpeedX + step * 0.03 + l) * (waveAmpX + l * 5) +
            Math.cos(x * waveSpeedY + step * 0.02 + l) * (waveAmpY + l * 3);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default Waves;
