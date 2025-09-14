/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 旧設定 domains は削除して remotePatterns に統一
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swoukqrviikfqcmvsqni.supabase.co',
        pathname: '/storage/v1/object/public/post-images/**',
      },
    ],
  },
};

export default nextConfig;