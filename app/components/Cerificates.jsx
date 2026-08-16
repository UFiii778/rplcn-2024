"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DriftWall from "./reactbits/DriftWall";
import { X } from "lucide-react";

const Certificates = () => {

    const items = [
        { title: "Me", image: assets.mainMe?.src || assets.mainMe },
        { title: "Camera Man", image: assets.CameraMan?.src || assets.CameraMan },
        { title: "Rider", image: assets.Rider?.src || assets.Rider },
        { title: "Yellow Vibes", image: assets.meOnyellow?.src || assets.meOnyellow },
        { title: "Neo", image: assets.Neo?.src || assets.Neo },
        { title: "Gemera", image: assets.Gemera?.src || assets.Gemera },
        { title: "Minecraft", image: assets.MineCraft?.src || assets.MineCraft },
        { title: "RPLS", image: assets.Rpls?.src || assets.Rpls },
    ];


    return (
        <div id="certificates" className="w-full px-[12%] py-16 scroll-mt-20">
            {/* Heading Section */}

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}>
                <h4 className="text-center mb-2 text-lg font-Ovo">Achievements</h4>
                <h2 className="text-center text-5xl font-Ovo">My Certificates</h2>
                <p className="text-center text-gray-500 max-w-xl mx-auto mt-4 font-Ovo">
                    Professional certifications and training programs I have completed to validate my expertise in software development.
                </p>
            </motion.div>

            {/* DriftWall Section - Perbaikan Wrapper CSS */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full h-[600px] md:h-[700px] relative overflow-hidden mt-30"
            >
                <DriftWall
                    items={items}
                    columns={4}
                    tileWidth={180}
                    tileHeight={120}
                    gap={16}
                    tilt={12}
                    turn={-10}
                    perspective={1000}
                    depth={100}
                    speed={35}
                    direction="up"
                    variance={0.4}
                    parallax={0.5}
                    lift={40}
                    fade={0.5}
                    dim={0.7}
                    overlayColor="#000000"
                    radius={12}
                    roll={0}
                    pauseOnHover={true}
                    grayscale={false}
                />
            </motion.div>
        </div>
    );
};

export default Certificates;