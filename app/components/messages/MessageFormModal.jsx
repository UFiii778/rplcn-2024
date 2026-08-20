"use client";

import React, { useState } from "react";
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

    const [honeypot, setHoneypot] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (honeypot) {
            console.warn("Bot detected via honeypot!");
            setMessage("");
            setSenderName("");
            setSenderIg("");
            setSenderClass("");
            if (onSuccess) onSuccess();
            if (onClose) onClose();
            return;
        }

        if (message.trim().length > 500) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipient_id: recipientId,
                    message,
                    is_anonymous: isAnonymous,
                    sender_name: senderName,
                    sender_ig: senderIg,
                    sender_class: senderClass,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Gagal mengirim pesan.");
            }

            setMessage("");
            setSenderName("");
            setSenderIg("");
            setSenderClass("");

            if (onSuccess) onSuccess();
            if (onClose) onClose();
        } catch (err) {
            alert("Gagal mengirim pesan: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative">

                <div className="flex justify-between items-center mb-6">
                    <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="website_url"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                    />

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
                            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                                isAnonymous ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                            }`}
                        >
                             Mode Anonim
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsAnonymous(false)}
                            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                                !isAnonymous ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                            }`}
                        >
                             Tampilkan Nama
                        </button>
                    </div>

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

                    <div>
                        <textarea
                            rows="4"
                            required
                            maxLength={500}
                            placeholder="Tulis pesan rahasia, kesan, atau ucapan di sini... (Maks. 500 karakter)"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm focus:border-indigo-500 focus:outline-none"
                        />
                        <div className="text-right text-[11px] text-slate-500 mt-1">
                            {message.length}/500
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all text-sm disabled:opacity-50"
                    >
                    </button>
                </form>
            </div>
        </div>
    );
}