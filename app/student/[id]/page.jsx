import { studentsData, waliKelas } from "@/data/students";
import { notFound } from "next/navigation";
import Header from "./components/Header";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Music from "./components/Music";
import Contact from "./components/Contact";
import NextNav from "./components/NextNav";
import Footer from "./components/Footer";

export default async function StudentDetailPage({ params }) {
  const { id } = await params;
  const allMembers = [waliKelas, ...studentsData];
  const currentIndex = allMembers.findIndex((m) => m.id === id);

  if (currentIndex === -1) notFound();

  const student = allMembers[currentIndex];
  const prevStudent = allMembers[(currentIndex - 1 + allMembers.length) % allMembers.length];
  const nextStudent = allMembers[(currentIndex + 1) % allMembers.length];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <Header student={student} />
        <About student={student} />
        <Gallery photos={student?.photos} />
        <Music spotifyTrackId={student?.spotifyTrackId} />
        <Contact student={student} />
        <NextNav prevStudent={prevStudent} nextStudent={nextStudent} />
      </div>
      <Footer />
      </main>
  );
}