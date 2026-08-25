"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

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
                ? "fixed inset-0 m-auto z-50 max-w-4xl max-h-[85vh] w-[92vw] md:w-[85vw] flex flex-col justify-between shadow-2xl bg-black/90 rounded-2xl overflow-hidden"
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
                  e.stopPropagation();
                  handleOutsideClick();
                }}
                className="absolute top-4 right-4 z-[80] flex items-center gap-2 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border border-white/20 shadow-lg"
              >
                <IoClose className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            {/* Container Gambar & Teks */}
            {selected?.id === card.id ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black/40 overflow-hidden">
                <ImageComponent card={card} isSelected={true} />
                <SelectedCard selected={selected} />
              </div>
            ) : (
              <ImageComponent card={card} isSelected={false} />
            )}
          </motion.div>
        </div>
      ))}

      {/* Overlay Gelap Latar Belakang */}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-opacity duration-300",
          selected?.id ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />
    </div>
  );
};

const ImageComponent = ({ card, isSelected }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      className={cn(
        "transition duration-300",
        isSelected
          ? "w-full h-full object-contain max-h-[85vh] p-2 sm:p-4" // object-contain agar foto utuh & tidak terpotong
          : "absolute inset-0 h-full w-full object-cover object-center" // grid thumbnail tetap rapi
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-[60] p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-[70] text-white max-w-xl"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};