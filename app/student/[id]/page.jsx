import React from "react";
import { notFound } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import { waliKelas } from "@/data/students";
import { getStudents } from "@/lib/students";

import Header from "./components/Header";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Music from "./components/Music";
import Contact from "./components/Contact";
import NextNav from "./components/NextNav";
import Footer from "./components/Footer";

import StudentMessageSection from "@/app/components/messages/StudentMessageSection";
import StudentMessageList from "@/app/components/messages/StudentMessageList";

export default async function StudentDetailPage({ params }) {
  const { id } = await params;

  // Ambil data siswa dari Supabase
  const students = await getStudents();

  // Untuk sementara wali kelas masih dari students.js
  const allMembers = [waliKelas, ...students];

  const currentIndex = allMembers.findIndex(
    (member) => String(member.id) === String(id)
  );

  if (currentIndex === -1) {
    notFound();
  }

  const student = allMembers[currentIndex];

  const prevStudent =
    allMembers[
      (currentIndex - 1 + allMembers.length) %
        allMembers.length
    ];

  const nextStudent =
    allMembers[
      (currentIndex + 1) %
        allMembers.length
    ];

  return (
    <main className="min-h-screen bg-white text-slate-950 flex flex-col justify-between">
      <div>
        <Navbar />

        <Header student={student} />

        <About student={student} />

        <Gallery student={student} />

        <Music
          spotifyTrackId={student?.spotifyTrackId}
          spotifyTrackId2={student?.spotifyTrackId2}
        />

        <Contact student={student} />

        <StudentMessageList
          studentId={student.id}
          studentName={student.name}
        />

        <StudentMessageSection
          student={student}
        />

        <NextNav
          prevStudent={prevStudent}
          nextStudent={nextStudent}
        />
      </div>

      <Footer />
    </main>
  );
}