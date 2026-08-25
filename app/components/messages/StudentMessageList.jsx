"use client";

import React, { useState, useEffect, useRef } from "react";
import { RefreshCcw, Download, X } from "lucide-react";
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
    <section className="w-full max-w-4xl mx-auto py-8 px-4 text-slate-950 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-black">
          <span>Incoming Message for {studentName}</span>
          <span className="text-xs bg-sky-500/10 text-sky-400 px-2.5 py-1 rounded-full border border-sky-500/20">
            {messages.length} Messages
          </span>
        </h3>

        <button
          onClick={fetchStudentMessages}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
        >
          <RefreshCcw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading && (
        <div className="text-center py-10 text-slate-400 text-xs">
          Loading your messages...
        </div>
      )}

      {!loading && messages.length === 0 && (
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 text-center space-y-2">
          <p className="text-slate-200 text-sm font-medium">
            There are no messages for {studentName}.
          </p>
          <p className="text-slate-400 text-xs">
            Be the first to send a message!
          </p>
        </div>
      )}

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
      className="bg-stone-900 border border-slate-800 hover:border-sky-500 transition-all rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-lg cursor-pointer hover:scale-[1.02] group"
    >
      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic line-clamp-4">
        "{data.message}"
      </p>

      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] gap-2">
        <span className="text-slate-400 shrink-0">From:</span>
        <span className="font-semibold text-slate-200 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 truncate max-w-[180px]">
          {senderLabel}
        </span>
      </div>
    </div>
  );
}

function MessagePreviewModal({ data, studentName, onClose }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const nameLabel = data.is_anonymous
    ? "Anonymous"
    : data.sender_name || "Somebody";
  
  const formattedIg = data.sender_ig
    ? `@${data.sender_ig.replace(/^@/, '')}`
    : null;

  const handleSaveToGallery = async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `secret-message-${studentName.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh gambar:", err);
      alert("Gagal mengunduh gambar.");
    } finally {
      setDownloading(false);
    }
  };

  const handleShareWhatsApp = () => {
    const fromText = !data.is_anonymous && formattedIg 
      ? `${nameLabel} (${formattedIg})` 
      : nameLabel;

    const text = `Pesan Rahasia untuk *${studentName}*:\n\n"${data.message}"\n\nDari: ${fromText}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleShareInstagram = async () => {
    const fromText = !data.is_anonymous && formattedIg 
      ? `${nameLabel} (${formattedIg})` 
      : nameLabel;

    const shareText = `Secret Message for ${studentName}: "${data.message}" - From: ${fromText}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Secret Message for ${studentName}`,
          text: shareText,
        });
      } catch (err) {
        console.log("Share dibatalkan:", err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      await handleSaveToGallery();
      alert("Teks pesan telah disalin & gambar diunduh! Silakan tempel di Story Instagram Anda.");
      window.open("https://instagram.com", "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-stone-100 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-100 p-2 rounded-full bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h4 className="text-sm font-semibold text-slate-900 text-center uppercase tracking-wider">
          Message Preview
        </h4>

        <div
          ref={cardRef}
          className="bg-gradient-to-br from-stone-900 via-stone-950 to-slate-900 border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-100 bg-sky-500 px-3 py-1 rounded-full">
              To: {studentName}
            </span>
            <span className="text-[10px] text-slate-500">Message</span>
          </div>

          <p className="text-sm sm:text-base text-slate-100 italic leading-relaxed py-2">
            "{data.message}"
          </p>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">From:</span>
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              <span className="font-semibold text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                {nameLabel}
              </span>
              
              {!data.is_anonymous && formattedIg && (
                <a
                  href={`https://instagram.com/${formattedIg.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-lg border border-pink-500/20 hover:bg-pink-500/20 transition-colors flex items-center gap-1"
                >
                  <FaInstagram className="w-3 h-3" />
                  {formattedIg}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            onClick={handleSaveToGallery}
            disabled={downloading}
            className="flex flex-col items-center justify-center gap-1.5 p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-medium transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{downloading ? "Saving..." : "Save Image"}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex flex-col items-center justify-center gap-1.5 p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-medium transition-colors"
          >
            <FaWhatsapp className="w-4 h-4 text-emerald-500" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleShareInstagram}
            className="flex flex-col items-center justify-center gap-1.5 p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-medium transition-colors"
          >
            <FaInstagram className="w-4 h-4 text-pink-500" />
            <span>Instagram</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}