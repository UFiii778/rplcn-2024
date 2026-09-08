"use client";

import React from "react";
import { BsInstagram, BsTwitterX, BsTiktok } from "react-icons/bs";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Contact = ({ student }) => {
  // Membersihkan karakter '@' jika ada di data student
  const cleanInstagram = student?.instagram?.replace("@", "");
  const cleanTwitter = student?.twitterX?.replace("@", "");
  const cleanTiktok = student?.tiktok?.replace("@", "");

  if (!cleanInstagram && !cleanTwitter) return null;

  return (
    <section id="contact" className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 tracking-tight">
          Social Media Connect
        </h2>

        {/* Grid Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          
          {cleanInstagram && (
            <a
              href={`https://instagram.com/${cleanInstagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-stone-900 p-5 border border-stone-800 hover:border-pink-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600" />
              
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all" />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-md">
                    <div className="bg-stone-950 p-2 rounded-full text-pink-500">
                      <BsInstagram className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block uppercase tracking-wider">
                      Instagram
                    </span>
                    <p className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                      @{cleanInstagram}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" />
              </div>

              <div className="flex items-center justify-center pt-3 border-t border-stone-800/80 text-xs text-stone-400 relative z-10">
                <span className="font-medium group-hover:text-stone-200 transition-colors">
                  Visit Instagram
                </span>
              </div>
            </a>
          )}

          {cleanTwitter && (
            <a
              href={`https://x.com/${cleanTwitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-stone-900 p-5 border border-stone-800 hover:border-sky-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-400 via-sky-400 to-slate-200" />

              <div className="absolute -top-10 -right-10 w-28 h-28 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-stone-950 border border-stone-800 text-white shadow-md">
                    <BsTwitterX className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">
                        X / Twitter
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                      @{cleanTwitter}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" />
              </div>

              <div className="flex items-center justify-center pt-3 border-t border-stone-800/80 text-xs text-stone-400 relative z-10">
                <span className="font-medium group-hover:text-stone-200 transition-colors">
                  View Posts
                </span>
              </div>
            </a>
          )}

          {cleanTiktok && (
            <a
              href={`https://tiktok.com/@${cleanTiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-stone-900 p-5 border border-stone-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-stone-900 to-rose-500" />

              <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-stone-950 border border-stone-800 text-white shadow-md">
                    <FaTiktok className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block uppercase tracking-wider">
                      TikTok
                    </span>
                    <p className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors truncate max-w-[110px]">
                      @{cleanTiktok}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" />
              </div>

              <div className="flex items-center justify-center pt-3 border-t border-stone-800/80 text-xs text-stone-400 relative z-10">
                <span className="font-medium group-hover:text-stone-200 transition-colors">
                  Watch Videos
                </span>
              </div>
            </a>
          )}

        </div>
      </div>
    </section>
  );
};

export default Contact;