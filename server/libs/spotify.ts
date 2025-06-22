const SPOTIFY_CLIENTID: string | undefined = process.env["SPOTIFY_CLIENT_ID"];
const SPOTIFY_CLIENTSECRET: string | undefined = process.env["SPOTIFY_CLIENT_SECRET"];
const SPOTIFY_SCOPE_PERMISSIONS = "playlist-modify-public";
const REDIRECT_URI: string | undefined = process.env["OAUTH_REDIRECTION_LINK"];
const SPOTIFY_PROXY_URL: string | undefined = process.env["SPOTIFY_PROXY_URL"];

if (SPOTIFY_CLIENTID === undefined) throw new Error("SPOTIFY_CLIENT_ID is not set in .env");
if (SPOTIFY_CLIENTSECRET === undefined) throw new Error("SPOTIFY_CLIENT_SECRET is not set in .env");
if (REDIRECT_URI === undefined) throw new Error("OAUTH_REDIRECTION_LINK is not set in .env");
if (SPOTIFY_PROXY_URL === undefined)
    throw new Error("SPOTIFY_PROXY_URL is not set in .env (it cannot end with a trailing slash)");

export const createSpotifyAuthorizationLink = () => {
    const _params = new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENTID,
        scope: SPOTIFY_SCOPE_PERMISSIONS,
        state: Math.floor(Date.now() * Math.random()).toString(),
    });

    return `https://accounts.spotify.com/authorize?${_params.toString()}&redirect_uri=${REDIRECT_URI}`;
};

type SpotifyApiToken = {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
};

export const elevateSpotifyAuthorizationCodeToAccessToken = async (authorizationCode: string) => {
    const _authorizationBuffer = Buffer.from(`${SPOTIFY_CLIENTID}:${SPOTIFY_CLIENTSECRET}`).toString("base64");

    try {
        const params = new URLSearchParams();
        params.append("client_id", SPOTIFY_CLIENTID);
        params.append("grant_type", "authorization_code");
        params.append("code", authorizationCode);
        params.append("redirect_uri", REDIRECT_URI);

        const _request: SpotifyApiToken = await $fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: params,
            headers: {
                Authorization: `Basic ${_authorizationBuffer}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        console.log(_request);

        return _request;
    } catch (error) {
        throw error;
    }
};

export const returnSpotifyProxyUrl = () => SPOTIFY_PROXY_URL;
