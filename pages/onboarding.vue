<script setup lang="ts">
import store from "store2"

const spotifyOAuthClick = async () => {
  console.log("spotifyOauth clicked") 
  const {createSpotifyAuthorizationLink} = useServerFunctions();
  const spotifyLink = await createSpotifyAuthorizationLink("https://osus.rainwashed.xyz/redirect");
  store.set("lastProvider", "spotify", true);

  window.open(spotifyLink, "_blank");
}
</script>
<template>
  <div>
    <Button class="bg-spotify" @click="spotifyOAuthClick" ><Icon name="i-simple-icons:spotify" class="inline text-xl" />Authorize for Spotify</Button>
    <Button class="bg-osu"><Icon name="i-simple-icons:osu" class="inline text-xl"/>Authorize for osu!</Button>
  </div>
</template>
