"use client";

import React from "react";
import Image from "next/image";

const Gallery = ({ student, photos }) => {
  // Ambil galeri dari prop 'photos' ATAU dari 'student.gallery' ATAU gabungkan image, image2, image3
  const imageList = photos || student?.gallery || [
    student?.image,
    student?.image2,
    student?.image3,
  ].filter(Boolean); // Filter untuk membuang string/URL kosong

  // Fallback jika foto kurang dari 3
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
        {/* Kolom Kiri (2 Foto Kecil) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="h-44 rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
            <Image
              src={displayImages[0]}
              alt="Foto Galeri 1"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/60 px-2 py-1 rounded text-white">
              FOTO 1
            </span>
          </div>

          <div className="h-44 rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
            <Image
              src={displayImages[1]}
              alt="Foto Galeri 2"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/60 px-2 py-1 rounded text-white">
              FOTO 2
            </span>
          </div>
        </div>

        {/* Kolom Kanan (1 Foto Besar) */}
        <div className="md:col-span-8 h-full min-h-[368px] rounded-2xl overflow-hidden relative border border-stone-700 bg-stone-800 group">
          <Image
            src={displayImages[2]}
            alt="Foto Galeri 3"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/60 px-2 py-1 rounded text-white">
            FOTO 3
          </span>
        </div>
      </div>
    </section>
  );
};

export default Gallery;