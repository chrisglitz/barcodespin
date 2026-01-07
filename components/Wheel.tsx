'use client';

import { useEffect, useRef, useState } from 'react';
import { Question } from '@/lib/questions';
import {
  DEGREES_PER_SEGMENT,
  calculateTargetRotation,
  easeOutCubic,
} from '@/lib/wheelMath';

interface WheelProps {
  questions: Question[];
  targetIndex: number | null;
  onSpinComplete: () => void;
  isSpinning: boolean;
}

const COLORS = {
  orange: '#f6921e',
  blue: '#1b75bb',
  gray: '#4d4d4d',
  lightGray: '#d9d9d9',
};

export default function Wheel({
  questions,
  targetIndex,
  onSpinComplete,
  isSpinning,
}: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startRotationRef = useRef(0);
  const targetRotationRef = useRef(0);

  const SPIN_DURATION = 4000; // 4 seconds

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Save context and rotate
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    // Draw segments
    const segmentAngle = (2 * Math.PI) / questions.length;

    questions.forEach((question, index) => {
      const startAngle = index * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;

      // Alternate colors for visual distinction
      let color: string;
      if (index % 4 === 0) color = COLORS.orange;
      else if (index % 4 === 1) color = COLORS.blue;
      else if (index % 4 === 2) color = COLORS.gray;
      else color = COLORS.lightGray;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text (segment numbers for clarity)
      ctx.save();
      const textAngle = startAngle + segmentAngle / 2;
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = index % 4 === 3 ? '#000' : '#fff';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`${index + 1}`, 0, -radius + 25);
      ctx.restore();
    });

    ctx.restore();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = COLORS.orange;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw pointer (at top)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.beginPath();
    ctx.moveTo(0, -radius - 10);
    ctx.lineTo(-15, -radius + 10);
    ctx.lineTo(15, -radius + 10);
    ctx.closePath();
    ctx.fillStyle = COLORS.orange;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add glow to pointer
    ctx.shadowColor = COLORS.orange;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.restore();
  }, [questions, rotation]);

  // Spin animation
  useEffect(() => {
    if (!isSpinning || targetIndex === null) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    startTimeRef.current = null;
    startRotationRef.current = rotation;
    targetRotationRef.current = calculateTargetRotation(targetIndex, rotation);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / SPIN_DURATION, 1);
      const easedProgress = easeOutCubic(progress);

      const currentRotation =
        startRotationRef.current +
        (targetRotationRef.current - startRotationRef.current) * easedProgress;

      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
        onSpinComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, targetIndex, onSpinComplete]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="max-w-full h-auto"
        style={{ filter: 'drop-shadow(0 0 20px rgba(246, 146, 30, 0.3))' }}
      />
    </div>
  );
}
