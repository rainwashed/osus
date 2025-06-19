<script setup lang="ts">
    import store from "store2";

    const spotifyOAuthClick = async () => {
        store.remove("spotifyAuthorization");
        console.log("spotifyOauth clicked");
        const { createSpotifyAuthorizationLink } = useServerFunctions();
        const spotifyLink = await createSpotifyAuthorizationLink();
        store.set("lastProvider", "spotify", true);

        window.open(spotifyLink, "_target");
    };
</script>
<template>
    <Button @click="spotifyOAuthClick">Retrieve Authorization Information for .env (DEVELOPER)</Button>
</template>
