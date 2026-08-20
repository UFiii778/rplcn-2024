"use client";

import React from "react";
import { motion } from "framer-motion";
import DriftWall from "./reactbits/DriftWall";

const Certificates = () => {
    // Foto acak menggunakan Unsplash/Picsum dengan seed/id berbeda
    const items = [
        { title: "Me", image: "https://picsum.photos/id/10/800/600" },
        { title: "Camera Man", image: "https://picsum.photos/id/11/800/600" },
        { title: "Rider", image: "https://picsum.photos/id/12/800/600" },
        { title: "Yellow Vibes", image: "https://picsum.photos/id/13/800/600" },
        { title: "Neo", image: "https://picsum.photos/id/14/800/600" },
        { title: "Gemera", image: "https://picsum.photos/id/15/800/600" },
        { title: "Minecraft", image: "https://picsum.photos/id/16/800/600" },
        { title: "RPLS", image: "https://picsum.photos/id/17/800/600" },
    ];

    return (
        <div id="certificates" className="w-full px-[12%] py-16 scroll-mt-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}>
                <h4 className="text-center mb-2 text-lg font-Ovo">Memory</h4>
                <h2 className="text-center text-5xl font-Ovo">Can we?</h2>
                <p className="text-center text-gray-500 max-w-xl mx-auto mt-4 font-Ovo">
                    Can we be like this forever?
                </p>
            </motion.div>

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