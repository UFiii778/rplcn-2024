"use client";

import React from "react";
import { assets } from "@/assets/assets";
import { BsInstagram } from "react-icons/bs";
import { LayoutGrid } from "./magicui/ui/LayoutGrid";

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
    className: "md:col-span-2 min-h-[300px]", 
    thumbnail: assets.memo.src,
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
    thumbnail: assets.memo1.src,
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
    thumbnail: assets.memo2.src,
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
    thumbnail: assets.Rpls.src,
  },
];

const Gallery = () => {
  return (
    <div
      id="social"
      className="w-full min-h-screen flex flex-col items-center justify-center gap-6 py-20 bg-white"
    >
      <div className="w-11/12 max-w-5xl text-center mx-auto flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-xl md:text-5xl font-Ovo font-medium text-black">
          <span className="inline-block text-3xl sm:text-6xl lg:text-[46px] text-center">
            Random Moment's
          </span>
        </div>

        <p className="max-w-2xl text-neutral-900 dark:text-neutral-800">
          Hilarious and stupid things that happen in class
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 z-10">
          <a
            href="https://www.instagram.com/rplcn24?"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 border border-white/20 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2"
          >
            Check out our classes <BsInstagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <LayoutGrid cards={cards} />
      </div>
    </div>
  );
};

export default Gallery;