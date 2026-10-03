import { supabase } from "./supabasePublic";

export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Gagal mengambil students:", error);
    return [];
  }

  return data.map((student) => ({
    id: student.slug,

    name: student.name,
    nickname: student.nickname,
    role: student.role,

    image: student.image,
    image2: student.image2,
    image3: student.image3,

    birthdate: student.birthdate,
    favoriteFood: student.favorite_food,

    spotifyTrackId: student.spotify_track_id,
    spotifyTrackId2: student.spotify_track_id_2,
    spotifyTrackId3: student.spotify_track_id_3,

    instagram: student.instagram,
    twitterX: student.twitter_x,
    tiktok: student.tiktok,

    about: student.about,
    quote: student.quote,
  }));
}


export async function getStudentBySlug(slug) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Gagal mengambil student:", error);
    return null;
  }

  return {
    id: data.slug,

    name: data.name,
    nickname: data.nickname,
    role: data.role,

    image: data.image,
    image2: data.image2,
    image3: data.image3,

    birthdate: data.birthdate,
    favoriteFood: data.favorite_food,

    spotifyTrackId: data.spotify_track_id,
    spotifyTrackId2: data.spotify_track_id_2,
    spotifyTrackId2: data.spotify_track_id_3,

    instagram: data.instagram,
    twitterX: data.twitter_x,
    tiktok: data.tiktok,

    about: data.about,
    quote: data.quote,
  };
}