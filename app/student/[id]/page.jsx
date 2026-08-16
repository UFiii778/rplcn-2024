import { studentsData, waliKelas } from '@/data/students'; //[cite: 2]
import { notFound } from 'next/navigation'; //[cite: 2]
import Link from 'next/link'; //[cite: 2]
import Image from 'next/image'; //[cite: 2]

export default async function StudentDetailPage({ params }) {
  const { id } = await params; //[cite: 2]

  const allMembers = [waliKelas, ...studentsData]; //[cite: 2]
  const currentIndex = allMembers.findIndex((m) => m.id === id); //[cite: 2]

  if (currentIndex === -1) {
    notFound(); //[cite: 2]
  }

  const student = allMembers[currentIndex]; //[cite: 2]
  const prevStudent = allMembers[(currentIndex - 1 + allMembers.length) % allMembers.length]; //[cite: 2]
  const nextStudent = allMembers[(currentIndex + 1) % allMembers.length]; //[cite: 2]

  // Bersihkan ID jika ada sisa query params
  const cleanSpotifyId = student.spotifyTrackId?.split('?')[0];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12 max-w-4xl mx-auto flex flex-col justify-between pb-28">
      <div>
        {/* Back Button */}
        <Link 
          href="/student" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-indigo-400 transition-colors bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl mb-8"
        >
          ← Kembali ke Semua Murid
        </Link>

        {/* Profile Card */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Foto Profil dari Assets */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl">
              <Image 
                src={student.image} 
                alt={student.name} 
                fill 
                className="object-cover"
                priority 
              />
            </div>
          </div>

          {/* Bio & Information */}
          <div className="md:col-span-7 space-y-5 text-center md:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                {student.role || 'Student'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black mt-3 text-white">{student.name}</h1>
              <p className="text-slate-400 text-sm italic mt-1">"{student.about}"</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                <span className="block text-[10px] uppercase font-semibold text-slate-500">Tanggal Lahir</span>
                <span className="font-semibold text-slate-200">{student.birthdate || '-'}</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                <span className="block text-[10px] uppercase font-semibold text-slate-500">Makanan Favorit</span>
                <span className="font-semibold text-slate-200">{student.favoriteFood || '-'}</span>
              </div>
            </div>

            {/* Spotify Embed Player */}
            {cleanSpotifyId && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Favorite Track
                </span>
                <div className="rounded-2xl overflow-hidden border border-slate-800">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${cleanSpotifyId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav Slider */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-slate-900/90 border border-slate-700/60 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl flex items-center justify-between">
        <Link
          href={`/student/${prevStudent.id}`}
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <span className="text-lg">←</span>
          <span className="text-xs font-semibold line-clamp-1 max-w-[100px]">{prevStudent.name}</span>
        </Link>

        <span className="text-xs font-bold text-slate-500 px-2">
          {currentIndex + 1} / {allMembers.length}
        </span>

        <Link
          href={`/student/${nextStudent.id}`}
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <span className="text-xs font-semibold line-clamp-1 max-w-[100px]">{nextStudent.name}</span>
          <span className="text-lg">→</span>
        </Link>
      </div>
    </main>
  );
}