import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This section disables the development UI overlays
  devIndicators: {
    appIsrStatus: false, // Disables the ISR/Static indicator
    buildActivity: false, // Disables the "compiling" bubble
    buildActivityPosition: 'bottom-right',
  },

  outputFileTracingRoot: __dirname,
  
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;