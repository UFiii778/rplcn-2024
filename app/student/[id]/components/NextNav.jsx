"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const NextNav = ({ prevStudent, nextStudent }) => {
  const router = useRouter();

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-6 flex flex-col items-center gap-3">
      <button
        onClick={() => router.back()}
        className="w-full max-w-md py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {prevStudent && (
        <Link
          href={`/student/${prevStudent.id}`}
          className="w-full max-w-md py-3 px-6 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-center font-semibold rounded-xl transition-all shadow-md"
        >
          {prevStudent.name}
        </Link>
      )}

      {nextStudent && (
        <Link
          href={`/student/${nextStudent.id}`}
          className="w-full max-w-md py-3 px-6 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-center font-semibold rounded-xl transition-all shadow-md"
        >
          {nextStudent.name}
        </Link>
      )}
    </section>
  );
};

export default NextNav;