<script setup lang="ts">
    import store from "store2";
    import type { OsuApiToken, SpotifyApiToken } from "~/lib/authtests";
    import { generatePlaylist } from "~/lib/generate";

    useSeoMeta({
        title: "osus! - Generate",
    });

    const onGeneratePlaylistButtonClick = () => {
        console.log("generating");

        isUndergoingProcess.active = true;

        const spotifyAccessToken: SpotifyApiToken = store.get("spotifyAuthorization");
        const osuAccessToken: OsuApiToken = store.get("osuAuthorization");

        console.log({ spotifyAccessToken, osuAccessToken });

        if (spotifyAccessToken === null || osuAccessToken === null) {
            window.location.replace("/onboarding");
            return;
        }

        generatePlaylist(spotifyAccessToken.access_token, osuAccessToken.access_token);
    };

    const onLogoutButtonClick = () => {
        console.warn("logging out");
        store.remove("spotifyAuthorization");
        store.remove("osuAuthorization");
        store.remove("spotifyExperimentalUsage");
        window.location.reload();
        return false;
    };

    const helloRef = useTemplateRef("helloSpan");
</script>
<template>
    <div
        class="flex flex-col items-center justify-center w-full h-full"
        v-auto-animate>
        <h1
            class="text-[5vmin]"
            ref="helloSpan">
            Hello
            <span><OsusSpotifyDisplayName /></span>
            |
            <span><OsusOsuDisplayName /></span>
            ,
        </h1>
        <h3 class="text-[2vmin]">ready to make a playlist?</h3>
        <div class="flex flex-col mt-4 space-y-2 w-80">
            <Button
                @click="onGeneratePlaylistButtonClick"
                :disabled="isUndergoingProcess.active"
                class="w-full">
                <span v-if="!isUndergoingProcess.active">Generate Playlist</span>
                <span
                    class="flex justify-center items-center space-x-2"
                    v-else>
                    <Icon
                        name="i-line-md-loading-loop"
                        class="text-xl" />
                    <span>Generating...</span>
                </span>
            </Button>
            <Popover>
                <PopoverTrigger>
                    <Button
                        variant="outline"
                        class="w-full">
                        Configure
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[90vw] md:w-[50vw]">
                    <OsusGenerationOptionsPopup />
                </PopoverContent>
            </Popover>
            <Button
                @click="onLogoutButtonClick"
                variant="destructive"
                class="mt-4">
                Logout
            </Button>
            <span class="text-xs italic text-primary/80">
                * not all songs will be perfectly found from osu! on Spotify
            </span>
        </div>
        <OsusNotificationArea />
        <span class="text-primary/80">
            made with 🩷 from
            <a href="https://lizj.xyz">rainwashed</a>
        </span>
    </div>
</template>
