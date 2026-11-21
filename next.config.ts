import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "yojqi.com",
      },
      {
        protocol: "https",
        hostname: "chinastayfinder.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      // 1. Drone show legacy URLs to new canonical wisdom article
      {
        source: '/where-to-watch-the-chongqing-drone-show-without-the-crowds',
        destination: '/en/wisdom/chongqing-drone-show-best-viewpoint-without-crowds',
        permanent: true,
      },
      {
        source: '/where-to-watch-the-chongqing-drone-show-without-the-crowds/:path*',
        destination: '/en/wisdom/chongqing-drone-show-best-viewpoint-without-crowds',
        permanent: true,
      },
      {
        source: '/en/where-to-watch-the-chongqing-drone-show-without-the-crowds',
        destination: '/en/wisdom/chongqing-drone-show-best-viewpoint-without-crowds',
        permanent: true,
      },
      {
        source: '/en/where-to-watch-the-chongqing-drone-show-without-the-crowds/:path*',
        destination: '/en/wisdom/chongqing-drone-show-best-viewpoint-without-crowds',
        permanent: true,
      },
      {
        source: '/chongqing-drone-show-best-viewpoint-without-crowds',
        destination: '/en/wisdom/chongqing-drone-show-best-viewpoint-without-crowds',
        permanent: true,
      },

      // 2. Baihong stay legacy landing pages to Retreats booking hub
      {
        source: '/baihong-river-view-stay-en',
        destination: '/en/retreats',
        permanent: true,
      },
      {
        source: '/baihong-river-view-stay-en/:path*',
        destination: '/en/retreats',
        permanent: true,
      },
      {
        source: '/en/baihong-river-view-stay-en',
        destination: '/en/retreats',
        permanent: true,
      },
      {
        source: '/en/baihong-river-view-stay-en/:path*',
        destination: '/en/retreats',
        permanent: true,
      },
      {
        source: '/baihong-river-view-stay-cn',
        destination: '/zh/retreats',
        permanent: true,
      },
      {
        source: '/baihong-river-view-stay-cn/:path*',
        destination: '/zh/retreats',
        permanent: true,
      },
      {
        source: '/zh/baihong-river-view-stay-cn',
        destination: '/zh/retreats',
        permanent: true,
      },
      {
        source: '/zh/baihong-river-view-stay-cn/:path*',
        destination: '/zh/retreats',
        permanent: true,
      },

      // 3. Late arrival & airport / taxi guides
      {
        source: '/late-arrival-chongqing-check-in-prep-guide',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/late-arrival-chongqing-check-in-prep-guide/:path*',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/en/late-arrival-chongqing-check-in-prep-guide',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/en/late-arrival-chongqing-check-in-prep-guide/:path*',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/chongqing-taxi-navigation-high-floor-checkin-guide',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/chongqing-taxi-navigation-high-floor-checkin-guide/:path*',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/en/chongqing-taxi-navigation-high-floor-checkin-guide/:path*',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/chongqing-first-night-payment-navigation-calm-checkin',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/chongqing-first-night-payment-navigation-calm-checkin/:path*',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },
      {
        source: '/en/chongqing-first-night-payment-navigation-calm-checkin/:path*',
        destination: '/en/wisdom/late-arrival-chongqing-check-in-prep-guide',
        permanent: true,
      },

      // 4. Where to stay in Chongqing guides
      {
        source: '/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong/:path*',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/en/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/en/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong/:path*',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/where-to-stay-in-chongqing-river-view-quiet-en',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/where-to-stay-in-chongqing-river-view-quiet-en/:path*',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/en/where-to-stay-in-chongqing-river-view-quiet-en/:path*',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/chongqing-guide-en',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/chongqing-guide-en/:path*',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
      {
        source: '/en/chongqing-guide-en/:path*',
        destination: '/en/wisdom/where-to-stay-in-chongqing-first-time-jiefangbei-or-hongyadong',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
