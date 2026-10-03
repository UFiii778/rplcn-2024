import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import vm from "vm";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Environment variable Supabase belum lengkap.");
  process.exit(1);
}

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);


// ==========================================
// BACA students.js
// ==========================================

const filePath = "./data/students.js";

let source = fs.readFileSync(filePath, "utf8");

// Hapus bagian export agar bisa dievaluasi
source = source
  .replace(/export const waliKelas\s*=/, "const waliKelas =")
  .replace(/export const studentsData\s*=/, "const studentsData =");

// Ambil data dari file
const sandbox = {};

vm.createContext(sandbox);

vm.runInContext(
  `
  ${source}

  result = {
    waliKelas,
    studentsData
  };
  `,
  sandbox
);

const { waliKelas, studentsData } = sandbox.result;

console.log(
  `${studentsData.length} students were found`
);


// ==========================================
// AMBIL CLASS
// ==========================================

const { data: classData, error: classError } =
  await supabase
    .from("classes")
    .select("id, name, slug")
    .eq("slug", "aarplg-2024")
    .single();

if (classError) {
  console.error("❌ Gagal mengambil class:");
  console.error(classError);
  process.exit(1);
}

console.log(
  `Class: ${classData.name}`
);

console.log(
  `Class ID: ${classData.id}`
);


// ==========================================
// UBAH DATA SISWA
// ==========================================

const students = studentsData.map((student) => ({
  class_id: classData.id,

  slug: student.id,

  name: student.name,
  nickname: student.nickname ?? null,

  role: student.role ?? null,

  birthdate: student.birthdate ?? null,
  favorite_food: student.favoriteFood ?? null,

  about: student.about ?? null,
  quote: student.quote ?? null,

  instagram: student.instagram ?? null,
  twitter_x: student.twitterX ?? null,
  tiktok: student.tiktok ?? null,

  spotify_track_id: student.spotifyTrackId ?? null,
  spotify_track_id_2: student.spotifyTrackId2 ?? null,

  image: student.image ?? null,
  image2: student.image2 ?? null,
  image3: student.image3 ?? null,
}));


// ==========================================
// INSERT SISWA
// ==========================================

const { data, error } = await supabase
  .from("students")
  .upsert(students, {
    onConflict: "class_id,slug",
  })
  .select();

if (error) {
  console.error("❌ Gagal memasukkan data:");
  console.error(error);
  process.exit(1);
}

console.log("");
console.log("================================");
console.log("Migration successful! Ready for Reboot");
console.log("================================");
console.log(`number of student records: ${data.length}`);