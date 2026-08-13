"use client";

import { assets } from "@/assets/assets";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Code2, Cpu, Globe, Layers, Layout } from "lucide-react";
import Aurora from "./reactbits/Aurora";

const projects = [
  {
    id: 1,
    title: "Darahkita Web",
    description: "We are an innovative digital blood platform designed to accelerate the process of matching donors with patients.",
    image: assets.thumbnailD, 
    liveUrl: "https://darahkita.web.id/",
    techIcons: [Cpu, Globe, Layers, Layout],
  },
  {
    id: 2,
    title: "SowanQR - Digital Guest Book",
    description: "SowanQR is a modern visitor management web application designed to efficiently digitize the check-in process for institutions or schools.",
    image: assets.thumbnailS, 
    liveUrl: "https://sowanqr.vercel.app/",
    techIcons: [Code2, Globe, Layout],
  },
];

const Work = () => {
  return (
    <section id="work" className="w-full bg-white text-black py-20 px-[5%] sm:px-[10%] min-h-screen flex flex-col items-center justify-center relative overflow-hidden">


      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }} className="text-center mb-16 z-10">
        <h2 className="text-3xl sm:text-5xl font-bold font-Ovo tracking-tight">
          A small selection of{" "}
          <span className="text-sky-600 bg-gradient-to-r from-sky-500 to-slate-900 bg-clip-text text-transparent">
            recent projects
          </span>
        </h2>
      </motion.div>

      {/* Grid Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full z-10">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-5 flex flex-col justify-between hover:border-sky-400/50 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-full h-56 sm:h-64 relative rounded-2xl overflow-hidden bg-gray-100 mb-5 border border-gray-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-w-7xl) 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Project Info */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 tracking-wide text-gray-800 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-light mb-6 line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="flex items-center -space-x-2">
                {project.techIcons.map((Icon, index) => (
                  <div
                    key={index}
                    className="w-9 h-9 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sky-600 font-medium text-sm sm:text-base hover:text-indigo-600 transition-colors group/link"
              >
                Check Live Site
                <ArrowUpRight className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Work;