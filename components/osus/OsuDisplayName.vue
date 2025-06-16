<script setup lang="ts">
import store from "store2";
import type { OsuApiToken } from "~/lib/authtests";

const osuName = ref<string>();
const osuAuth: OsuApiToken = store.get("osuAuthorization");

type PersonalOsuUser = {
    avatar_url: string; // URL of user's avatar
    country_code: string; // Two-letter code representing user's country
    default_group?: string; // Identifier of the default Group the user belongs to.
    id: number; // Unique identifier for user
    is_active: boolean; // Has this account been active in the last X months?
    is_bot: boolean; // Is this a bot account?
    is_deleted: boolean; // Is this account deleted?
    is_online: boolean; // Is the user currently online (either on lazer or the new website)?
    is_supporter: boolean; // Does this user have supporter?
    last_visit: string | null; // Last access time. null if the user hides online presence. (Assuming ISO 8601 string for Timestamp)
    pm_friends_only: boolean; // Whether or not the user allows PM from other than friends
    profile_colour?: string; // Colour of username/profile highlight, hex code (e.g. #333333).
    username: string; // User's display name
};

const fetchOsuUsername = async () => {
    const { fetchToOsu } = useServerFunctions();
    try {
        let _request: PersonalOsuUser = (await fetchToOsu("https://osu.ppy.sh/api/v2/me", {
            headers: {
                Authorization: `Bearer ${osuAuth.access_token}`,
                Accept: "application/json",
            },
        })) as PersonalOsuUser;

        console.log({ _request });
        osuName.value = _request.username;
    } catch (error) {
        console.warn("osuUsernameFetch:", error);
        window.location.replace("/onboarding")
    }
};

onMounted(() => {
    fetchOsuUsername();
});
</script>
<template>
    <span>{{ osuName }}</span>
</template>
<style lang="scss" scoped>
span {
    background: #f060a1;

    background: linear-gradient(
        180deg,
        hsla(333, 83%, 66%, 1) 0%,
        hsla(333, 89%, 69%, 1) 25%,
        hsla(332, 100%, 74%, 1) 50%,
        hsla(331, 100%, 74%, 1) 75%,
        hsla(329, 100%, 76%, 1) 100%
    );
    text-shadow: rgba(240, 96, 161, 0.4) 0px 0px 20px;
    color: transparent;
    background-clip: text;
}
</style>
