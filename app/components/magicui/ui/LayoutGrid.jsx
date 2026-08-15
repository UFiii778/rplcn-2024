"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5"; // Menggunakan icon IoClose dari react-icons

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "relative")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden cursor-pointer rounded-xl h-full w-full",
              selected?.id === card.id
                ? "fixed inset-0 m-auto z-50 max-w-3xl max-h-[80vh] w-[90vw] h-[80vh] flex flex-col justify-end shadow-2xl"
                : lastSelected?.id === card.id
                ? "z-40 bg-white"
                : "bg-white"
            )}
            layoutId={`card-${card.id}`}
          >
            {/* Tombol Back / Close ketika gambar terbuka */}
            {selected?.id === card.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Mencegah pemicu event click di parent
                  handleOutsideClick();
                }}
                className="absolute top-4 right-4 z-[80] flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors border border-white/20 shadow-lg"
              >
                <IoClose className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      
      {/* Overlay Gelap Latar Belakang */}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity",
          selected?.id ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />
    </div>
  );
};

const ImageComponent = ({ card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      className="object-cover object-center absolute inset-0 h-full w-full transition duration-300"
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="h-full w-full flex flex-col justify-end rounded-xl relative z-[60] p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-[70] text-white"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};