"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { studentsData, waliKelas } from "@/data/students";
import { assets } from "@/assets/assets";
import MessageFormModal from "@/app/components/messages/MessageFormModal";
import MessageSection from "@/app/message/MessageSection";
import { Search } from "lucide-react";

export default function MessagePage() {
  const allMembers = [waliKelas, ...studentsData];
  
  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

  // State Search & Limit Expand
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const openFormForStudent = (studentId) => {
    setSelectedRecipientId(studentId);
    setIsModalOpen(true);
  };

  // Filter anggota berdasarkan input search
  const filteredMembers = allMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Jika sedang mencari, tampilkan semua hasil pencarian. Jika tidak, batasi sesuai visibleCount
  const displayedMembers = searchQuery
    ? filteredMembers
    : filteredMembers.slice(0, visibleCount);

  const handleExpand = () => {
    setVisibleCount((prev) => Math.min(prev + 5, allMembers.length));
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 py-12 px-6 pt-24 sm:pt-28">
      <Navbar />
      {/* Header Section dengan Jarak Atas */}
      <div className="max-w-6xl mx-auto space-y-8 mt-4">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 to-slate-600 bg-clip-text text-transparent">
            NGL specifically for this class
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Select a member to anonymously send a secret message, an expression of appreciation, or a fun surprise.
          </p>
        </div>
      </div>

      <div className="min-h-screen">
        <MessageSection />
      </div>

      {/* Filter & Search Bar Section */}
      <div className="max-w-6xl mx-auto space-y-6 mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-white">Class Members</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search member name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-800 text-white pl-9 pr-4 py-2 rounded-xl text-sm border border-stone-700 focus:outline-none focus:border-sky-500 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayedMembers.map((member) => (
            <div
              key={member.id}
              className="bg-stone-900 hover:border-sky-500/50 rounded-2xl p-5 flex flex-col items-center text-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-transparent"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-20 h-20 rounded-full overflow-hidden relative mb-3 border-2 border-stone-700 group-hover:border-sky-400 transition-colors">
                  <Image
                    src={member.image || assets.profile}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-bold text-white text-base line-clamp-1">
                  {member.name}
                </h3>
                <span className="text-xs text-slate-400 font-medium mt-0.5">
                  {member.role || "Student"}
                </span>
              </div>

              <div className="w-full mt-5 space-y-2">
                <Link
                  href={`/student/${member.id}`}
                  className="block w-full py-1.5 bg-sky-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-all"
                >
                  Look Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Expand / Show More */}
        {!searchQuery && visibleCount < filteredMembers.length && (
          <div className="text-center pt-4">
            <button
              onClick={handleExpand}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-sky-400 hover:text-sky-300 font-bold text-sm rounded-xl border border-stone-700 transition-all shadow-md"
            >
              Show More ({visibleCount} of {filteredMembers.length})
            </button>
          </div>
        )}

        {displayedMembers.length === 0 && (
          <p className="text-center text-slate-500 py-8 text-sm">
            No member found matching "{searchQuery}".
          </p>
        )}
      </div>

      {isModalOpen && (
        <MessageFormModal
          selectedRecipientId={selectedRecipientId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}