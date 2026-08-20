"use client";

import React from "react";
import { Box, Settings, Lock, Sparkles, Search, School, CheckSquare, X, SearchCheck } from "lucide-react";
import { GlowingEffect } from "./magicui/ui/GlowingEffect";
import { PiOfficeChairLight } from "react-icons/pi";

const GridItem = ({ area, icon, title, description, image }) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className="relative h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-white dark:bg-neutral-900 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                    {image && (
                        <div className="absolute inset-0 z-0 opacity-40 hover:opacity-60 transition-opacity duration-300">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        </div>
                    )}

                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-neutral-300 dark:border-neutral-700 p-2 text-black dark:text-white">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                                {title}
                            </h3>
                            <h2 className="font-sans text-sm/[1.125rem] text-neutral-600 md:text-base/[1.375rem] dark:text-neutral-400">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default function BentoSection() {
    return (
        <section className="w-full px-[8%] py-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-black">
                    Featured Capabilities
                </h2>
            </div>

            <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                <GridItem
                    area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                    icon={<CheckSquare className="h-5 w-5" />}
                    title="Hello There!"
                    description="This is the official website for RPLCN 2024, version two."
                />
                <GridItem
                    area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                    icon={<Settings className="h-5 w-5" />}
                    title="What a learn?"
                    description="We learn a lot of things in this class"
                />
                <GridItem
                    area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                    icon={<SearchCheck className="h-5 w-5" />}
                    title="How close are the relationships in this class?"
                    description="Growing every day"
                />
                <GridItem
                    area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                    icon={<School className="h-5 w-5" />}
                    title="We School in"
                    description="We go to SMK ICB Bandung, and it's pretty cool"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShy6VHE-7VigK0UqqMRUQcEJizpLNN-L5IJA&s"
                />
                <GridItem
                    area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                    icon={<X className="h-5 w-5 text-red-500"/>}
                    title="How u Feel"
                    description="I'm late in creating this website."
                />
            </ul>
        </section>
    );
}