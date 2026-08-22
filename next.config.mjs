/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Pindahkan ke sini (sejajar dengan remotePatterns)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: 'https',
        hostname: 'pfsydgnopvwccxohryvn.supabase.co',
      },
    ],
  },
};

export default nextConfig;