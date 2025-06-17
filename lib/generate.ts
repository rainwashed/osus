const OSU_FETCH_CHUNKSIZE = 20;

export const generatePlaylist = async (spotifyAccessToken: string, osuAccessToken: string) => {
    // begin first fetching all osu data
    const { fetchToOsu } = useServerFunctions();

    try {
        const osuRequest = (await fetchToOsu("https://osu.ppy.sh/api/v2/me/osu", {
            headers: {
                Authorization: `Bearer ${osuAccessToken}`,
            },
        })) as OsuProfile;
        const personalId = osuRequest.id;

        console.log({ personalId });

        const recentBeatmaps = (await fetchToOsu(
            `https://osu.ppy.sh/api/v2/users/${personalId}/scores/best?limit=${OSU_FETCH_CHUNKSIZE}`,
            {
                headers: {
                    Authorization: `Bearer ${osuAccessToken}`,
                },
            },
        )) as OsuBeatmapScores[];

        console.log({ recentBeatmaps });
    } catch (error) {
        throw error;
    }
};
