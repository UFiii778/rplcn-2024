"use client";

import React, { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function StudentMessageList({ studentId, studentName }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data pesan siswa via API Route
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
        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <span>Incoming Message for {studentName}</span>
          <span className="text-xs bg-sky-500/10 text-sky-600 px-2.5 py-1 rounded-full border border-sky-500/20">
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
        <div className="text-center py-10 text-slate-500 text-xs">
          Loading your messages...
        </div>
      )}

      {!loading && messages.length === 0 && (
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 text-center space-y-2">
          <p className="text-slate-400 text-sm font-medium">
            There are no messages for {studentName}.
          </p>
          <p className="text-slate-600 text-xs">
            Be the first to send a message using the form below!
          </p>
        </div>
      )}

      {!loading && messages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {messages.map((item) => (
            <StudentCardItem key={item.id} data={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function StudentCardItem({ data }) {
  const senderLabel = data.is_anonymous
    ? "Anonymous"
    : data.sender_name || (data.sender_ig ? `@${data.sender_ig}` : "Somebody");

  return (
    <div className="bg-stone-900 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-lg">
      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
        "{data.message}"
      </p>

      <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px]">
        <span className="text-white">From:</span>
        <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-700/50">
          {senderLabel}
        </span>
      </div>
    </div>
  );
}