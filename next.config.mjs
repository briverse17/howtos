/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/howtos",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    }
};

export default nextConfig;
