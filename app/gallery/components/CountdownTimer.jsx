"use client";

import React, { useState, useEffect } from "react";

const CountdownTimer = ({ 
  targetDate, 
  title = "This page will be ready on", 
  subtitle = "Agit mau fokus TKA sama PKL" 
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  if (!isMounted) return null;

  const units = [
    { label: "DAYS", value: formatNumber(timeLeft.days) },
    { label: "HOURS", value: formatNumber(timeLeft.hours) },
    { label: "MINUTES", value: formatNumber(timeLeft.minutes) },
    { label: "SECONDS", value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-200/50 max-w-xl w-full text-center">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 tracking-tight">
        {title}
      </h3>
      <p className="text-slate-600 font-normal text-sm sm:text-base mb-8">
        {subtitle}
      </p>

      <div className="grid grid-cols-4 gap-3 sm:gap-6 items-center">
        {units.map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight h-12 sm:h-14 flex items-center">
              {unit.value}
            </span>
            <div className="w-full bg-white border border-slate-100 shadow-sm rounded-xl py-2 mt-3 text-center">
              <span className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-900 uppercase">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;