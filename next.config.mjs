/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/marche-de-noel-ethique-et-vegane-de-toulouse-2025",
        destination: "/marche-de-noel-ethique-et-vegane-de-toulouse-2026",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
