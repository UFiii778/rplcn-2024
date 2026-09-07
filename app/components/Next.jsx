"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

const certificates = [
  {
    id: 1,
    title: "Anonymous Message",
    issuer: "XII RPL",
    description:
      "Send a secret message or share your thoughts with all the students and the class teacher anonymously.",
    image:
      "https://images.unsplash.com/photo-1663813116840-cef0040331fe?q=80&w=1214&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/message",
  },
  {
    id: 2,
    title: "Student Directory",
    issuer: "XII RPL",
    description:
      "View the full profiles of all classmates, including their personal details and social media accounts.",
    image: assets.memo1.src,
    link: "/student",
  },
  {
    id: 3,
    title: "Class Gallery",
    issuer: "XII RPL",
    description:
      "A record of exciting moments, memories, and shared activities during the time in the Class XII RPL.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop",
    link: "/gallery",
  },
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
          Discover our class's various interactive features, ranging from anonymous
          messages and student profiles to a gallery of memories.
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
  const router = useRouter();

  const handleNavigate = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="group flex flex-col justify-between max-w-sm w-full mx-auto p-5 relative min-h-[28rem] rounded-3xl bg-white"
    >
      <div className="flex flex-col gap-4">
        <div className="relative w-full h-48 rounded-2xl overflow-hidden">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider mb-1">
            {cert.issuer}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-Ovo">
            {cert.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 font-Ovo leading-relaxed">
            {cert.description}
          </p>
        </div>
      </div>

      <a
        href={cert.link}
        onClick={(e) => handleNavigate(e, cert.link)}
        className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
      >
        Check
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
};

export default Next;