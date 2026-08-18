"use client";

import React from "react";
import { BsInstagram, BsGithub, BsEnvelope } from "react-icons/bs";

const Contact = ({ student }) => {
  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-6 py-6">
      <div className="w-full min-h-[220px] rounded-3xl p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Contact</h2>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {student?.instagram && (
            <a
              href={`https://instagram.com/${student.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-xl text-sm font-medium transition-all"
            >
              <BsInstagram className="text-pink-500" />
              @{student.instagram}
            </a>
          )}
          <a
            href="mailto:student@example.com"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-xl text-sm font-medium transition-all"
          >
            <BsEnvelope className="text-sky-400" />
            Email Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;