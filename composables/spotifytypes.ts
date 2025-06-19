export interface SpotifySearchResponse {
    tracks?: SpotifyPaging<SpotifyTrack>;
    artists?: SpotifyPaging<SpotifyArtist>;
    albums?: SpotifyPaging<SpotifyAlbum>;
    playlists?: SpotifyPaging<SpotifyPlaylist>;
    shows?: SpotifyPaging<SpotifyShow>;
    episodes?: SpotifyPaging<SpotifyEpisode>;
    audiobooks?: SpotifyPaging<SpotifyAudiobook>;
}

export interface SpotifyPaging<T> {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: T[];
}

export interface SpotifyExternalUrls {
    spotify: string;
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyRestrictions {
    reason: string;
}

export interface SpotifyArtist {
    external_urls: SpotifyExternalUrls;
    followers?: {
        href: string | null;
        total: number;
    };
    genres?: string[];
    href: string;
    id: string;
    images?: SpotifyImage[];
    name: string;
    popularity?: number;
    type: "artist";
    uri: string;
}

export interface SpotifyAlbum {
    album_type: "compilation" | "album" | "single";
    total_tracks: number;
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: SpotifyRestrictions;
    type: "album";
    uri: string;
    artists: SpotifyArtist[];
}

export interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc?: string;
        ean?: string;
        upc?: string;
    };
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from?: Record<string, unknown>;
    restrictions?: SpotifyRestrictions;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
}

export interface SpotifyPlaylistOwner {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    type: "user";
    uri: string;
    display_name?: string;
}

export interface SpotifyPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    owner: SpotifyPlaylistOwner;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: "playlist";
    uri: string;
}

export interface SpotifyCopyright {
    text: string;
    type: string;
}

export interface SpotifyShow {
    available_markets: string[];
    copyrights: SpotifyCopyright[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
}

export interface SpotifyResumePoint {
    fully_played: boolean;
    resume_position_ms: number;
}

export interface SpotifyEpisode {
    audio_preview_url: string | null;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language?: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    resume_point?: SpotifyResumePoint;
    type: "episode";
    uri: string;
    restrictions?: SpotifyRestrictions;
}

export interface SpotifyAudiobookAuthor {
    name: string;
}

export interface SpotifyAudiobookNarrator {
    name: string;
}

export interface SpotifyAudiobook {
    authors: SpotifyAudiobookAuthor[];
    available_markets: string[];
    copyrights: SpotifyCopyright[];
    description: string;
    html_description: string;
    edition?: string;
    explicit: boolean;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    languages: string[];
    media_type: string;
    name: string;
    narrators: SpotifyAudiobookNarrator[];
    publisher: string;
    type: "audiobook";
    uri: string;
    total_chapters: number;
}
