"use client";

import { useGame } from "@/hooks/useGame";
import { useEffect, useRef } from "react";

interface GameTimerProps {
  totalTime?: number;
  timeUp: () => void;
}

export default function GameTimer({ totalTime = 10, timeUp }: GameTimerProps) {
  const { timeLeft, updateTimer, isActive, selectedAnswer } = useGame();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTimerActive = isActive && selectedAnswer === null && timeLeft >= 0;

  useEffect(() => {
    if (isTimerActive) {
      intervalRef.current = setInterval(() => {
        updateTimer(timeLeft - 1);

        // Check if time is up
        if (timeLeft <= 0) {
          timeUp();
        }
      }, 1000);
    } else {
      // Clear interval when timer should stop
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerActive, timeLeft, updateTimer, timeUp]);

  const percentage = (timeLeft / totalTime) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={timeLeft > 3 ? "rgb(34 197 94)" : "rgb(239 68 68)"} // green-500 or red-500
          strokeWidth="10"
          // strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
    </div>
  );
}
