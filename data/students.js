import { assets } from "@/assets/assets"; //[cite: 4]

export const waliKelas = {
  id: "wali-kelas",
  name: "Putri Zahra S.Pd.", //[cite: 4]
  role: "Wali Kelas", //[cite: 4]
  image: assets.Rpls || assets.profile, // Gunakan gambar dari assets
  quote: "Bimbinglah masa depanmu dengan ilmu dan kelakuan yang baik.", //[cite: 4]
  instagram: "putrizahrad" //[cite: 4]
};

export const studentsData = [
  {
    id: "ahsena-teuku", //[cite: 4]
    name: "Ahsena Teuku Al kahf", //[cite: 4]
    nickname: "Ahsena", //[cite: 4]
    role: "Student / Fotografer", //[cite: 4]
    image: assets.profile, // Diubah menggunakan import assets[cite: 3]
    birthdate: "1 Janu", //[cite: 4]
    favoriteFood: "Ramen & Nasi Goreng", //[cite: 4]
    spotifyTrackId: "3BJe4B8zGnqEdQPMvfVjuS", // murni ID tanpa ?si=...[cite: 4]
    instagram: "khfesal_", //[cite: 4]
    about: "Coding & exploring life beyond the editor." //[cite: 4]
  },
  {
    id: "akhtar-raufasha", //[cite: 4]
    name: "Akhtar Raufasha", //[cite: 4]
    nickname: "Akhtar / Gyess", //[cite: 4]
    role: "Student / Developer", //[cite: 4]
    image: assets.profile, //[cite: 3]
    birthdate: "15 Mei", //[cite: 4]
    favoriteFood: "Ramen & Nasi Goreng", //[cite: 4]
    spotifyTrackId: "3BJe4B8zGnqEdQPMvfVjuS", //[cite: 4]
    instagram: "shootasheed", //[cite: 4]
    about: "Coding & exploring life beyond the editor." //[cite: 4]
  },
  {
    id: "luthfi-abdillah", //[cite: 4]
    name: "Luthfi Abdillah", //[cite: 4]
    nickname: "Luthfi", //[cite: 4]
    role: "Student / Developer", //[cite: 4]
    image: assets.profile, //[cite: 3]
    birthdate: "15 Mei", //[cite: 4]
    favoriteFood: "Ramen & Nasi Goreng", //[cite: 4]
    spotifyTrackId: "3BJe4B8zGnqEdQPMvfVjuS", //[cite: 4]
    instagram: "luthfiiizzz_", //[cite: 4]
    about: "Coding & exploring life beyond the editor." //[cite: 4]
  }
  // ... bersihkan item murid lainnya cukup ambil ID "3BJe4B8zGnqEdQPMvfVjuS" saja[cite: 4]
];