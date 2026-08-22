'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { studentsData, waliKelas } from '@/data/students';
import { Search } from 'lucide-react';

export default function StudentListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedStudents = searchQuery
    ? filteredStudents
    : filteredStudents.slice(0, visibleCount);

  const handleExpand = () => {
    setVisibleCount((prev) => Math.min(prev + 8, studentsData.length));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 px-4 py-12 sm:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">

        <header className="text-center space-y-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-900 text-sky-400 border border-slate-800">
            Class Directory
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-700">
            Meet Our Class
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            31 Students • 1 Teacher • Countless Memories
          </p>
        </header>

        <section className="flex justify-center">
          <Link
            href={`/student/${waliKelas.id}`}
            className="w-full max-w-4xl bg-slate-900 p-[1px] rounded-3xl border border-slate-800 transition-transform hover:scale-[1.01]"
          >
            <div className="bg-slate-900 rounded-[23px] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-slate-700 flex-shrink-0">
                <Image src={waliKelas.image} alt={waliKelas.name} fill className="object-cover" />
              </div>
              <div className="text-center sm:text-left space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest bg-slate-800 text-yellow-300 px-4 py-1.5 rounded-full inline-block">
                  {waliKelas.role}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">{waliKelas.name}</h2>
                <p className="text-sm sm:text-base text-slate-400 italic">"{waliKelas.quote}"</p>
              </div>
            </div>
          </Link>
        </section>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-white">Class Members</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Member"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-white pl-9 pr-4 py-2 rounded-xl text-sm border border-slate-800 focus:outline-none focus:border-yellow-500 placeholder-slate-500"
            />
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {displayedStudents.map((student) => (
            <div
              key={student.id}
              className="relative w-full h-[360px] bg-slate-900 rounded-3xl p-5 flex flex-col justify-between items-center overflow-hidden border border-slate-800 shadow-lg"
            >
              <div className="text-center z-10 space-y-1 mt-1 w-full px-2">
                <h3 className="text-lg font-bold text-white tracking-wide truncate">
                  {student.name}
                </h3>
              </div>

              <div className="absolute inset-0 top-16 bottom-20 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="relative w-full h-full">
                  <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-top opacity-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />
                </div>
              </div>

              <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-2.5 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                    <Image
                      src={student.image}
                      alt={student.name}
                      fill
                      sizes="30px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-semibold text-white truncate max-w-[85px]">
                      @{student.instagram || student.nickname || "student"}
                    </span>
                    <span className="text-[9px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Masih Hidup
                    </span>
                  </div>
                </div>

                <Link
                  href={`/student/${student.id}`}
                  className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold"
                >
                  Look
                </Link>
              </div>
            </div>
          ))}
        </section>

        {!searchQuery && visibleCount < filteredStudents.length && (
          <div className="text-center pt-4">
            <button
              onClick={handleExpand}
              className="px-8 py-3 bg-slate-900 text-slate-200 font-bold text-sm rounded-2xl"
            >
              Show More ({visibleCount} of {filteredStudents.length})
            </button>
          </div>
        )}

        {displayedStudents.length === 0 && (
          <p className="text-center text-slate-500 py-8 text-sm">
            No member found matching "{searchQuery}".
          </p>
        )}
      </div>
    </div>
  );
}