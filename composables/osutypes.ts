export type OsuProfile = {
    avatar_url: string;
    country_code: string;
    default_group: string;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string;
    pm_friends_only: boolean;
    profile_colour: any;
    username: string;
    cover_url: string;
    discord: string;
    has_supported: boolean;
    interests: string;
    join_date: string;
    location: string;
    max_blocks: number;
    max_friends: number;
    occupation: string;
    playmode: string;
    playstyle: string[];
    post_count: number;
    profile_hue: any;
    profile_order: string[];
    title: any;
    title_url: any;
    twitter: any;
    website: any;
    country: {
        code: string;
        name: string;
    };
    cover: {
        custom_url: any;
        url: string;
        id: string;
    };
    is_restricted: boolean;
    kudosu: {
        available: number;
        total: number;
    };
    account_history: any[];
    active_tournament_banner: any;
    active_tournament_banners: any[];
    badges: any[];
    beatmap_playcounts_count: number;
    comments_count: number;
    current_season_stats: any;
    daily_challenge_user_stats: {
        daily_streak_best: number;
        daily_streak_current: number;
        last_update: string;
        last_weekly_streak: string;
        playcount: number;
        top_10p_placements: number;
        top_50p_placements: number;
        user_id: number;
        weekly_streak_best: number;
        weekly_streak_current: number;
    };
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: any[];
    guest_beatmapset_count: number;
    loved_beatmapset_count: number;
    mapping_follower_count: number;
    monthly_playcounts: {
        start_date: string;
        count: number;
    }[];
    nominated_beatmapset_count: number;
    page: {
        html: string;
        raw: string;
    };
    pending_beatmapset_count: number;
    previous_usernames: any[];
    rank_highest: {
        rank: number;
        updated_at: string;
    };
    ranked_beatmapset_count: number;
    replays_watched_counts: any[];
    scores_best_count: number;
    scores_first_count: number;
    scores_pinned_count: number;
    scores_recent_count: number;
    session_verified: boolean;
    statistics: {
        count_100: number;
        count_300: number;
        count_50: number;
        count_miss: number;
        level: {
            current: number;
            progress: number;
        };
        global_rank: number;
        global_rank_exp: any;
        pp: number;
        pp_exp: number;
        ranked_score: number;
        hit_accuracy: number;
        play_count: number;
        play_time: number;
        total_score: number;
        total_hits: number;
        maximum_combo: number;
        replays_watched_by_others: number;
        is_ranked: boolean;
        grade_counts: {
            ss: number;
            ssh: number;
            s: number;
            sh: number;
            a: number;
        };
        country_rank: number;
        rank: {
            country: number;
        };
    };
    statistics_rulesets: {
        osu: {
            count_100: number;
            count_300: number;
            count_50: number;
            count_miss: number;
            level: {
                current: number;
                progress: number;
            };
            global_rank: number;
            global_rank_exp: any;
            pp: number;
            pp_exp: number;
            ranked_score: number;
            hit_accuracy: number;
            play_count: number;
            play_time: number;
            total_score: number;
            total_hits: number;
            maximum_combo: number;
            replays_watched_by_others: number;
            is_ranked: boolean;
            grade_counts: {
                ss: number;
                ssh: number;
                s: number;
                sh: number;
                a: number;
            };
        };
        taiko: {
            count_100: number;
            count_300: number;
            count_50: number;
            count_miss: number;
            level: {
                current: number;
                progress: number;
            };
            global_rank: number;
            global_rank_exp: any;
            pp: number;
            pp_exp: number;
            ranked_score: number;
            hit_accuracy: number;
            play_count: number;
            play_time: number;
            total_score: number;
            total_hits: number;
            maximum_combo: number;
            replays_watched_by_others: number;
            is_ranked: boolean;
            grade_counts: {
                ss: number;
                ssh: number;
                s: number;
                sh: number;
                a: number;
            };
        };
        fruits: {
            count_100: number;
            count_300: number;
            count_50: number;
            count_miss: number;
            level: {
                current: number;
                progress: number;
            };
            global_rank: any;
            global_rank_exp: any;
            pp: number;
            pp_exp: number;
            ranked_score: number;
            hit_accuracy: number;
            play_count: number;
            play_time: number;
            total_score: number;
            total_hits: number;
            maximum_combo: number;
            replays_watched_by_others: number;
            is_ranked: boolean;
            grade_counts: {
                ss: number;
                ssh: number;
                s: number;
                sh: number;
                a: number;
            };
        };
        mania: {
            count_100: number;
            count_300: number;
            count_50: number;
            count_miss: number;
            level: {
                current: number;
                progress: number;
            };
            global_rank: number;
            global_rank_exp: any;
            pp: number;
            pp_exp: number;
            ranked_score: number;
            hit_accuracy: number;
            play_count: number;
            play_time: number;
            total_score: number;
            total_hits: number;
            maximum_combo: number;
            replays_watched_by_others: number;
            is_ranked: boolean;
            grade_counts: {
                ss: number;
                ssh: number;
                s: number;
                sh: number;
                a: number;
            };
        };
    };
    support_level: number;
    team: any;
    user_achievements: {
        achieved_at: string;
        achievement_id: number;
    }[];
    rank_history: {
        mode: string;
        data: number[];
    };
    rankHistory: {
        mode: string;
        data: number[];
    };
    ranked_and_approved_beatmapset_count: number;
    unranked_beatmapset_count: number;
};

/*
export type OsuBeatmapScores = {
    accuracy: number;
    best_id: number;
    created_at: string;
    id: number;
    max_combo: number;
    mode: string;
    mode_int: number;
    mods: string[];
    passed: boolean;
    perfect: boolean;
    pp: number;
    rank: string;
    replay: boolean;
    score: number;
    statistics: {
        count_100: number;
        count_300: number;
        count_50: number;
        count_geki: any;
        count_katu: any;
        count_miss: number;
    };
    type: string;
    user_id: number;
    current_user_attributes: {
        pin: {
            is_pinned: boolean;
            score_id: number;
        };
    };
    beatmap: {
        beatmapset_id: number;
        difficulty_rating: number;
        id: number;
        mode: string;
        status: string;
        total_length: number;
        user_id: number;
        version: string;
        accuracy: number;
        ar: number;
        bpm: number;
        convert: boolean;
        count_circles: number;
        count_sliders: number;
        count_spinners: number;
        cs: number;
        deleted_at: any;
        drain: number;
        hit_length: number;
        is_scoreable: boolean;
        last_updated: string;
        mode_int: number;
        passcount: number;
        playcount: number;
        ranked: number;
        url: string;
        checksum: string;
    };
    beatmapset: {
        artist: string;
        artist_unicode: string;
        covers: {
            cover: string;
            "cover@2x": string;
            card: string;
            "card@2x": string;
            list: string;
            "list@2x": string;
            slimcover: string;
            "slimcover@2x": string;
        };
        creator: string;
        favourite_count: number;
        genre_id: number;
        hype: any;
        id: number;
        language_id: number;
        nsfw: boolean;
        offset: number;
        play_count: number;
        preview_url: string;
        source: string;
        spotlight: boolean;
        status: string;
        title: string;
        title_unicode: string;
        track_id: any;
        user_id: number;
        video: boolean;
    };
    user: {
        avatar_url: string;
        country_code: string;
        default_group: string;
        id: number;
        is_active: boolean;
        is_bot: boolean;
        is_deleted: boolean;
        is_online: boolean;
        is_supporter: boolean;
        last_visit: string;
        pm_friends_only: boolean;
        profile_colour: any;
        username: string;
    };
    weight: {
        percentage: number;
        pp: number;
    };
};
*/

export type OsuBeatmapScore = {
    accuracy: number;
    best_id: number;
    created_at: string;
    id: number;
    max_combo: number;
    mode: string;
    mode_int: number;
    mods: any[]; // You might want to define a more specific type for mods if their structure is known
    passed: boolean;
    perfect: boolean;
    pp: number;
    rank: string;
    replay: boolean;
    score: number;
    statistics: {
        count_100: number;
        count_300: number;
        count_50: number;
        count_geki: number | null;
        count_katu: number | null;
        count_miss: number;
    };
    type: string;
    user_id: number;
    current_user_attributes: {
        pin: {
            is_pinned: boolean;
            score_id: number;
        };
    };
    beatmap: {
        beatmapset_id: number;
        difficulty_rating: number;
        id: number;
        mode: string;
        status: string;
        total_length: number;
        user_id: number;
        version: string;
        accuracy: number;
        ar: number;
        bpm: number;
        convert: boolean;
        count_circles: number;
        count_sliders: number;
        count_spinners: number;
        cs: number;
        deleted_at: string | null;
        drain: number;
        hit_length: number;
        is_scoreable: boolean;
        last_updated: string;
        mode_int: number;
        passcount: number;
        playcount: number;
        ranked: number;
        url: string;
        checksum: string;
    };
    beatmapset: {
        artist: string;
        artist_unicode: string;
        covers: {
            cover: string;
            "cover@2x": string;
            card: string;
            "card@2x": string;
            list: string;
            "list@2x": string;
            slimcover: string;
            "slimcover@2x": string;
        };
        creator: string;
        favourite_count: number;
        genre_id: number;
        hype: string | null;
        id: number;
        language_id: number;
        nsfw: boolean;
        offset: number;
        play_count: number;
        preview_url: string;
        source: string;
        spotlight: boolean;
        status: string;
        title: string;
        title_unicode: string;
        track_id: number | null;
        user_id: number;
        video: boolean;
    };
    user: {
        avatar_url: string;
        country_code: string;
        default_group: string;
        id: number;
        is_active: boolean;
        is_bot: boolean;
        is_deleted: boolean;
        is_online: boolean;
        is_supporter: boolean;
        last_visit: string;
        pm_friends_only: boolean;
        profile_colour: string | null;
        username: string;
    };
    weight: {
        percentage: number;
        pp: number;
    };
};
