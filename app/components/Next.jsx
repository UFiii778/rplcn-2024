"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CanvasRevealEffect } from "./magicui/ui/Canvas-Reveal-Effect";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

const certificates = [
  {
    id: 1,
    title: "Anonymous Message",
    issuer: "XII RPL",
    description: "Send a secret message or share your thoughts with all the students and the class teacher anonymously.",
    image: "https://images.unsplash.com/photo-1663813116840-cef0040331fe?q=80&w=1214&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colors: [[0, 183, 255]], // Biru
    animationSpeed: 3,
    link: "/message"
  },
  {
    id: 2,
    title: "Student Directory",
    issuer: "XII RPL",
    description: "View the full profiles of all classmates, including their personal details and social media accounts.",
    image: assets.memo1.src,
    colors: [[239, 68, 68]], // Merah
    animationSpeed: 3,
    link: "/student"
  },
  {
    id: 3,
    title: "Class Gallery",
    issuer: "XII RPL",
    description: "A record of exciting moments, memories, and shared activities during the time in the Class XII RPL.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop",
    colors: [[236, 72, 153]], // Pink
    animationSpeed: 3,
    link: "/gallery"
  }
];

const Next = () => {
  return (
    <div id="next" className="w-full px-[12%] py-16 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-center mb-2 text-lg font-Ovo">Explore Features</h4>
        <h2 className="text-center text-5xl font-Ovo">Classroom Hub</h2>
        <p className="text-center text-gray-500 max-w-xl mx-auto mt-4 mb-12 font-Ovo">
          Discover our class's various interactive features, ranging from anonymous messages and student profiles to a gallery of memories.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {certificates.map((cert, index) => (
          <Card key={cert.id} cert={cert} index={index} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ cert, index }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleNavigate = (e, path) => {
    e.preventDefault(); 
    router.push(path);  
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/10 dark:border-white/10 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-[30rem] rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
    >
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

      <div className="relative z-20 flex flex-col h-full w-full justify-between p-2">
        <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover/canvas-card:scale-105 transition-transform duration-300"
          />
        </div>

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

        <a
          href={cert.link}
          onClick={(e) => handleNavigate(e, cert.link)}
          className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gray-900 group-hover/canvas-card:bg-white group-hover/canvas-card:text-black text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
        >
          Check
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default Next;