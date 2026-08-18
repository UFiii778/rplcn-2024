    "use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Header = ({ student }) => {
  return (
    <header className="w-full relative bg-slate-900 pb-4">
      {/* Banner */}
      <div className="w-full h-24 sm:h-36 bg-gradient-to-r from-stone-800 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 flex items-end gap-4 -mt-14 relative z-10">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-950 overflow-hidden relative shadow-xl bg-red-600 flex-shrink-0">
          <Image
            src={student?.image || assets.profile}
            alt={student?.name || "Foto Profil"}
            fill
            className="object-cover"
          />
        </div>
        <div className="pb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white bg-slate-800/80 px-4 py-1.5 rounded-xl border border-slate-700/60 inline-block">
            {student?.name || "Nama Murid"}
          </h1>
          <p className="text-xs text-slate-400 mt-1 px-1">
            {student?.role || "Student / Developer"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;