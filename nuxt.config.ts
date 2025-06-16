import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    css: ["~/assets/css/tailwind.css"],
    shadcn: {
        prefix: "",
        componentDir: "./components/ui",
    },
    vite: {
        plugins: [tailwindcss()],
    },
    modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@hypernym/nuxt-anime", "shadcn-nuxt", "nuxt-server-fn"],
});
