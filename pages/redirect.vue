<script setup lang="ts">
import store from "store2";
const authorizationState = ref<boolean>();
const {elevateAuthorizationCodeToAccessToken} = useServerFunctions();

onMounted(async () => {
    const lastProvider = store.get("lastProvider") as string;
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get("code");
    const error = urlSearchParams.get("error");
    const state = urlSearchParams.get("state");

    console.log({ code, error, state, lastProvider });

    if (code !== null) {
        console.log("attempting to elevate")
        await elevateAuthorizationCodeToAccessToken(code, "https://osus.rainwashed.xyz/redirect")
    }
    if (error !== null && error === "access_denied") {
        authorizationState.value = false;
    }
});
</script>
<template>
    <div>
        <p></p>
    </div>
</template>
