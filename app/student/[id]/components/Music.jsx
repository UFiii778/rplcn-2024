"use client";

import React, { useState } from "react";
import { BsSpotify } from "react-icons/bs";
import { Music2 } from "lucide-react";

// Helper ekstraksi Track ID menggunakan Regex
const extractTrackId = (input, defaultId) => {
  if (!input || typeof input !== "string") return defaultId;

  // Regex mencari 22 karakter Alfanumerik khas Spotify ID
  const match = input.match(/track\/([a-zA-Z0-9]{22})/);
  if (match && match[1]) {
    return match[1];
  }

  // Jika user menginputkan ID murni (22 karakter) tanpa URL
  const cleanInput = input.trim().split("?")[0];
  if (cleanInput.length === 22 && /^[a-zA-Z0-9]{22}$/.test(cleanInput)) {
    return cleanInput;
  }

  return defaultId;
};

const Music = ({ spotifyTrackId, spotifyTrackId2, spotifyTrackId3 }) => {
  const trackId1 = extractTrackId(spotifyTrackId, "3BJe4B8zGnqEdQPMvfVjuS");
  const trackId2 = extractTrackId(spotifyTrackId2, "7Hc6qcJG4NtyZgbNvQyd8U");
  const trackId3 = extractTrackId(spotifyTrackId3, "1BxfP1L2VP23KuL2R9Z21M");

  const [activeTrack, setActiveTrack] = useState(1);

  const getCurrentTrackId = () => {
    if (activeTrack === 1) return trackId1;
    if (activeTrack === 2) return trackId2;
    return trackId3;
  };

  const currentTrackId = getCurrentTrackId();

  return (
    <section id="music" className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl shadow-emerald-950/20">
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-[#1ED760]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-[#1ED760]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 text-[#1ED760]">
              <BsSpotify className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Music Player
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                My Favorite Music <Music2 className="w-4 h-4 text-[#1ED760]" />
              </h3>
            </div>
          </div>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex items-center gap-2 mb-5 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTrack(1)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              activeTrack === 1
                ? "bg-[#1ED760] text-black shadow-lg shadow-[#1ED760]/25 scale-105"
                : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/5"
            }`}
          >
            Top 1
          </button>
          <button
            type="button"
            onClick={() => setActiveTrack(2)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              activeTrack === 2
                ? "bg-[#1ED760] text-black shadow-lg shadow-[#1ED760]/25 scale-105"
                : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/5"
            }`}
          >
            Top 2
          </button>
          <button
            type="button"
            onClick={() => setActiveTrack(3)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              activeTrack === 3
                ? "bg-[#1ED760] text-black shadow-lg shadow-[#1ED760]/25 scale-105"
                : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/5"
            }`}
          >
            Top 3
          </button>
        </div>

        {/* SPOTIFY EMBED */}
        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-inner">
          <iframe
            key={currentTrackId}
            src={`https://open.spotify.com/embed/track/${currentTrackId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Music;