import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { studentsData, waliKelas } from "@/data/students";

// IMPORT SEMUA KOMPONEN DIBUTUHKAN (Sesuaikan path folder komponen kamu jika berbeda)
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

  const allMembers = [waliKelas, ...studentsData];

  const currentIndex = allMembers.findIndex((m) => String(m.id) === String(id));

  if (currentIndex === -1) notFound();

  const student = allMembers[currentIndex];
  const prevStudent = allMembers[(currentIndex - 1 + allMembers.length) % allMembers.length];
  const nextStudent = allMembers[(currentIndex + 1) % allMembers.length];

  return (
    <main className="min-h-screen bg-white text-slate-950 flex flex-col justify-between">
      <div>
        <Navbar />
        <Header student={student} />
        <About student={student} />
        <Gallery photos={student?.photos} />
        <Music spotifyTrackId={student?.spotifyTrackId} />
        <Contact student={student} />
        
        <StudentMessageList studentId={student.id} studentName={student.name} />
        <StudentMessageSection student={student} />

        <NextNav prevStudent={prevStudent} nextStudent={nextStudent} />
      </div>
      <Footer />
    </main>
  );
}