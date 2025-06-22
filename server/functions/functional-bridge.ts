import {
    createSpotifyAuthorizationLink,
    elevateSpotifyAuthorizationCodeToAccessToken,
    returnSpotifyProxyUrl,
} from "../libs/spotify";
import { createOsuAuthorizationLink, elevateOsuAuthorizationCodeToAccessToken } from "../libs/osu";
import { fetchToOsu } from "../libs/osu-passthrough";

export { createSpotifyAuthorizationLink, elevateSpotifyAuthorizationCodeToAccessToken, returnSpotifyProxyUrl };
export { createOsuAuthorizationLink, elevateOsuAuthorizationCodeToAccessToken };
export { fetchToOsu };
