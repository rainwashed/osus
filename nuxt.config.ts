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
        }
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
    ],
    runtimeConfig: {

    },
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
                    href: "/favicon.ico"
                }
            ]
        }
    },
    nitro: {
        preset: "node-server",
        // externals: {
        //     inline: ["ofetch"]
        // }
    },
    build: {
        transpile: [
            "nuxt-server-fn"
        ]
    }
});
