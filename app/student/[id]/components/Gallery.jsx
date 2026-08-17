"use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Gallery = ({ photos }) => {
  const defaultImages = [
    assets.Rpls || assets.profile,
    assets.Rider || assets.profile,
    assets.meOnyellow || assets.profile,
  ];

  const imgList = photos && photos.length >= 3 ? photos : defaultImages;

  return (
    <section id="gallery" className="w-full max-w-4xl mx-auto px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="h-44 rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
            <Image
              src={imgList[0]}
              alt="Foto 1"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/60 px-2 py-1 rounded text-white">FOTO</span>
          </div>

          <div className="h-44 rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
            <Image
              src={imgList[1]}
              alt="Foto 2"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/60 px-2 py-1 rounded text-white">FOTO</span>
          </div>
        </div>

        <div className="md:col-span-8 h-full min-h-[368px] rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
          <Image
            src={imgList[2]}
            alt="Foto 3"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/60 px-2 py-1 rounded text-white">FOTO</span>
        </div>
      </div>
    </section>
  );
};

export default Gallery;