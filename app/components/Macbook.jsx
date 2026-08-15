"use client";

import { assets } from "@/assets/assets";
import React from "react";
import { motion } from "motion/react";
import { BsInstagram } from "react-[#ee2a7b]";
import { MacbookScroll } from "./magicui/ui/Macbook-Scroll";

const Gallery = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            id="social" 
            className="w-full text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-6 py-20 overflow-hidden"
        >
            <div className="w-11/12 max-w-5xl mx-auto flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-x-2 text-xl md:text-5xl mb-3 font-Ovo font-medium text-black dark:text-white">
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
                    className="flex flex-col sm:flex-row items-center gap-4 mt-6 z-10"
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

            {/* Section Macbook Screen Scroll */}
            <div className="w-full overflow-hidden bg-transparent">
                <MacbookScroll
                    title={
                        <span className="text-2xl md:text-4xl font-bold">
                            Portofolio &amp; Project DarahKita <br /> Ditampilkan dengan Elegan.
                        </span>
                    }
                    src={assets.mainMe?.src || assets.mainMe} 
                    showGradient={true}
                />
            </div>
        </motion.div>
    );
};

export default Gallery;