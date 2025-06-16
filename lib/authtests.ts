export type SpotifyApiToken = {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
};

export type OsuApiToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
};

export const testSpotifyAuthorization = async (spotifyAuthorizationObject: SpotifyApiToken) => {
    try {
        const profileDetails = await $fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${spotifyAuthorizationObject.access_token}`,
            },
        });

        console.log("spotifyProfile:", profileDetails);
        // console.log(`logged in with: ${profileDetails["display_name"]}`)
        return true;
    } catch (error) {
        console.warn(error);
        return false;
    }
};

export const testOsuAuthorization = async (osuAuthorizationObject: OsuApiToken) => {
    const { fetchToOsu } = useServerFunctions();
    try {
        console.log(osuAuthorizationObject);
        const profileDetails = await fetchToOsu("https://osu.ppy.sh/api/v2/me/osu", {
            headers: {
                Authorization: `Bearer ${osuAuthorizationObject.access_token}`,
            },
            mode: "no-cors",
        });

        console.log("osuProfile:", profileDetails);
        return true;
    } catch (error) {
        console.warn(error);
        return false;
    }
};
