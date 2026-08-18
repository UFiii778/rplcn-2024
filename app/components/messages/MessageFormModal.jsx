"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { studentsData, waliKelas } from "@/data/students";

export default function MessageFormModal({ selectedRecipientId, onClose, onSuccess }) {
    const allMembers = [waliKelas, ...studentsData];

    const [recipientId, setRecipientId] = useState(selectedRecipientId || allMembers[0].id);
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [message, setMessage] = useState("");
    const [senderName, setSenderName] = useState("");
    const [senderIg, setSenderIg] = useState("");
    const [senderClass, setSenderClass] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            recipient_id: recipientId,
            message,
            is_anonymous: isAnonymous,
            sender_name: isAnonymous ? null : senderName,
            sender_ig: isAnonymous ? null : senderIg,
            sender_class: isAnonymous ? null : senderClass,
        };

        const { error } = await supabase.from("messages").insert([payload]);

        setLoading(false);
        if (error) {
            alert("Gagal mengirim pesan: " + error.message);
        } else {
            alert("Pesan berhasil dikirim!");
            setMessage("");
            if (onSuccess) onSuccess();
            if (onClose) onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Kirim Pesan Rahasia 💌</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Kirim Ke:
                        </label>
                        <select
                            value={recipientId}
                            onChange={(e) => setRecipientId(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                        >
                            {allMembers.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name} ({m.role || "Student"})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                        <button
                            type="button"
                            onClick={() => setIsAnonymous(true)}
                            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${isAnonymous ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            🔒 Mode Anonim
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsAnonymous(false)}
                            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${!isAnonymous ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            👤 Tampilkan Nama
                        </button>
                    </div>

                    {/* Input Nama (Tampil Jika BUKAN Anonim) */}
                    {!isAnonymous && (
                        <div className="space-y-3 pt-2">
                            <input
                                type="text"
                                placeholder="Nama Kamu *"
                                required
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    placeholder="Instagram (opsional)"
                                    value={senderIg}
                                    onChange={(e) => setSenderIg(e.target.value)}
                                    className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Kelas (opsional)"
                                    value={senderClass}
                                    onChange={(e) => setSenderClass(e.target.value)}
                                    className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Input Pesan */}
                    <div>
                        <textarea
                            rows="4"
                            required
                            placeholder="Tulis pesan rahasia, kesan, atau ucapan di sini..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all text-sm"
                    >
                        {loading ? "Mengirim..." : "Kirim Pesan Sekarang 🚀"}
                    </button>
                </form>
            </div>
        </div>
    );
}