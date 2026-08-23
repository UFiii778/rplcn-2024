"use client";

import ImageWithSkeleton from "@/app/components/ImageWithSkeleton";
import React from "react";

const Gallery = ({ student, photos }) => {
  const imageList = photos || student?.gallery || [
    student?.image,
    student?.image2,
    student?.image3,
  ].filter(Boolean); 

  const defaultImages = [
    "https://picsum.photos/id/1005/400/400",
    "https://picsum.photos/id/1012/400/400",
    "https://picsum.photos/id/1027/800/600",
  ];

  const displayImages = [
    imageList[0] || defaultImages[0],
    imageList[1] || defaultImages[1],
    imageList[2] || defaultImages[2],
  ];

  return (
    <section id="gallery" className="w-full max-w-4xl mx-auto px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="h-44 rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
            <ImageWithSkeleton
              src={displayImages[0]}
              alt="Foto Galeri 1"
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="h-44 rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
            <ImageWithSkeleton
              src={displayImages[1]}
              alt="Foto Galeri 2"
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="md:col-span-8 h-80 md:h-[368px] rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
          <ImageWithSkeleton
            src={displayImages[2]}
            alt="Foto Galeri 3"
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;