"use client";

import React from "react";
import { assets } from "@/assets/assets";
import { motion } from "framer-motion";
import DriftWall from "./reactbits/DriftWall";

const Certificates = () => {
    const items = [
        { title: "i dont know", image: assets.memo1.src },
        { title: "what", image: assets.memo.src },
        { title: "hm", image: assets.memo2.src },
        { title: "ow", image: assets.Rpls.src },
        { title: "that's great", image: assets.rplcn24.src },
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