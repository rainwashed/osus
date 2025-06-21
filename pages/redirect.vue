<script setup lang="ts">
    import store from "store2";
    const authorizationState = ref<boolean>();
    const providerState = ref<string | null>(store.get("lastProvider"));

    const onSpotifyRedirect = async () => {
        const { elevateSpotifyAuthorizationCodeToAccessToken } = useServerFunctions({ cache: false });
        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get("code");
        const error = urlSearchParams.get("error");
        const state = urlSearchParams.get("state");

        console.log({ code, error, state });

        if (code !== null) {
            console.log("attempting to elevate spotify auth state");
            const elevatedToken = await elevateSpotifyAuthorizationCodeToAccessToken(code);

            store.set("spotifyAuthorization", elevatedToken);

            authorizationState.value = true;

            window.location.replace("/");
        }
        if (error !== null && error === "access_denied") {
            authorizationState.value = false;
        } else {
            console.warn("some parameters are missing");
            authorizationState.value = false;
        }
    };

    const onOsuRedirect = async () => {
        const { elevateOsuAuthorizationCodeToAccessToken } = useServerFunctions({ cache: false });
        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get("code");
        const error = urlSearchParams.get("error");
        const error_description = urlSearchParams.get("error_description");
        const state = urlSearchParams.get("state");

        console.log({ code, error, error_description, state });

        if (code !== null) {
            console.log("attempting to elevate osu auth state");
            const elevatedToken = await elevateOsuAuthorizationCodeToAccessToken(code);
            console.log({ elevatedToken });
            store.set("osuAuthorization", elevatedToken);

            authorizationState.value = true;
            window.location.replace("/");
        } else {
            console.warn("some parameters are missing");
            authorizationState.value = false;
        }
    };

    onMounted(() => {
        const lastRedirectProvider = store.get("lastProvider");

        console.log({ providerState, lastRedirectProvider });

        switch (lastRedirectProvider) {
            case "spotify":
                onSpotifyRedirect();
                break;
            case "osu":
                onOsuRedirect();
                break;
            default:
                break;
        }
    });

    onBeforeUnmount(() => {
        console.warn("clearing last provider storage");
        store.remove("lastProvider");
    });
</script>
<template>
    <div>
        <p v-if="providerState !== null">
            You have
            <span v-if="authorizationState">authorized</span>
            <span v-else>denied</span>
            access to
            <span>{{ providerState }}</span>
        </p>
        <p v-else>No provider state was given. This should only be accessed from redirects and not directly.</p>
    </div>
</template>
