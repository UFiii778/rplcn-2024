"use client";

import { assets } from "@/assets/assets";
import React from "react";
import CircularGallery from "./reactbits/CircularGallery";
import { motion } from "motion/react";
import { BsInstagram } from "react-icons/bs";
import ScrollReveal from "./reactbits/ScrollReveal";
import DriftWall from "./reactbits/DriftWall";

// 1. Sesuaikan properti menjadi 'title' & pastikan path image selalu valid
const items = [
    { title: "Me", image: assets.mainMe?.src || assets.mainMe, },
    { title: "Camera Man", image: assets.CameraMan?.src || assets.CameraMan },
    { title: "Rider", image: assets.Rider?.src || assets.Rider },
    { title: "Yellow Vibes", image: assets.meOnyellow?.src || assets.meOnyellow },
    { title: "Neo", image: assets.Neo?.src || assets.Neo },
    { title: "Gemera", image: assets.Gemera?.src || assets.Gemera },
    { title: "Minecraft", image: assets.MineCraft?.src || assets.MineCraft },
    { title: "RPLS", image: assets.Rpls?.src || assets.Rpls },
];

const Gallery = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            id="social" 
            className="w-11/12 max-w-5xl text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-6 py-20"
        >
            <div className="flex flex-wrap items-center justify-center gap-x-2 text-xl md:text-5xl mb-3 font-Ovo font-medium text-black">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="inline-block min-w-[150px] text-3xl sm:text-6xl lg:text-[46px] text-left"
                >
                    Beyond the Code
                </motion.span>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
            >
                When I'm not staring at a code editor, I'm out capturing moments and exploring life. Here’s a glimpse of my world.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-2"
            >
                <a 
                    href="https://www.instagram.com/luthfiiizzz_?igsh=Nm4xdnE1dmg4aHZy" 
                    className="px-10 py-3 border border-white rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2"
                >
                    Connect on Instagram <BsInstagram className="w-4" />
                </a>
            </motion.div>

            {/* Circular Gallery Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }} 
                className="w-full max-w-4xl h-[400px] md:h-[500px] relative flex items-center justify-center mt-4 overflow-hidden"
            >
                <div className="w-full h-full absolute inset-0">
                    <CircularGallery
                        items={items}
                        bend={0}
                        textColor="#000000"
                        borderRadius={0.05}
                        scrollEase={0.05}
                        fontUrl="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap"
                        font="bold 30px Orbitron"
                        scrollSpeed={2}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Gallery;