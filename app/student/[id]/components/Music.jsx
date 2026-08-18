"use client";

import React from "react";

const Music = ({ spotifyTrackId }) => {
  const trackId = spotifyTrackId?.split("?")[0] || "3BJe4B8zGnqEdQPMvfVjuS";

  return (
    <section id="music" className="w-full max-w-4xl mx-auto px-6 py-6">
      <div className="rounded-3xl p-6 flex flex-col items-center">
        <div className="bg-emerald-500 text-slate-950 px-6 py-2 rounded-xl font-black tracking-wider text-sm sm:text-base mb-6 uppercase shadow-lg shadow-emerald-500/20">
          LIST MUSIK FAV
        </div>

        <div className="w-full max-w-md space-y-3">
          <div className="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-md">
            <iframe
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-md">
            <iframe
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;