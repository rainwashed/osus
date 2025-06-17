export enum CreationOrder {
    recent,
    oldest,
    best_performance,
    most_played,
}

export enum GameMode {
    catch,
    mania,
    standard,
    taiko,
}

export enum MapType {
    favorite,
    graveyard,
    guest,
    loved,
    nominated,
    pending, // also called unranked
    ranked, // also called ranked_and_approved
}

export enum ScoreGrade {
    SSH, // silver SS
    SH, // silver S
    SS,
    S,
    A,
    B,
    C,
    D,
}

export type OsusConfiguration = {
    creation_order: CreationOrder;
    gamemode: GameMode[];
    maptype: MapType[];
    max_songs: number;
    min_pp_score: number;
    min_completion_accuracy: number;
    min_star_rating: number;
    fc: boolean;
    score_grade: ScoreGrade[];
};

export const DefaultConfiguration: OsusConfiguration = {
    creation_order: CreationOrder.best_performance,
    gamemode: [GameMode.catch, GameMode.mania, GameMode.standard, GameMode.taiko],
    maptype: [
        MapType.favorite,
        MapType.graveyard,
        MapType.guest,
        MapType.loved,
        MapType.nominated,
        MapType.pending,
        MapType.ranked,
    ],
    max_songs: 10_000, // 10,000 is the max amount of songs for a singular spotify playlist
    min_pp_score: 0,
    min_completion_accuracy: 0,
    min_star_rating: 0,
    fc: false,
    score_grade: [
        ScoreGrade.SSH,
        ScoreGrade.SH,
        ScoreGrade.SS,
        ScoreGrade.S,
        ScoreGrade.A,
        ScoreGrade.B,
        ScoreGrade.C,
        ScoreGrade.D,
    ],
};
