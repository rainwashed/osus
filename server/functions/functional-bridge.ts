import { createSpotifyAuthorizationLink, elevateSpotifyAuthorizationCodeToAccessToken } from "../libs/spotify";
import { createOsuAuthorizationLink, elevateOsuAuthorizationCodeToAccessToken } from "../libs/osu";
import { fetchToOsu } from "../libs/osu-passthrough";

export { createSpotifyAuthorizationLink, elevateSpotifyAuthorizationCodeToAccessToken };
export { createOsuAuthorizationLink, elevateOsuAuthorizationCodeToAccessToken };
export { fetchToOsu }