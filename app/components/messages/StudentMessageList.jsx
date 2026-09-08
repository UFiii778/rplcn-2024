"use client";

import React, { useState, useEffect, useRef } from "react";
import { RefreshCcw, Download, X, Sparkles, Share2, MessageCircleHeart } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";

export default function StudentMessageList({ studentId, studentName }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchStudentMessages = async () => {
    if (!studentId) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/messages?recipient_id=${studentId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setMessages(result.data);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error("Gagal mengambil pesan siswa:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentMessages();
  }, [studentId]);

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4 text-slate-100 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <h3 className="text-lg sm:text-xl font-extrabold flex items-center gap-2 text-slate-900">
          <span>Incoming Messages</span>
          <span className="text-xs bg-sky-500/10 text-sky-500 font-bold px-3 py-1 rounded-full border border-sky-500/20 shadow-sm">
            {messages.length} Messages
          </span>
        </h3>

        <button
          onClick={fetchStudentMessages}
          className="bg-stone-900 hover:bg-stone-800 text-stone-300 p-2.5 rounded-xl border border-stone-800 transition-all shadow-md active:scale-95"
          title="Refresh Messages"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-stone-400 text-xs font-medium animate-pulse">
          Set Your Message..
        </div>
      )}

      {/* Empty State */}
      {!loading && messages.length === 0 && (
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-8 text-center space-y-2 backdrop-blur-sm">
          <p className="text-stone-200 text-sm font-semibold">
            There is no message for{studentName}.
          </p>
          <p className="text-stone-400 text-xs">
            Be the first to send a message!
          </p>
        </div>
      )}

      {/* Grid Message Cards */}
      {!loading && messages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {messages.map((item) => (
            <StudentCardItem
              key={item.id}
              data={item}
              onClick={() => setSelectedMessage(item)}
            />
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <MessagePreviewModal
            data={selectedMessage}
            studentName={studentName}
            onClose={() => setSelectedMessage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

{/* Item Kartu Pesan Ala NGL */}
function StudentCardItem({ data, onClick }) {
  let senderLabel = "Anonymous";
  if (!data.is_anonymous) {
    const name = data.sender_name || "Somebody";
    const ig = data.sender_ig ? `@${data.sender_ig.replace(/^@/, '')}` : "";
    senderLabel = ig ? `${name} (${ig})` : name;
  }

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 hover:border-rose-500/50 transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl cursor-pointer hover:-translate-y-1"
    >
      {/* Top Accent Pill */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-200 bg-stone-500/10 px-2.5 py-0.5 rounded-full">
          Message
        </span>
        <Sparkles className="w-3.5 h-3.5 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Text Message */}
      <p className="text-sm font-bold text-white leading-relaxed line-clamp-3 italic">
        "{data.message}"
      </p>

      {/* Footer Info */}
      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
        <span className="text-stone-400 font-medium">From:</span>
        <span className="font-semibold text-stone-200 bg-stone-800/90 px-2.5 py-0.5 rounded-md border border-stone-700/60 truncate max-w-[150px]">
          {senderLabel}
        </span>
      </div>
    </div>
  );
}

{/* Modal Preview & Dynamic Image Generator */}
function MessagePreviewModal({ data, studentName, onClose }) {
  const exportCardRef = useRef(null); // Ref khusus untuk di-generate jadi gambar HD
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const nameLabel = data.is_anonymous
    ? "Anonymous"
    : data.sender_name || "Somebody";

  const formattedIg = data.sender_ig
    ? `@${data.sender_ig.replace(/^@/, '')}`
    : null;

  // Penyesuaian ukuran font otomatis berdasarkan panjang karakter pesan
  const getFontSize = (text = "") => {
    if (text.length > 300) return "text-xs sm:text-sm";
    if (text.length > 150) return "text-sm sm:text-base";
    return "text-base sm:text-lg";
  };

  const fontSizeClass = getFontSize(data.message);

  // Generate PNG dari kartu tersembunyi (exportCardRef) yang berukuran vertikal penuh
  const generatePngFile = async () => {
    if (!exportCardRef.current) return null;
    const dataUrl = await toPng(exportCardRef.current, {
      cacheBust: true,
      pixelRatio: 3, // Kualitas HD
    });
    
    const blob = await (await fetch(dataUrl)).blob();
    return new File([blob], `ngl-${studentName.replace(/\s+/g, "-")}.png`, {
      type: "image/png",
    });
  };

  const handleSaveToGallery = async () => {
    setDownloading(true);
    try {
      const file = await generatePngFile();
      if (!file) return;

      const link = document.createElement("a");
      link.download = file.name;
      link.href = URL.createObjectURL(file);
      link.click();
    } catch (err) {
      console.error("Gagal menyimpan gambar:", err);
      alert("Gagal mengunduh gambar.");
    } finally {
      setDownloading(false);
    }
  };

  const handleShareInstagram = async () => {
    setDownloading(true);
    try {
      const file = await generatePngFile();
      if (!file) return;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Secret Message for ${studentName}`,
          text: `Send me anonymous messages!`,
        });
      } else {
        await handleSaveToGallery();
        alert("Gambar NGL berhasil diunduh! Silakan unggah gambar tersebut ke Instagram Story kamu.");
        window.open("https://instagram.com", "_blank");
      }
    } catch (err) {
      console.log("Share dibatalkan:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handleShareWhatsApp = async () => {
    setDownloading(true);
    try {
      const file = await generatePngFile();
      if (!file) return;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Secret Message for ${studentName}`,
          text: `Pesan rahasia untuk *${studentName}*:\n"${data.message}"`,
        });
      } else {
        const fromText = !data.is_anonymous && formattedIg
          ? `${nameLabel} (${formattedIg})`
          : nameLabel;
        const text = `Pesan Rahasia untuk *${studentName}*:\n\n"${data.message}"\n\nDari: ${fromText}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
      }
    } catch (err) {
      console.log("Error WA Share:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-stone-900 border border-stone-800 rounded-3xl p-5 max-w-sm w-full max-h-[90vh] flex flex-col justify-between shadow-2xl relative z-[110] overflow-hidden"
      >
        {/* Modal Header & Close Button */}
        <div className="flex items-center justify-between pb-2 shrink-0">
          <h4 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest">
            NGL Card Message
          </h4>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-full bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[55vh] my-2 pr-1 space-y-4 rounded-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-700 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-600 to-orange-500 rounded-2xl p-5 text-center space-y-4 shadow-xl">
            {/* Header Bubble */}
            <div className="inline-flex flex-col items-center bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/10 mx-auto">
              <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                View other messages on the RPLCN24 WEB!.
              </span>
              <span className="text-xs font-black">
                @{studentName.toLowerCase().replace(/\s+/g, '')}
              </span>
            </div>

            <p className={`font-black text-white leading-relaxed drop-shadow-md break-words ${fontSizeClass}`}>
              "{data.message}"
            </p>

            <div className="flex justify-center pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-stone-900 bg-white/95 px-3 py-1 rounded-full shadow-sm">
                <MessageCircleHeart className="w-5 h-5 text-rose-500" />
                From: {nameLabel} {formattedIg ? `(${formattedIg})` : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 shrink-0 border-t border-stone-800">
          <button
            onClick={handleSaveToGallery}
            disabled={downloading}
            className="flex flex-col items-center justify-center gap-1 p-2.5 bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 rounded-xl border border-stone-700 text-xs font-bold transition-all shadow-md"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{downloading ? "Saving..." : "Save"}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            disabled={downloading}
            className="flex flex-col items-center justify-center gap-1 p-2.5 bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 rounded-xl border border-stone-700 text-xs font-bold transition-all shadow-md"
          >
            <FaWhatsapp className="w-4 h-4 text-emerald-500" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleShareInstagram}
            disabled={downloading}
            className="flex flex-col items-center justify-center gap-1 p-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-900/30"
          >
            <FaInstagram className="w-4 h-4 text-white" />
            <span>IG Story</span>
          </button>
        </div>
      </motion.div>

      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          ref={exportCardRef}
          className="w-[380px] h-auto min-h-[480px] bg-gradient-to-br from-rose-500 via-pink-600 to-orange-500 rounded-3xl p-8 text-center flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          {/* NGL Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="relative z-10 inline-flex flex-col items-center bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-2xl border border-white/10 mx-auto max-w-[90%] shadow-lg">
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              View other messages on the RPLCN24 WEB!.
            </span>
            <span className="text-sm font-black text-white">
              @{studentName.toLowerCase().replace(/\s+/g, '')}
            </span>
          </div>

          <div className="relative z-10 py-4 px-2 my-auto">
            <p className={`font-black text-white leading-relaxed drop-shadow-lg break-words ${fontSizeClass}`}>
              "{data.message}"
            </p>
          </div>

          <div className="relative z-10 flex justify-center pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-stone-900 bg-white/95 px-4 py-2 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-rose-500" />
              From: {nameLabel} {formattedIg ? `(${formattedIg})` : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}