/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "blogger.googleusercontent.com" },
      { protocol: "https", hostname: "fixitwithmikelasvegas.blogspot.com" },
      { protocol: "http",  hostname: "fixitwithmikelasvegas.blogspot.com" },
    ],
  },
};

export default nextConfig;
