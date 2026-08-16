'use client'

import Link from 'next/link';
import Image from 'next/image';
import { studentsData, waliKelas } from '@/data/students';

export default function StudentListPage() {
  return (
    <div className="min-h-screen bg-white text-black px-4 py-12 sm:px-8">
      {/* Background Subtle Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16 space-y-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-blue-400 border border-indigo-500/20">
            Class Directory
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-black via-slate-700 to-indigo-900">
            Meet Our Class
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            31 Students • 1 Teacher • Countless Memories
          </p>
        </header>

        {/* Hero Card: Wali Kelas */}
        <section className="mb-16 flex justify-center">
          <Link
            href={`/student/${waliKelas.id}`}
            className="group relative w-full max-w-2xl bg-gradient-to-b from-indigo-500/10 to-slate-900/80 p-[1px] rounded-3xl transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-[23px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-indigo-500/20 group-hover:border-indigo-500/50 transition-colors">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-indigo-500/30 flex-shrink-0">
                <Image src={waliKelas.image} alt={waliKelas.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
                  {waliKelas.role}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{waliKelas.name}</h2>
                <p className="text-xs sm:text-sm text-slate-400 italic">"{waliKelas.quote}"</p>
              </div>
            </div>
          </Link>
        </section>

        {/* Grid 31 Murid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {studentsData.map((student) => (
            <Link
            key={student.id}
            href={`/student/${student.id}`}
            className="group relative bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-4 flex flex-col items-center text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden mb-3 border border-slate-700/50 group-hover:border-sky-400 transition-colors">
                <Image src={student.image} alt={student.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 group-hover: transition-colors line-clamp-1">
                {student.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">@{student.instagram || student.nickname}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}