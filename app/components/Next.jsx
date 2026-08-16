"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CanvasRevealEffect } from "./magicui/ui/Canvas-Reveal-Effect";
import { ArrowUpRight } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    issuer: "Coding Camp 2026",
    description: "Sertifikasi keahlian dalam membangun aplikasi web modern berbasis React, Node.js, dan database SQL.",
    image: assets.Rpls?.src || assets.Rpls,
    colors: [[0, 183, 255]], // Biru Cyan
    animationSpeed: 3,
    link: "#"
  },
  {
    id: 2,
    title: "Backend Engineering",
    issuer: "Dicoding Indonesia",
    description: "Sertifikasi pembuatan RESTful API terstruktur, autentikasi aman, dan manajemen database MySQL.",
    image: assets.Rpls?.src || assets.Rpls,
    colors: [[239, 68, 68]], // Merah
    animationSpeed: 3,
    link: "#"
  },
  {
    id: 3,
    title: "UI/UX & Frontend Design",
    issuer: "Google Career Certificates",
    description: "Pelatihan antarmuka pengguna, komponen interaktif, serta implementasi Tailwind CSS yang responsif.",
    image: assets.Rpls?.src || assets.Rpls,
    colors: [[236, 72, 153]], // Pink
    animationSpeed: 3,
    link: "#"
  }
];

const Next = () => {
  return (
    <div id="next" className="w-full px-[12%] py-16 scroll-mt-20">
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-center mb-2 text-lg font-Ovo">Achievements</h4>
        <h2 className="text-center text-5xl font-Ovo">My Certificates</h2>
        <p className="text-center text-gray-500 max-w-xl mx-auto mt-4 mb-12 font-Ovo">
          Professional certifications and training programs I have completed to validate my expertise in software development.
        </p>
      </motion.div>

      {/* 3 Canvas Reveal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {certificates.map((cert, index) => (
          <Card key={cert.id} cert={cert} index={index} />
        ))}
      </div>
    </div>
  );
};

// Sub-komponen Kartu dengan efek Hover Canvas Reveal
const Card = ({ cert, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/10 dark:border-white/10 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-[30rem] rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Background Canvas Effect saat Hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0 z-0"
          >
            <CanvasRevealEffect
              animationSpeed={cert.animationSpeed}
              containerClassName="bg-black"
              colors={cert.colors}
              dotSize={2}
              showGradient={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten Utama Kartu */}
      <div className="relative z-20 flex flex-col h-full w-full justify-between p-2">
        {/* Gambar */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-cover group-hover/canvas-card:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Teks Informasi */}
        <div className="flex flex-col mt-4 transition-colors duration-300 group-hover/canvas-card:text-white">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover/canvas-card:text-gray-300 mb-1">
            {cert.issuer}
          </span>
          <h3 className="text-xl font-bold text-gray-800 group-hover/canvas-card:text-white mb-2 font-Ovo">
            {cert.title}
          </h3>
          <p className="text-gray-600 group-hover/canvas-card:text-gray-200 text-sm line-clamp-3 font-Ovo">
            {cert.description}
          </p>
        </div>

        {/* Tombol Akses */}
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gray-900 group-hover/canvas-card:bg-white group-hover/canvas-card:text-black text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-sm"
        >
          View Certificate
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default Next;