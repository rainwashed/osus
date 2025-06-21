import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
    preset: 'node-server',
    // Explicitly enable serving static assets from .output/public
    publicAssets: [
        {
            dir: './public', // maps to .output/public after build
            maxAge: 60 * 60 * 24 * 7, // 7 days cache
        },
    ],
    // Optional: fallback to index.html if you're doing SPA-style routing
    // serveStatic: true, // Nitro already serves static when set via `publicAssets`
})
