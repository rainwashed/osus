<script setup lang="ts">
import store from "store2"
import { testOsuAuthorization, testSpotifyAuthorization, type OsuApiToken, type SpotifyApiToken } from "~/lib/authtests";

const spotifyAuthState = ref<boolean>(false);
const osuAuthState = ref<boolean>(false);

const spotifyOAuthClick = async () => {
  console.log("spotifyOauth clicked") 
  const {createSpotifyAuthorizationLink} = useServerFunctions();
  const spotifyLink = await createSpotifyAuthorizationLink("https://osus.rainwashed.xyz/redirect");
  store.set("lastProvider", "spotify", true);

  window.open(spotifyLink, "_blank");
}

const osuOAuthClick = async () => {
  console.log("osuOauth clicked");
  const {createOsuAuthorizationLink} = useServerFunctions();
  const osuLink = await createOsuAuthorizationLink("https://osus.rainwashed.xyz/redirect");
  store.set("lastProvider", "osu", true);

  window.open(osuLink, "_blank");
}

const retrieveSpotifyAuthorization = async () => {
  const spotifyAuthorizationStorage: SpotifyApiToken = store.get("spotifyAuthorization");
  if (spotifyAuthorizationStorage === null) {
    spotifyAuthState.value = false;
    return;
  };

  const spotifyAuthStatus = await testSpotifyAuthorization(spotifyAuthorizationStorage);
  spotifyAuthState.value = spotifyAuthStatus;

  if (!spotifyAuthStatus) {
    console.warn("no longer valid spotify authorization, clearing from localStorage");
    store.remove("spotifyAuthorization");
    spotifyAuthState.value = false
  } else {
    console.log("successfully logged into spotify.")
  }
}

const retrieveOsuAuthorization = async () => {
  console.log('checking osu...')
  const osuAuthorizationStorage: OsuApiToken = store.get("osuAuthorization");

  console.log({osuAuthorizationStorage})
  if (osuAuthorizationStorage === null) {
    osuAuthState.value = false;
    return
  };

  const osuAuthStatus = await testOsuAuthorization(osuAuthorizationStorage);
  osuAuthState.value = osuAuthStatus;

  if (!osuAuthStatus) {
    console.warn("no longer valid osu authorization, clearing from localStorage");
    store.remove("osuAuthorization");
    osuAuthState.value = false;
  } else {
    console.log("successfully logged into osu.")
  }
}

onMounted(() => {
  store.remove("lastProvider");
  retrieveSpotifyAuthorization();
  retrieveOsuAuthorization();
});
</script>
<template>
  <div>
    <Button class="bg-spotify" @click="spotifyOAuthClick" ><Icon name="i-simple-icons:spotify" class="inline text-xl" /><span v-if="spotifyAuthState">Authorized</span><span v-else>Authorize for Spotify</span></Button>
    <Button class="bg-osu" @click="osuOAuthClick"><Icon name="i-simple-icons:osu" class="inline text-xl"/><span v-if="osuAuthState">Authorized</span><span v-else>Authorize for osu!</span></Button>
  </div>
</template>
