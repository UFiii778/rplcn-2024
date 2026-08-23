"use client";

import React, { useState } from "react";
import { BsSpotify } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

const extractTrackId = (input, defaultId) => {
  if (!input) return defaultId;
  
  if (input.includes("/track/")) {
    return input.split("/track/")[1]?.split("?")[0];
  }
  
  return input.split("?")[0];
};

const Music = ({ spotifyTrackId, spotifyTrackId2 }) => {
  const trackId1 = extractTrackId(spotifyTrackId, "3BJe4B8zGnqEdQPMvfVjuS");
  const trackId2 = extractTrackId(spotifyTrackId2, "7Hc6qcJG4NtyZgbNvQyd8U");

  const [activeTrack, setActiveTrack] = useState(1);

  return (
    <section id="music" className="w-full max-w-4xl mx-auto px-6 pt-6 pb-2">
      <div className="rounded-3xl p-4 sm:p-6 flex flex-col items-center">
        <div className="bg-emerald-500 text-slate-100 px-6 py-2 rounded-xl font-black tracking-wider text-sm sm:text-base mb-6 uppercase shadow-lg shadow-emerald-500/20">
          <BsSpotify className="w-12 h-12"/> 
        </div>

        <div className="w-full max-w-xl space-y-4">
          <div className="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-md bg-stone-900">
            {activeTrack === 1 ? (
              <iframe
                src={`https://open.spotify.com/embed/track/${trackId1}?utm_source=generator&theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ) : (
              <div
                onClick={() => setActiveTrack(1)}
                className="h-[80px] px-6 flex items-center justify-between cursor-pointer hover:bg-stone-800 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-300">
                  <BsSpotify className="w-10 h-10 text-green-500"/>
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <FaPlay className="w-3 h-3" /> Play Track 1
                </span>
              </div>
            )}
          </div>

          <div className="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-md bg-stone-900">
            {activeTrack === 2 ? (
              <iframe
                src={`https://open.spotify.com/embed/track/${trackId2}?utm_source=generator&theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ) : (
              <div
                onClick={() => setActiveTrack(2)}
                className="h-[80px] px-6 flex items-center justify-between cursor-pointer hover:bg-stone-800 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-300">
                  <BsSpotify className="w-10 h-10 text-green-500"/>
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <FaPlay className="w-3 h-3" /> Play Track 2
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;