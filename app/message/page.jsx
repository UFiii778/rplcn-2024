"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { studentsData, waliKelas } from "@/data/students";
import { assets } from "@/assets/assets";
import MessageFormModal from "@/app/components/messages/MessageFormModal";
import MessageSection from "@/app/message/MessageSection";

export default function MessagePage() {
  const allMembers = [waliKelas, ...studentsData];
  
  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

  const openFormForStudent = (studentId) => {
    setSelectedRecipientId(studentId);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Halaman */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Pesan Anonim Kelas 💌
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Pilih teman kelas atau wali kelas untuk mengirimkan pesan rahasia, apresiasi, atau kesenangan bersama secara anonim.
          </p>
        </div>

        {/* Grid Kartu Murid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 flex flex-col items-center text-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-center w-full">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full border-2 border-indigo-500/30 overflow-hidden relative mb-3 bg-slate-800">
                  <Image
                    src={member.image || assets.profile}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Nama & Role */}
                <h3 className="font-bold text-white text-base line-clamp-1">
                  {member.name}
                </h3>
                <span className="text-xs text-indigo-400 font-medium mt-0.5">
                  {member.role || "Student"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="w-full mt-5 space-y-2">
                <button
                  onClick={() => openFormForStudent(member.id)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
                >
                  Kirim Pesan 💌
                </button>
                <Link
                  href={`/student/${member.id}`}
                  className="block w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-all"
                >
                  Lihat Profil →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-screen bg-slate-950">
        <MessageSection />
      </div>

      {/* Modal Popup Form */}
      {isModalOpen && (
        <MessageFormModal
          selectedRecipientId={selectedRecipientId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}