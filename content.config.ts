import { defineContentConfig, defineCollection } from "@nuxt/content";
import * as z from "zod";

export default defineContentConfig({
    collections: {
        // content: defineCollection({
        //     type: "page",
        //     source: "**/*.md",
        //     schema: z.object({
        //         date: z.string(),
        //         title: z.string(),
        //         author: z.string(),
        //     })
        // }),
        blog: defineCollection({
            type: "page",
            source: "blog/*.md",
            schema: z.object({
                date: z.string(),
                title: z.string(),
                author: z.string(),
            }),
        }),
    },
});
