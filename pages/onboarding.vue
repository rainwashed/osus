<script setup lang="ts">
    import store from "store2";
    import { testOsuAuthorization, testSpotifyAuthorization, type OsuApiToken, type SpotifyApiToken } from "~/lib/authtests";

    const spotifyAuthState = ref<boolean>(false);
    const osuAuthState = ref<boolean>(false);
    const privacyConditionState = ref<boolean>(false);


    const spotifyOAuthClick = async () => {
        console.log("spotifyOauth clicked");
        const { createSpotifyAuthorizationLink } = useServerFunctions();
        const spotifyLink = await createSpotifyAuthorizationLink("https://osus.rainwashed.xyz/redirect");
        store.set("lastProvider", "spotify", true);

        window.open(spotifyLink, "_blank");
    };

    const osuOAuthClick = async () => {
        console.log("osuOauth clicked");
        const { createOsuAuthorizationLink } = useServerFunctions();
        const osuLink = await createOsuAuthorizationLink("https://osus.rainwashed.xyz/redirect");
        store.set("lastProvider", "osu", true);

        window.open(osuLink, "_blank");
    };

    const retrieveSpotifyAuthorization = async () => {
        const spotifyAuthorizationStorage: SpotifyApiToken = store.get("spotifyAuthorization");
        if (spotifyAuthorizationStorage === null) {
            spotifyAuthState.value = false;
            return;
        }

        const spotifyAuthStatus = await testSpotifyAuthorization(spotifyAuthorizationStorage);
        spotifyAuthState.value = spotifyAuthStatus;

        if (!spotifyAuthStatus) {
            console.warn("no longer valid spotify authorization, clearing from localStorage");
            store.remove("spotifyAuthorization");
            spotifyAuthState.value = false;
        } else {
            console.log("successfully logged into spotify.");
        }
    };

    const retrieveOsuAuthorization = async () => {
        console.log("checking osu...");
        const osuAuthorizationStorage: OsuApiToken = store.get("osuAuthorization");

        console.log({ osuAuthorizationStorage });
        if (osuAuthorizationStorage === null) {
            osuAuthState.value = false;
            return;
        }

        const osuAuthStatus = await testOsuAuthorization(osuAuthorizationStorage);
        osuAuthState.value = osuAuthStatus;

        if (!osuAuthStatus) {
            console.warn("no longer valid osu authorization, clearing from localStorage");
            store.remove("osuAuthorization");
            osuAuthState.value = false;
        } else {
            console.log("successfully logged into osu.");
        }
    };

    onMounted(() => {
        store.remove("lastProvider");
        retrieveSpotifyAuthorization();
        retrieveOsuAuthorization();
        if (store.get("privacyAuth") !== null) {
            privacyConditionState.value = store.get("privacyAuth");
        }
    });

    const storePrivacyAgreementCheckboxClicked = (e: MouseEvent) => {
        console.log("storePrivacyAgreement clicked");

        const target = e?.target as unknown as HTMLElement;
        const dataSlot = target.getAttribute("data-slot") 
       
        console.log({target, dataSlot})

        if (dataSlot !== "checkbox") return;
        
        store.set("privacyAuth", !privacyConditionState.value, true);
        privacyConditionState.value = !privacyConditionState.value;
    } 
</script>
<template>
    <div class="flex flex-col items-center justify-center h-full">
        <h1 class="text-[5vmin]">Authorize <span class="font-nunito">osus!</span></h1>
        <span class="inline-flex flex-col md:flex-row space-x-2 space-y-2 [&>button]:w-60">
        <Button
            class="shadow-md bg-spotify text-secondary hover:bg-spotify/90"
            @click="spotifyOAuthClick">
            <Icon
                name="i-simple-icons:spotify"
                class="inline text-xl" />
            <span v-if="spotifyAuthState">Authorized</span>
            <span v-else>Authorize for Spotify</span>
        </Button>
        <Button
            class="shadow-md bg-osu text-secondary hover:bg-osu/90"
            @click="osuOAuthClick">
            <Icon
                name="i-simple-icons:osu"
                class="inline text-xl" />
            <span v-if="osuAuthState">Authorized</span>
            <span v-else>Authorize for osu!</span>
        </Button>
        </span>
        <p class="p-1 mb-4 text-xs border text-primary/80 max-w-96 border-primary/20 rounded-md"><span class="font-nunito">osus!</span> will never ask for more permissions than necessary. Always ensure that the scope for any OAuth application is the absolute minimum necessary for its function.</p>
        <span class="inline-flex items-center gap-x-2">
            <Checkbox id="anonymousData" :checked="privacyConditionState" @click="storePrivacyAgreementCheckboxClicked" />
            <label
                for="anonymousData"
                class="text-sm font-medium leading-none text-primary/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Participate in a completely anonymous and freely-viewable repository <a class="text-primary" href="/data">(learn more)</a>. 
            </label>
        </span>
    </div>
</template>
