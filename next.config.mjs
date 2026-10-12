/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets verification builds write elsewhere (NEXT_DIST_DIR=.next-build) so they
  // never clobber a running `next dev` server, which also uses `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
