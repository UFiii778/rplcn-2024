import { studentsData, waliKelas } from '@/data/students';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Wajib tambahkan `async` di komponennya
export default async function StudentDetailPage({ params }) {
  // Wajib `await params` untuk Next.js versi baru!
  const { id } = await params; 

  const allMembers = [waliKelas, ...studentsData];
  const currentIndex = allMembers.findIndex((m) => m.id === id);

  // Jika ID tidak cocok dengan data di students.js, Next.js melempar 404
  if (currentIndex === -1) {
    notFound();
  }

  const student = allMembers[currentIndex];
  const prevStudent = allMembers[(currentIndex - 1 + allMembers.length) % allMembers.length];
  const nextStudent = allMembers[(currentIndex + 1) % allMembers.length];

  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col justify-between">
      <Link href="/student" className="text-sm font-medium text-indigo-500 hover:underline mb-6 inline-block">
        ← Kembali ke Semua Murid
      </Link>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold">{student.name}</h1>
        <p className="text-gray-500">{student.role}</p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link href={`/student/${prevStudent.id}`} className="hover:underline">
          ← {prevStudent.name}
        </Link>
        <Link href={`/student/${nextStudent.id}`} className="hover:underline">
          {nextStudent.name} →
        </Link>
      </div>
    </main>
  );
}