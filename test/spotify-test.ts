import { createSpotifyAuthorizationLink } from "~/server/libs/spotify";

const link = createSpotifyAuthorizationLink(
  "https://osus.rainwashed.xyz/callback/",
);
console.log({ link });
