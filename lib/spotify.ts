const SPOTIFY_CLIENTID: string | undefined = process.env["SPOTIFY_CLIENT_ID"];
const SPOTIFY_CLIENTSECRET: string | undefined = process.env["SPOTIFY_CLIENT_SECRET"];
const SPOTIFY_SCOPE_PERMISSIONS = "playlist-modify-public";

if (SPOTIFY_CLIENTID === undefined) throw new Error("SPOTIFY_CLIENT_ID is not set in .env");
if (SPOTIFY_CLIENTSECRET === undefined) throw new Error("SPOTIFY_CLIENT_SECRET is not set in .env");

export const createSpotifyAuthorizationLink = (redirectUri: string) => {
  const _params = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENTID,
    scope: SPOTIFY_SCOPE_PERMISSIONS,
    redirect_uri: redirectUri,
    state: Math.floor(Date.now() * Math.random()).toString(),
  });

  return `https://accounts.spotify.com/authorize?${_params.toString()}`;
};

export type SpotifyApiToken = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export const elevateAuthorizationCodeToAccessToken = async (authorizationCode: string, redirectUri: string) => {
  const _authorizationBuffer = Buffer.from(`${SPOTIFY_CLIENTID}:${SPOTIFY_CLIENTSECRET}`).toString("base64");

  try {
    const _request: SpotifyApiToken = await $fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: {
        code: authorizationCode,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      headers: {
        "Content-Type": "application/xxx-form-urlencoded",
        Authorization: `Basic ${_authorizationBuffer}`,
      },
    });

    return _request;
  } catch (error) {
    throw error;
  }
};
