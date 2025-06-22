// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    css: ["~/assets/css/tailwind.css"],
    shadcn: {
        prefix: "",
        componentDir: "./components/ui",
    },
    vite: {
        server: {
            allowedHosts: true,
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        "nuxt-server-fn",
        "@nuxt/eslint",
        "@nuxt/icon",
        "@hypernym/nuxt-anime",
        "shadcn-nuxt",
        "@formkit/auto-animate/nuxt",
        "@nuxt/content",
        '@nuxtjs/color-mode'
    ],
    colorMode: {
        classSuffix: "",
    },
    runtimeConfig: {},
    app: {
        head: {
            title: "osus!",
            htmlAttrs: {
                lang: "en",
            },
            link: [
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "/favicon.ico",
                },
            ],
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                {
                    name: "description",
                    content: "Generate Spotify playlists from osu! beatmaps.",
                },
                {
                    name: "keywords",
                    content: "osus, spotify, osu!",
                },
                { name: "author", content: "rainwashed" }, // Replace with your name/org

                // Open Graph (OG) meta tags for social media sharing
                { property: "og:title", content: "osus!" },
                {
                    property: "og:description",
                    content: "Generate Spotify playlists from osu! beatmaps.",
                },
                { property: "og:image", content: "https://i.ibb.co/mC7rFnw9/osus-icon.png" }, // Replace with your actual OG image URL
                { property: "og:url", content: "https://osus.rainwashed.xyz" }, // Replace with your actual project URL
                { property: "og:type", content: "website" }, // Common type for most websites

                // Twitter Card meta tags
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "osus!" },
                {
                    name: "twitter:description",
                    content: "Generate Spotify playlists from osu! beatmaps.",
                },
                { name: "twitter:image", content: "https://i.ibb.co/mC7rFnw9/osus-icon.png" }, // Replace with your actual Twitter image URL
            ],
        },
    },
    nitro: {
        preset: "node-server",
        // externals: {
        //     inline: ["ofetch"]
        // }
    },
    build: {
        transpile: ["nuxt-server-fn"],
    },
});
