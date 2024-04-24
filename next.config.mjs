/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    // redirects '/' to '/home'
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
