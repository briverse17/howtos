/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/howtos",
    assetPrefix: "/howtos/",
    trailingSlash: true,
    images: {
        // unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    }
};

export default nextConfig;
