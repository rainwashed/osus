<script setup lang="ts">
import store from "store2";
import type { SpotifyApiToken } from "~/lib/authtests";

const spotifyName = ref<string>();
const spotifyAuth: SpotifyApiToken = store.get("spotifyAuthorization");

type PersonalSpotifyProfile = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    href: string;
    id: string;
    images: {
        url: string;
        height: number;
        width: number;
    }[];
    product: string;
    type: string;
    uri: string;
};

const fetchSpotifyUsername = async () => {
    try {
        let _request: PersonalSpotifyProfile = await $fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${spotifyAuth.access_token}`,
            },
        });
        spotifyName.value = _request.display_name;
    } catch (error) {
        console.warn("spotifyUsernameFetch:", error);
        window.location.replace("/onboarding")
    }
};

onMounted(() => {
    fetchSpotifyUsername();
});
</script>
<template>
    <span>{{ spotifyName }}</span>
</template>
<style lang="scss" scoped>
span {
    background: rgb(26 166 75);
    background: linear-gradient(135deg, rgba(26, 166, 75, 1) 0%, rgba(29, 185, 84, 1) 33%, rgba(51, 192, 101, 1) 66%, rgba(74, 199, 118, 1) 100%);
    text-shadow: rgba(26, 166, 75, 0.4) 0px 0px 20px;
    color: transparent;
    background-clip: text;
}
</style>
