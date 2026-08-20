"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { studentsData, waliKelas } from "@/data/students";
import { assets } from "@/assets/assets";
import MessageFormModal from "@/app/components/messages/MessageFormModal";
import MessageSection from "@/app/message/MessageSection";
import Footer from "../components/Footer";
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

  const filteredMembers = allMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedMembers = searchQuery
    ? filteredMembers
    : filteredMembers.slice(0, visibleCount);


  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 pt-24 sm:pt-28">
      <Navbar />
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
      <Footer />
    </main>
  );
}