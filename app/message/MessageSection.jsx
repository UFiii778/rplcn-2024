"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studentsData, waliKelas } from "@/data/students";
import { LockIcon, User } from "lucide-react";
import { FaCheckCircle, FaUserSecret, FaInstagram } from "react-icons/fa";

export default function MessageSection() {
  const rawMembers = [waliKelas, ...studentsData];
  const allMembers = Array.from(
    new Map(rawMembers.map((item) => [item.id, item])).values()
  );

  const getRecipientName = (id) => {
    const found = allMembers.find((m) => m.id === id);
    return found ? found.name : id;
  };

  const [isAnonymous, setIsAnonymous] = useState(true);
  const [recipientId, setRecipientId] = useState(allMembers[0]?.id || "");
  const [senderName, setSenderName] = useState("");
  const [senderIg, setSenderIg] = useState("");
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sentToName, setSentToName] = useState("");

  const [honeypot, setHoneypot] = useState("");

  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const result = await res.json();
      if (res.ok && result.data) {
        setMessages(result.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data pesan:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const dummyMessages = [
    { id: 1, recipient_id: "Semua", message: "Hallo Barudak ICB", is_anonymous: true, sender_name: "Anonim" },
    { id: 2, recipient_id: "Semua", message: "Jangan Toxic yaa ketika kirim pesan ke kelas ini", is_anonymous: false, sender_name: "Admin", sender_ig: "unsc-uk" },
  ];

  const displayMessages = messages.length > 0 ? messages : dummyMessages;

  const row1Raw = displayMessages.filter((_, idx) => idx % 2 === 0);
  const row2Raw = displayMessages.filter((_, idx) => idx % 2 !== 0);

  const row1List = row1Raw.length > 0 ? row1Raw : displayMessages;
  const row2List = row2Raw.length > 0 ? row2Raw : displayMessages;

  const row1Messages = [...row1List, ...row1List, ...row1List, ...row1List, ...row1List, ...row1List, ...row1List, ...row1List];
  const row2Messages = [...row2List, ...row2List, ...row2List, ...row2List, ...row2List, ...row2List, ...row2List, ...row2List];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      setMessageText("");
      setSenderName("");
      setSenderIg("");
      return;
    }

    if (!messageText.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_id: recipientId,
          message: messageText,
          is_anonymous: isAnonymous,
          sender_name: isAnonymous ? null : senderName,
          sender_ig: isAnonymous ? null : senderIg,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim pesan.");
      }

      setSentToName(getRecipientName(recipientId));
      setShowSuccessModal(true);

      // Reset Form & Re-fetch
      setMessageText("");
      setSenderName("");
      setSenderIg("");
      fetchMessages();
    } catch (error) {
      alert("Gagal mengirim pesan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 space-y-16 text-stone-900 relative">

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Want to send us a message? Please give it a try.
        </h2>

        <div className="w-screen relative left-1/2 -translate-x-1/2 space-y-4 overflow-hidden py-4">

          <div className="flex overflow-hidden w-full">
            <motion.div
              className="flex gap-4 flex-nowrap pr-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {row1Messages.map((item, idx) => (
                <MessageCard
                  key={`r1-${item.id || idx}-${idx}`}
                  data={item}
                  recipientName={getRecipientName(item.recipient_id)}
                />
              ))}
            </motion.div>
          </div>

          <div className="flex overflow-hidden w-full">
            <motion.div
              className="flex gap-4 flex-nowrap pr-4"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {row2Messages.map((item, idx) => (
                <MessageCard
                  key={`r2-${item.id || idx}-${idx}`}
                  data={item}
                  recipientName={getRecipientName(item.recipient_id)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-200">
            Please fill out this form using either anonymous or identified mode.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Would you like your name to be known or kept confidential?
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="button"
            onClick={() => setIsAnonymous(true)}
            className={`w-28 sm:w-36 h-28 sm:h-36 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg ${isAnonymous
              ? "bg-red-600 ring-4 ring-red-400/50"
              : "bg-red-800/60 opacity-60 hover:opacity-100"
              }`}
          >
            <FaUserSecret className="w-12 h-12 text-white" />
            <span className="font-bold text-white text-sm sm:text-base">Anonymous</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAnonymous(false)}
            className={`w-28 sm:w-36 h-28 sm:h-36 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg ${!isAnonymous
              ? "bg-teal-500 ring-4 ring-teal-300/50"
              : "bg-teal-700/60 opacity-60 hover:opacity-100"
              }`}
          >
            <User className="w-12 h-12 text-white" />
            <span className="font-bold text-white text-sm sm:text-base">Your Name</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-800/80 rounded-2xl overflow-hidden shadow-xl">
          <input
            type="text"
            name="website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="bg-slate-700/50 px-6 py-3 border-b border-slate-700 text-sm font-semibold text-slate-300">
            Please enter your message.
          </div>

          <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-stretch">

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
                    placeholder="Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-slate-200 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 text-black placeholder-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="Your Instagram (e.g. username)"
                    value={senderIg}
                    onChange={(e) => setSenderIg(e.target.value)}
                    className="w-full bg-slate-200 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 text-black placeholder-slate-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 min-h-[120px]">
              <textarea
                required
                rows="4"
                maxLength={500}
                placeholder="Write your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full h-full bg-slate-200 border border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500 text-black placeholder-slate-500 resize-none"
              />
            </div>

            <div className="flex flex-col justify-between gap-3 min-w-[180px]">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-200">For Who?</label>
                <select
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  className="w-full bg-stone-950 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
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
                className="w-full py-2.5 bg-sky-300 hover:bg-white text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md disabled:opacity-50"
              >
                {loading ? "Send..." : "Send"}
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
              className="bg-stone-900 rounded-3xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-sky-400 text-3xl"
              >
                <FaCheckCircle className="w-14 h-14" />
              </motion.div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white">The message has been sent.</h3>
                <p className="text-xs text-slate-400">
                  Your message has been successfully sent specifically for{" "}
                  <span className="font-semibold text-sky-300">{sentToName}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 bg-slate-200 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
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

function MessageCard({ data, recipientName }) {
  const senderLabel = data.is_anonymous
    ? "Anonim"
    : data.sender_name || "Seseorang";

  const formattedIg = data.sender_ig ? data.sender_ig.replace(/^@/, "") : null;

  return (
    <div className="w-60 sm:w-64 h-44 bg-stone-800 rounded-2xl flex flex-col justify-between overflow-hidden shadow-md flex-shrink-0">
      <div className="p-3.5 space-y-1.5 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-black bg-white border px-2 py-0.5 rounded-md truncate max-w-[180px]">
            To: {recipientName}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed italic">
          "{data.message}"
        </p>
      </div>

      <div className="bg-slate-100 py-2 px-3 flex flex-col gap-0.5 text-right text-xs font-medium text-stone-900 border-t border-slate-200">
        <div>
          From: <span className="font-semibold text-black">{senderLabel}</span>
        </div>
        {!data.is_anonymous && formattedIg && (
          <div className="flex items-center justify-end gap-1 text-[11px] text-pink-600 font-medium">
            <FaInstagram className="w-3.5 h-3.5 text-pink-500" />
            <a
              href={`https://instagram.com/${formattedIg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline truncate max-w-[140px]"
            >
              @{formattedIg}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}