"use client";

import React from "react";
import { motion } from "motion/react";
import { BsInstagram } from "react-icons/bs";
import { assets } from "@/assets/assets";
import { LayoutGrid } from "./magicui/ui/LayoutGrid";
// 1. Deklarasi data kartu galeri untuk LayoutGrid
const cards = [
  {
    id: 1,
    content: (
      <div>
        <p className="font-bold text-white text-xl md:text-2xl">Me</p>
        <p className="font-normal text-white text-sm my-2">
          Personal captures and coding moments.
        </p>
      </div>
    ),
    className: "md:col-span-2 min-h-[300px]", // Mengambil 2 kolom di layar sedang/besar
    thumbnail: assets.Rpls.src || assets.Rpls,
  },
  {
    id: 2,
    content: (
      <div>
        <p className="font-bold text-white text-xl md:text-2xl">Camera Man</p>
        <p className="font-normal text-white text-sm my-2">
          Capturing stories behind the lens.
        </p>
      </div>
    ),
    className: "col-span-1 min-h-[300px]",
    thumbnail: assets.Rider?.src || assets.Rider,
  },
  {
    id: 3,
    content: (
      <div>
        <p className="font-bold text-white text-xl md:text-2xl">Rider</p>
        <p className="font-normal text-white text-sm my-2">
          Exploring the roads and outdoors.
        </p>
      </div>
    ),
    className: "col-span-1 min-h-[300px]",
    thumbnail: assets.Rpls.src || assets.Rpls,
  },
  {
    id: 4,
    content: (
      <div>
        <p className="font-bold text-white text-xl md:text-2xl">Yellow Vibes</p>
        <p className="font-normal text-white text-sm my-2">
          Bright aesthetic and colorful frames.
        </p>
      </div>
    ),
    className: "md:col-span-2 min-h-[300px]",
    thumbnail: assets.meOnyellow?.src || assets.meOnyellow,
  },
];

const Gallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      id="social"
      className="w-full min-h-screen flex flex-col items-center justify-center gap-6 py-20 bg-white"
    >
      {/* Section Header */}
      <div className="w-11/12 max-w-5xl text-center mx-auto flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-xl md:text-5xl font-Ovo font-medium text-black">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="inline-block text-3xl sm:text-6xl lg:text-[46px] text-center"
          >
            Beyond the Code
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="max-w-2xl text-neutral-600 dark:text-neutral-400"
        >
          When I'm not staring at a code editor, I'm out capturing moments and exploring life. Here’s a glimpse of my world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2 z-10"
        >
          <a
            href="https://www.instagram.com/luthfiiizzz_?igsh=Nm4xdnE1dmg4aHZy"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 border border-white/20 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2"
          >
            Connect on Instagram <BsInstagram className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Grid Layout Galeri */}
      <div className="w-full max-w-6xl mx-auto">
        <LayoutGrid cards={cards} />
      </div>
    </motion.div>
  );
};

export default Gallery;