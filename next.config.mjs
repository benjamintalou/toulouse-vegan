const marcheDeNoel = "/marche-de-noel-ethique-et-vegan-de-toulouse-2026";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/marche-de-noel-ethique-et-vegane-de-toulouse-2025",
        destination: marcheDeNoel,
        permanent: true,
      },
      {
        source: "/marche-de-noel-ethique-et-vegane-de-toulouse-2026",
        destination: marcheDeNoel,
        permanent: true,
      },
      {
        source: "/marche-de-noel-ethique-et-vegane-de-toulouse-2026/:path+",
        destination: `${marcheDeNoel}/:path+`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
