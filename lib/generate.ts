const OSU_FETCH_CHUNKSIZE = 500;
const SPOTIFY_FETCH_CHUNKSIZE = 5;

const fetchOsuUserId = async (osuToken: string): Promise<string> => {
    const { fetchToOsu } = useServerFunctions();

    const request = (await fetchToOsu(`https://osu.ppy.sh/api/v2/me`, {
        headers: { Authorization: `Bearer ${osuToken}` },
    })) as OsuProfile;

    return `${request.id}`;
};

const removeDuplicateBeatmaps = (scores: OsuBeatmapScore[]): OsuBeatmapScore[] => {
    const seen = new Set<number>();
    return scores.filter((score) => {
        const id = score.beatmap.id;
        if (seen.has(id)) {
            return false;
        }
        seen.add(id);
        return true;
    });
};

const fetchAllOsuSongs = async (osuToken: string, osuId: string, osusConfiguration: OsusConfiguration) => {
    const { fetchToOsu } = useServerFunctions();
    let foundAllSongs = false;
    let i = 0;

    const osuSortType = {
        recent: "recent",
        oldest: "firsts",
        best_performance: "best",
        most_played: "best",
    }[osusConfiguration.creation_order];

    let beatmaps: OsuBeatmapScore[] = [];

    do {
        let params = new URLSearchParams({
            limit: `${Math.min(OSU_FETCH_CHUNKSIZE, osusConfiguration.max_songs)}`,
            offset: `${i}`,
        });
        let req = (await fetchToOsu(
            `https://osu.ppy.sh/api/v2/users/${osuId}/scores/${osuSortType}?${params.toString()}`,
            {
                headers: { Authorization: `Bearer ${osuToken}` },
            },
        )) as OsuBeatmapScore[];
        beatmaps = [...beatmaps, ...req];

        console.log(`fetching page ${i} w/ ${OSU_FETCH_CHUNKSIZE} as chunksize`);
        if (Array.from(req).length === 0) {
            foundAllSongs = true;
        }
        i++;
    } while (!foundAllSongs && i < Math.ceil(osusConfiguration.max_songs / OSU_FETCH_CHUNKSIZE));

    // need to remove duplicates FIX THIS
    // i think i fixed it
    const removedDuplicateBeatmaps = removeDuplicateBeatmaps(beatmaps);

    console.log({ beatmaps });

    return removedDuplicateBeatmaps;
};

const returnArtistSongName = (beatmap: OsuBeatmapScore) => [
    beatmap.beatmapset.artist_unicode,
    beatmap.beatmapset.title_unicode,
];

const searchSpotifyForSong = async (artistSongName: string[]) => {
    const { returnSpotifyProxyUrl } = useServerFunctions();
    const spotifyProxyUrl = await returnSpotifyProxyUrl();
    const params = new URLSearchParams({
        // q: `artist:${artistSongName[0]} track:${artistSongName[1]}`, // this way SUCKS
        q: `${artistSongName.join(" ")}`,
        type: `track`,
        limit: `${SPOTIFY_FETCH_CHUNKSIZE}`,
    });
    const songData = (await $fetch(`${spotifyProxyUrl}/v1/search?${params.toString()}`)) as SpotifySearchResponse;

    return songData?.tracks?.items[0];
};

const searchFromKeywordsList = async (searchKeywords: string[][]) => {
    const songData = [];
    for (let i = 0; i < searchKeywords.length; i++) {
        const curSong = searchKeywords[i];
        try {
            console.log(`attempting to search ${curSong}`);
            let songMeta = await searchSpotifyForSong(curSong);

            if (songMeta === undefined || songMeta === null) {
                console.warn(`could not find ${curSong}, skipping`);
                continue;
            }

            songData.push(songMeta);
        } catch (_e) {
            console.warn(`skipping song ${curSong}`);
        }
    }

    return songData;
};

const createSpotifyPlaylist = async (spotifyToken: string, trackIds: string[], firstSong: string) => {
    // first get userId
    const userIdRequest = (await $fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${spotifyToken}` },
    })) as { id: string };
    const userId = userIdRequest.id;

    const createPlaylistPostRequest = (await $fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        body: {
            name: `${firstSong} and other osus! generated songs`,
            public: true,
            description: `An osus! generated playlist. (${new Date().toLocaleDateString("en-US")})`,
        },
        headers: {
            Authorization: `Bearer ${spotifyToken}`,
        },
    })) as SpotifyPlaylist;

    const playlistId = createPlaylistPostRequest.id;

    let i = 0;
    do {
        const sector = trackIds.slice(i * 100, (i + 1) * 100);
        const convertedToSpotifyUris = sector.map((id) => `spotify:track:${id}`);

        console.log({ sector, convertedToSpotifyUris });

        let req = await $fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "POST",
            body: {
                uris: convertedToSpotifyUris,
            },
            headers: {
                Authorization: `Bearer ${spotifyToken}`,
            },
        });

        i++;
    } while (i < Math.ceil(trackIds.length / 100));

    console.log(`created a new playlist with id ${playlistId}`);

    return playlistId;
};

export const generatePlaylist = async (spotifyToken: string, osuToken: string) => {
    try {
        const notificationBus = useNuxtApp().$bus;
        // retrieve latest configuration
        notificationBus.emit("notify", "retrieving osus! configuration");
        const config = { ...osusConfigurationReactive.osusConfiguration };
        notificationBus.emit("notify", "retrieved osus! configuration");

        notificationBus.emit("notify", "fetching osu! user's id");
        const userId = await fetchOsuUserId(osuToken);
        notificationBus.emit("notify", `retrieved osu! user's id: ${userId}`);

        notificationBus.emit("notify", "fetching osu! songs");
        const songs = await fetchAllOsuSongs(osuToken, userId, config);
        notificationBus.emit("notify", "fetched osu! songs");

        notificationBus.emit("notify", "converting to search terms");
        const searchKeywords = songs.map(returnArtistSongName);
        notificationBus.emit("notify", "converted to search terms");

        notificationBus.emit("notify", "searching for spotify tracks using search terms");
        const songTrackInformation = await searchFromKeywordsList(searchKeywords);
        const spotifyTrackIds = songTrackInformation.map((s) => s.id);
        notificationBus.emit("notify", "found spotify tracks and converted to spotify ids");

        console.log({ songTrackInformation });

        notificationBus.emit("notify", "creating the spotify playlist");
        const playlistId = await createSpotifyPlaylist(spotifyToken, spotifyTrackIds, songTrackInformation[0].name);
        notificationBus.emit("notify", `created the spotify playlist with id: ${playlistId}`)

        console.log({ playlistId });

        isUndergoingProcess.active = false;
    } catch (error) {
        throw error;
    }
};
