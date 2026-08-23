"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); 
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      <div className="w-[250px] sm:w-[350px] flex flex-col items-center gap-6">
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
        >
          <Image
            src="/icon.png" 
            alt="Logo"
            width={112}
            height={112}
            className="w-full h-full object-contain"
            priority
          />
        </motion.div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-end font-Ovo">
            <span className="text-sm text-gray-400 tracking-wider">Loading</span>
            <span className="text-2xl font-bold text-white">
              {Math.min(progress, 100)}%
            </span>
          </div>

          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-slate-100 to-white rounded-full"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeInOut", duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;