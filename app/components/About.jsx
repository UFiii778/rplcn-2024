"use client";

import React from "react";
import { DiaTextReveal } from "./magicui/ui/DiaTextReveal";
import CurvedLoop from "./reactbits/CurvedLoop";


const About = () => {
    return (
        <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg font-Ovo">Introduction</h4>

            <div className="flex-wrap items-center justify-center gap-x-2 text-xl md:text-5xl mb-3 font-Ovo font-medium text-black">
                <h2 className="mb-2 max-w-2xl text-5xl font-Ovo">
                    <DiaTextReveal text="We Are Programmer" textColor="#000000" />
                    <span className="px-2 sm:px-3 mb-3 max-w-2xl text-5xl bg-sky-400 text-white overflow-hidden justify-center rounded-lg inline-flex">
                        <DiaTextReveal text="Coding For a Change" textColor="#ffffff" />
                    </span>
                </h2>
                <p className="mb-1 font-Ovo text-[clamp(14px,4vw,32px)]">
                    <DiaTextReveal text="For what change?
                    A change that leads to something far better. Progressive and conservative at the same time, where we evolve while still valuing what has existed before, being selective and maintaining identity and selfhood,
                    becoming what has been and growing together with it. Our visions may differ in the end, but one sentence that can describe our entire mission is what we know as ad astra per aspera. We can share ideas about our different visions while striving together in the same process, at least for the next" textColor="#000000" />
                </p>
                <CurvedLoop
                    marqueeText="RPLCN 2024 ✦ RPLG ✦ From ✦ ICB ✦ Cinta Niaga ✦"
                    speed={2}
                    curveAmount={170}
                    direction="right"
                    interactive
                    className="custom-text-style"
                />
            </div>
        </div>
    );
};

export default About;
