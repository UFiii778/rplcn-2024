"use client";

import React from "react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";

const Contact = ({ student }) => {
  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-6 pt-2 pb-8">
      <div className="w-full rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Social</h2>
        
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          {student?.instagram && (
            <a
              href={`https://instagram.com/${student.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-xl text-sm font-medium transition-all"
            >
              <BsInstagram className="text-pink-500 w-5 h-5" />
              @{student.instagram}
            </a>
          )}
          <a
            href={`https://x.com/${student.twitterX}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-xl text-sm font-medium transition-all"
          >
            <BsTwitterX className="text-sky-400 w-5 h-5" />
            {student.twitterX}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;