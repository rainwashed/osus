import * as z from "zod";

export type OsusConfiguration = {
    creation_order: "recent" | "oldest" | "best_performance" | "most_played";
    gamemode: ("catch" | "mania" | "standard" | "taiko")[];
    maptype: ("favorite" | "graveyard" | "guest" | "loved" | "nominated" | "pending" | "ranked")[];
    max_songs: number;
    min_pp_score: number;
    min_completion_accuracy: number;
    min_star_rating: number;
    fc: boolean;
    score_grade: ("ssh" | "sh" | "ss" | "s" | "a" | "b" | "c" | "d")[];
};

export const DefaultOsusConfiguration: OsusConfiguration = {
    creation_order: "best_performance",
    gamemode: ["catch", "mania", "standard", "taiko"],
    maptype: ["favorite", "graveyard", "guest", "loved", "nominated", "pending", "ranked"],
    max_songs: 10_000, // 10,000 is the max amount of songs for a singular spotify playlist
    min_pp_score: 0,
    min_completion_accuracy: 0,
    min_star_rating: 0,
    fc: false,
    score_grade: ["ssh", "sh", "ss", "s", "a", "b", "c", "d"],
};

export const OsusConfigurationSchema = z.object({
    creation_order: z.union([
        z.literal("recent"),
        z.literal("oldest"),
        z.literal("best_performance"),
        z.literal("most_played"),
    ]),
    gamemode: z.array(z.union([z.literal("catch"), z.literal("mania"), z.literal("standard"), z.literal("taiko")])),
    maptype: z.array(
        z.union([
            z.literal("favorite"),
            z.literal("graveyard"),
            z.literal("guest"),
            z.literal("loved"),
            z.literal("nominated"),
            z.literal("pending"),
            z.literal("ranked"),
        ]),
    ),
    max_songs: z.number().int().min(1).max(10_000), // Assuming a minimum of 1 song
    min_pp_score: z.number().min(0),
    min_completion_accuracy: z.number().min(0).max(100), // Assuming accuracy is a percentage from 0 to 100
    min_star_rating: z.number().min(0),
    fc: z.boolean(),
    score_grade: z.array(
        z.union([
            z.literal("ssh"),
            z.literal("sh"),
            z.literal("ss"),
            z.literal("s"),
            z.literal("a"),
            z.literal("b"),
            z.literal("c"),
            z.literal("d"),
        ]),
    ),
});
