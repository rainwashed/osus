/*
this is currently not necessary with the spotify proxy.

const LASTFM_TOKEN = process.env["LASTFM_API_KEY"];
if (LASTFM_TOKEN === undefined) throw new Error("LASTFM_API_KEY should be set in .env");



// this is rn a patch
export default defineEventHandler(async (event) => {
    const queryParams = getQuery(event);

    console.log({ params: queryParams });

    const fetchParams = new URLSearchParams({
        track: `${queryParams?.q}`,
        limit: `${queryParams?.limit}`,
        api_key: LASTFM_TOKEN,
        method: "track.search",
        format: "json",
    });

    try {
        const req = await $fetch(`http://ws.audioscrobbler.com/2.0/?${fetchParams.toString()}`);
        console.log({ req })
    } catch (error) {
        throw error;
    }
});
*/