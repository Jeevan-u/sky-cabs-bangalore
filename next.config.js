/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: [
      "@heroicons/react/24/outline",
      "@heroicons/react/24/solid",
      "framer-motion",
    ],
  },
  modularizeImports: {
    "@heroicons/react/24/outline": {
      transform: "@heroicons/react/24/outline/{{member}}",
    },
    "@heroicons/react/24/solid": {
      transform: "@heroicons/react/24/solid/{{member}}",
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/packages",
        destination: "/#packages",
        permanent: true,
      },
      {
        source: "/listing-flights",
        destination: "/listing-car",
        permanent: true,
      },
      {
        source: "/listing-experiences",
        destination: "/#packages",
        permanent: true,
      },
      {
        source: "/listing-experiences-map",
        destination: "/#packages",
        permanent: true,
      },
      {
        source: "/listing-experiences-detail",
        destination: "/#packages",
        permanent: true,
      },
      {
        source: "/listing-real-estate",
        destination: "/listing-car",
        permanent: true,
      },
      {
        source: "/listing-real-estate-map",
        destination: "/listing-car",
        permanent: true,
      },
      {
        source: "/listing-stay",
        destination: "/listing-car",
        permanent: true,
      },
      {
        source: "/listing-stay-map",
        destination: "/listing-car",
        permanent: true,
      },
      {
        source: "/listing-stay-detail",
        destination: "/listing-car",
        permanent: true,
      },
      {
        source: "/add-listing/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/add-listing",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/home-2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home-3",
        destination: "/",
        permanent: true,
      },
      {
        source: "/account-savelists",
        destination: "/account",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
