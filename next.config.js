/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
      "i.pinimg.com",
      "scontent.frgn11-1.fna.fbcdn.net",
    ],
  },
};

module.exports = nextConfig;
