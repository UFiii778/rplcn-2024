"use client";

import React from "react";

const About = ({ student }) => {
  return (
    <section id="about" className="w-full max-w-4xl mx-auto px-6 py-6">
      <div className="w-full min-h-[200px] bg-stone-500/20 border border-stone-400/30 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-lg backdrop-blur-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-700 mb-3">
          Quote From Me
        </h3>
        <p className="text-xl sm:text-2xl font-medium italic text-slate-900 leading-relaxed max-w-2xl">
          "{student?.about || student?.quote || "Sehat Sehat jon"}"
        </p>
      </div>
    </section>
  );
};

export default About;