"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studentsData, waliKelas } from "@/data/students";
import { supabase } from "@/lib/supabaseClient";

export default function MessageSection() {
  const allMembers = [waliKelas, ...studentsData];

  // Helper untuk mencari nama murid berdasarkan ID penerima
  const getRecipientName = (id) => {
    const found = allMembers.find((m) => m.id === id);
    return found ? found.name : id;
  };

  // State Form
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [recipientId, setRecipientId] = useState(allMembers[0]?.id || "");
  const [senderName, setSenderName] = useState("");
  const [senderIg, setSenderIg] = useState("");
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  // State Modal Sukses / Error Notification
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sentToName, setSentToName] = useState("");

  // State Data Pesan dari Supabase
  const [messages, setMessages] = useState([]);

  // Fetch Pesan saat komponen dimuat
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Dummy messages jika database masih kosong (untuk preview layout)
  const dummyMessages = [
    { id: 1, recipient_id: "ahsena-teuku", message: "Semoga sukses terus bro ke depannya!", is_anonymous: true, sender_name: "Anonim" },
    { id: 2, recipient_id: "luthfi-abdillah", message: "Semangat ngoding React-nya, keren banget web ini!", is_anonymous: false, sender_name: "@faris_sulthan" },
    { id: 3, recipient_id: "wali-kelas", message: "Terima kasih sudah jadi wali kelas terbaik kami!", is_anonymous: true, sender_name: "Anonim" },
    { id: 4, recipient_id: "akhtar-raufasha", message: "Proyek kemarin mantap banget bro!", is_anonymous: true, sender_name: "Anonim" },
  ];

  const displayMessages = messages.length > 0 ? messages : dummyMessages;

  // Split data untuk baris atas (ke kanan) & baris bawah (ke kiri)
  const row1Messages = [...displayMessages, ...displayMessages];
  const row2Messages = [...displayMessages, ...displayMessages].reverse();

  // Handle Kirim Pesan
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setLoading(true);

    const payload = {
      recipient_id: recipientId,
      message: messageText,
      is_anonymous: isAnonymous,
      sender_name: isAnonymous ? null : senderName,
      sender_ig: isAnonymous ? null : senderIg,
    };

    const { error } = await supabase.from("messages").insert([payload]);

    setLoading(false);

    if (error) {
      alert("Gagal mengirim pesan: " + error.message);
    } else {
      // Simpan nama penerima untuk ditampilkan di modal sukses
      setSentToName(getRecipientName(recipientId));
      setShowSuccessModal(true);

      // Reset Form
      setMessageText("");
      setSenderName("");
      setSenderIg("");
      fetchMessages(); // Refresh list pesan
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 space-y-16 text-slate-100 relative">
      
      {/* SECTION 1: MARQUEE CARDS (BERGERAK KANAN & KIRI) */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Ingin Mengirim pesan pada Kami? Silakan coba
        </h2>

        <div className="space-y-4 overflow-hidden py-4 relative">
          {/* Overlay fade samping */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Baris 1: Bergerak Ke Kanan (-->) */}
          <div className="flex items-center gap-4">
            <motion.div
              className="flex gap-4 flex-nowrap"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {row1Messages.map((item, idx) => (
                <MessageCard
                  key={`r1-${idx}`}
                  data={item}
                  recipientName={getRecipientName(item.recipient_id)}
                />
              ))}
            </motion.div>
            <div className="hidden sm:block text-2xl font-bold pl-4">→</div>
          </div>

          {/* Baris 2: Bergerak Ke Kiri (<--) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-2xl font-bold pr-4">←</div>
            <motion.div
              className="flex gap-4 flex-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {row2Messages.map((item, idx) => (
                <MessageCard
                  key={`r2-${idx}`}
                  data={item}
                  recipientName={getRecipientName(item.recipient_id)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* SECTION 2: FORM INTERAKTIF */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">
            Jika ingin Pesan Anda muncul di atas? dan bisa tersampaikan pada kami
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Apakah nama anda ingin kenali atau di rahasiakan?
          </p>
        </div>

        {/* MODE SELECTOR (RED vs TEAL BUTTONS) */}
        <div className="flex justify-center gap-6">
          <button
            type="button"
            onClick={() => setIsAnonymous(true)}
            className={`w-28 sm:w-36 h-28 sm:h-36 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg ${
              isAnonymous
                ? "bg-red-600 ring-4 ring-red-400/50"
                : "bg-red-800/60 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white/90 shadow-inner" />
            <span className="font-bold text-white text-sm sm:text-base">Anonim</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAnonymous(false)}
            className={`w-28 sm:w-36 h-28 sm:h-36 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg ${
              !isAnonymous
                ? "bg-teal-500 ring-4 ring-teal-300/50"
                : "bg-teal-700/60 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white/90 shadow-inner" />
            <span className="font-bold text-white text-sm sm:text-base">Your Name</span>
          </button>
        </div>

        {/* FORM BOX */}
        <form onSubmit={handleSubmit} className="bg-slate-800/80 border border-slate-700/70 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-700/50 px-6 py-3 border-b border-slate-700 text-sm font-semibold text-slate-300">
            Silakan Masukan pesan
          </div>

          <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-stretch">
            
            {/* LEFT SIDE: INPUT NAMA & IG (DENGAN ANIMASI FADE) */}
            <AnimatePresence initial={false}>
              {!isAnonymous && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: -20 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col gap-3 min-w-[160px] sm:min-w-[200px] overflow-hidden"
                >
                  <input
                    type="text"
                    required={!isAnonymous}
                    placeholder="Nama"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 text-white placeholder-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="nama ig"
                    value={senderIg}
                    onChange={(e) => setSenderIg(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 text-white placeholder-slate-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* CENTER SIDE: TEXTAREA PESAN */}
            <div className="flex-1 min-h-[120px]">
              <textarea
                required
                rows="4"
                placeholder="Tuliskan pesan kamu di sini..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full h-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 resize-none"
              />
            </div>

            {/* RIGHT SIDE: LIST NAMA MURID & TOMBOL KIRIM */}
            <div className="flex flex-col justify-between gap-3 min-w-[180px]">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Pilih Murid:</label>
                <select
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {allMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-slate-100 hover:bg-white text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md disabled:opacity-50"
              >
                {loading ? "Mengirim..." : "Kirim"}
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* MODAL POPUP ANIMASI BERHASIL KIKIM PESAN */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl relative overflow-hidden"
            >
              {/* Efek Cahaya Background */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Icon Centang Ber-Animasi */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl shadow-inner"
              >
                🚀
              </motion.div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white">Pesan Terkirim!</h3>
                <p className="text-xs text-slate-400">
                  Pesan kamu berhasil dikirimkan khusus untuk{" "}
                  <span className="font-semibold text-emerald-400">{sentToName}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                Oke, Mantap! 👍
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Sub-Komponen Kartu Pesan untuk Marquee
function MessageCard({ data, recipientName }) {
  const senderLabel = data.is_anonymous
    ? "Anonim"
    : data.sender_name || (data.sender_ig ? `@${data.sender_ig}` : "Seseorang");

  return (
    <div className="w-60 sm:w-64 h-40 bg-slate-800/90 border border-slate-700/80 rounded-2xl flex flex-col justify-between overflow-hidden shadow-md flex-shrink-0">
      <div className="p-3.5 space-y-1.5 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md truncate max-w-[180px]">
            To: {recipientName}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed italic">
          "{data.message}"
        </p>
      </div>

      <div className="bg-slate-700/60 border-t border-slate-700/50 py-1.5 px-3 text-right text-xs font-medium text-slate-300">
        From: <span className="font-semibold text-white">{senderLabel}</span>
      </div>
    </div>
  );
}