import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const SPOTIFY_CLIENTID: string | undefined = process.env["SPOTIFY_CLIENT_ID"];
const SPOTIFY_CLIENTSECRET: string | undefined =
  process.env["SPOTIFY_CLIENT_SECRET"];
const SPOTIFY_SCOPE_PERMISSIONS = "playlist-modify-public";

if (SPOTIFY_CLIENTID === undefined)
  throw new Error("SPOTIFY_CLIENT_ID is not set in .env");
if (SPOTIFY_CLIENTSECRET === undefined)
  throw new Error("SPOTIFY_CLIENT_SECRET is not set in .env");

export const createSpotifyAuthorizationLink = (redirectUri: string) => {
  const _params = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENTID,
    scope: SPOTIFY_SCOPE_PERMISSIONS,
    state: Math.floor(Date.now() * Math.random()).toString(),
  });

  return `https://accounts.spotify.com/authorize?${_params.toString()}&redirect_uri=${redirectUri}`;
};

export type SpotifyApiToken = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export const elevateAuthorizationCodeToAccessToken = async (
  authorizationCode: string,
  redirectUri: string,
) => {
  const _authorizationBuffer = Buffer.from(
    `${SPOTIFY_CLIENTID}:${SPOTIFY_CLIENTSECRET}`,
  ).toString("base64");

  try {
    console.log({ authorizationCode, redirectUri });

    const params = new URLSearchParams();
    params.append("client_id", SPOTIFY_CLIENTID);
    params.append("grant_type", "authorization_code");
    params.append("code", authorizationCode);
    params.append("redirect_uri", redirectUri);

    const requestForm = new URLSearchParams();
    requestForm.set("client_id", SPOTIFY_CLIENTID);
    requestForm.set("code", authorizationCode);
    requestForm.set("redirect_uri", redirectUri);
    requestForm.set("grant_type", "authorization_code");

    const _request: SpotifyApiToken = await $fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        body: params,
        headers: {
          Authorization: `Basic ${_authorizationBuffer}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    console.log(_request);

    return _request;
  } catch (error) {
    throw error;
  }
};
