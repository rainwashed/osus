<script setup lang="ts">
import store from 'store2';
import type { OsuApiToken, SpotifyApiToken } from '~/lib/authtests';
import { generatePlaylist } from '~/lib/generate';

const onGeneratePlaylistButtonClick = () => {
    console.log("generating");

    const spotifyAccessToken: SpotifyApiToken = store.get("spotifyAuthentication");
    const osuAccessToken: OsuApiToken = store.get("osuAccessToken");

    if (spotifyAccessToken === null || osuAccessToken === null) {
        window.location.replace("/onboarding");
        return;
    }

    generatePlaylist(spotifyAccessToken.access_token, osuAccessToken.access_token);
}

const onLogoutButtonClick = () => {
    console.warn("logging out");
    store.remove("spotifyAuthorization");
    store.remove("osuAuthorization");
    window.location.reload();
    return false;
}
</script>
<template>
    <div class="flex flex-col items-center justify-center w-full h-full">
        <h1 class="text-[5vmin]">
            Hello <span><OsusSpotifyDisplayName /></span> | <span><OsusOsuDisplayName /></span>,
        </h1>
        <h3 class="text-[2vmin]">ready to make a playlist?</h3>
        <div class="flex flex-col mt-4 space-y-2 w-60">
            <Button @click="onGeneratePlaylistButtonClick">Generate Playlist</Button>
            <Button variant="outline">Configure</Button>
            <Button @click="onLogoutButtonClick" variant="destructive" class="mt-4" >Logout</Button>
        </div>
    </div>
</template>
