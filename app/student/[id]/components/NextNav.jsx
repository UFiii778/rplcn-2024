"use client";

import React from "react";
import Link from "next/link";

const NextNav = ({ prevStudent, nextStudent }) => {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-6 flex flex-col items-center gap-3">
      {prevStudent && (
        <Link
          href={`/student/${prevStudent.id}`}
          className="w-full max-w-md py-3 px-6 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-center font-semibold rounded-xl transition-all shadow-md"
        >
          ← Murid Sebelumnya: {prevStudent.name}
        </Link>
      )}

      {nextStudent && (
        <Link
          href={`/student/${nextStudent.id}`}
          className="w-full max-w-md py-3 px-6 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-center font-semibold rounded-xl transition-all shadow-md"
        >
          Tombol Ke Murid Selanjutnya: {nextStudent.name} →
        </Link>
      )}
    </section>
  );
};

export default NextNav;