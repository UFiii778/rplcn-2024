"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { LockIcon, User } from "lucide-react";
import { MdDone } from "react-icons/md";

export default function StudentMessageSection({ student }) {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [senderName, setSenderName] = useState("");
  const [senderIg, setSenderIg] = useState("");
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setLoading(true);

    const payload = {
      recipient_id: student.id, 
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
      setShowSuccessModal(true);
      setMessageText("");
      setSenderName("");
      setSenderIg("");
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto py-8 px-4 text-slate-100 relative">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">
            Send Secret Message to <span className="text-slate-100">{student.name}</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Share your messages, impressions, greetings, or expressions of appreciation—either anonymously or openly.
          </p>
        </div>

        {/* Mode Selector (Anonim vs Your Name) */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setIsAnonymous(true)}
            className={`w-24 sm:w-28 h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg ${
              isAnonymous
                ? "bg-red-600 ring-4 ring-red-400/50"
                : "bg-red-800/60 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs">
              <LockIcon className="w-5 h-5 text-white"/>
            </div>
            <span className="font-bold text-white text-xs sm:text-sm">Anonymous</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAnonymous(false)}
            className={`w-24 sm:w-28 h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg ${
              !isAnonymous
                ? "bg-teal-500 ring-4 ring-teal-300/50"
                : "bg-teal-700/60 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs">
              <User className="w-5 h-5 text-white"/>
            </div>
            <span className="font-bold text-white text-xs sm:text-sm">Your Name</span>
          </button>
        </div>

        {/* Form Box */}
        <form onSubmit={handleSubmit} className="bg-stone-800/80 border border-slate-700/70 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-700/50 px-5 py-2.5 border-b border-slate-700 text-xs font-semibold text-slate-300 flex justify-between items-center">
            <span>Write your message.</span>
            <span className="text-[10px] text-slate-300 bg-slate-500/10 px-2 py-0.5 rounded border border-slate-300/20">
              To: {student.name}
            </span>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4 items-stretch">
            <AnimatePresence initial={false}>
              {!isAnonymous && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: -20 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col gap-2.5 min-w-[150px] sm:min-w-[180px] overflow-hidden"
                >
                  <input
                    type="text"
                    required={!isAnonymous}
                    placeholder="Your Name *"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-white border border-stone-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 text-stone-600 placeholder-stone-500"
                  />
                  <input
                    type="text"
                    placeholder="Your Instagram"
                    value={senderIg}
                    onChange={(e) => setSenderIg(e.target.value)}
                    className="w-full bg-white border border-stone-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 text-stone-600 placeholder-stone-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Textarea Pesan */}
            <div className="flex-1 min-h-[100px]">
              <textarea
                required
                rows="3"
                placeholder={`Write your message to ${student.name}`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full h-full bg-white border border-stone-700 rounded-xl p-3 text-xs focus:outline-none focus:border-sky-500 text-stone-600 placeholder-stone-500 resize-none"
              />
            </div>

            {/* Tombol Kirim */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 bg-slate-100 hover:bg-white text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md disabled:opacity-50"
              >
                {loading ? "Loading" : "Send Your Message!"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl relative overflow-hidden"
            >
              <div className="w-14 h-14 flex items-center justify-center mx-auto text-sky-300 text-2xl">
                <MdDone className="w-15 h-15" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">The message was sent successfully!</h3>
                <p className="text-xs text-slate-400">
                  Your message has been successfully sent specifically for{" "}
                  <span className="font-semibold text-sky-400">{student.name}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2 bg-white hover:bg-stone-400 text-stone-950 font-bold rounded-xl text-xs transition-all"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}