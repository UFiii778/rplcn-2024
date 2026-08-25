"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { DiaTextReveal } from "@/app/components/magicui/ui/DiaTextReveal";
import CountdownTimer from "@/app/gallery/components/CountdownTimer";

const About = () => {
    const targetDate = "2026-11-17T00:00:00";

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900 pt-54 sm:pt-55">
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                id="about" className="w-full px-[12%] py-10 scroll-mt-20 flex flex-col items-center justify-center gap-6">
                    
                <h4 className="text-center mb-2 text-lg font-Ovo">Ups</h4>
                <h2 className="text-center text-5xl font-Ovo">
                    <DiaTextReveal text="Sorry, this page is not yet ready to launch." textColor="#000000" />
                </h2>

                <div className="w-full max-w-2xl mt-6 flex justify-center">
                    <CountdownTimer
                        targetDate={targetDate}
                        title="This page will be ready on"
                        subtitle="Agit mau fokus TKA sama PKL"
                    />
                </div>
            </motion.div>
        </main>
    );
};

export default About;