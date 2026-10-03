import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Ambil semua siswa
const { data: students, error: studentsError } =
  await supabase
    .from("students")
    .select("id, slug, name");

if (studentsError) {
  console.error("❌ Gagal mengambil students:");
  console.error(studentsError);
  process.exit(1);
}

console.log(`📦 Ditemukan ${students.length} siswa`);

for (const student of students) {
  // Cek apakah sudah punya token
  const { data: existing } = await supabase
    .from("student_edit_tokens")
    .select("id, token")
    .eq("student_id", student.id)
    .maybeSingle();

  if (existing) {
    console.log(`⏭️ ${student.name} sudah punya token`);
    continue;
  }

  const token = crypto.randomBytes(32).toString("hex");

  const { error } = await supabase
    .from("student_edit_tokens")
    .insert({
      student_id: student.id,
      token,
    });

  if (error) {
    console.error(`❌ Gagal membuat token untuk ${student.name}`);
    console.error(error);
    continue;
  }

  console.log(`✅ ${student.name}`);
}

console.log("");
console.log("================================");
console.log("TOKEN GENERATION SELESAI");
console.log("================================");