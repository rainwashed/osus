<script setup lang="ts">
    import store from "store2";
    import { useToast } from "~/components/ui/toast";
    import {
        testOsuAuthorization,
        testSpotifyAuthorization,
        type OsuApiToken,
        type SpotifyApiToken,
    } from "~/lib/authtests";

    const spotifyAuthState = ref<boolean>(false);
    const osuAuthState = ref<boolean>(false);
    const privacyConditionState = ref<boolean>(false);
    const isSpotifyLoginDisabled = !(store.get("spotifyExperimentalUsage") || false);
    const isSpotifyAuthorizationPopupShown = ref<boolean>(false);
    const selfPastedOauthAuthorizationValue = ref<string>();

    onMounted(() => {
        console.log({ isSpotifyLoginDisabled });

        // @ts-ignore
        window["overrideSpotifyApi"] = (authorization: string) => {
            if (!authorization.startsWith("Bearer")) throw new Error("authorization should start with 'Bearer'");

            const accessToken = authorization.split(" ")[1];
            const workaroundApiToken: SpotifyApiToken = {
                token_type: `Bearer`,
                access_token: accessToken,
                expires_in: -1,
                refresh_token: "",
                scope: "all",
            };

            store.set("spotifyAuthorization", workaroundApiToken, true);
            document.location.reload();
        };
    });

    const spotifyOAuthClick = async () => {
        isSpotifyAuthorizationPopupShown.value = true;
    };

    const createFakeAuthorizationValue = () => {
        const authorizationValue = selfPastedOauthAuthorizationValue.value?.split(" ");
        const { toast } = useToast();
        if (authorizationValue === undefined || authorizationValue[0] !== "Bearer") {
            toast({
                title: "Invalid format",
                description: "The format should be Bearer xxxxxxxxxxxxxxxx",
            });
            return;
        }

        const fakeAuthorizationObject: SpotifyApiToken = {
            token_type: "Bearer",
            access_token: authorizationValue[1],
            expires_in: -1,
            refresh_token: "",
            scope: "all",
        };

        store.set("spotifyAuthorization", fakeAuthorizationObject, true);
        document.location.reload();
    };

    // const spotifyOAuthClick = async () => {
    //     console.log("spotifyOauth clicked");
    //     const { createSpotifyAuthorizationLink } = useServerFunctions();
    //     const spotifyLink = await createSpotifyAuthorizationLink();
    //     store.set("lastProvider", "spotify", true);

    //     window.open(spotifyLink, "_target");
    // };

    const osuOAuthClick = async () => {
        console.log("osuOauth clicked");
        const { createOsuAuthorizationLink } = useServerFunctions();
        const osuLink = await createOsuAuthorizationLink();
        store.set("lastProvider", "osu", true);

        window.open(osuLink, "_target");
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
        const dataSlot = target.getAttribute("role");

        console.log({ target, dataSlot });

        if (dataSlot !== "checkbox") return;

        store.set("privacyAuth", !privacyConditionState.value, true);
        privacyConditionState.value = !privacyConditionState.value;
    };

    const redirectToHome = () => {
        document.location.replace("/");
        return;
    };
</script>
<template>
    <div class="flex flex-col items-center justify-center h-full">
        <h1 class="text-[5vmin] mb-5">
            Authorize
            <span class="font-nunito">osus!</span>
        </h1>
        <span class="inline-flex flex-col mb-2 space-x-2 md:flex-row">
            <TooltipProvider :disabled="!isSpotifyLoginDisabled">
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            class="shadow-md bg-spotify text-secondary hover:bg-spotify/90 special_btn"
                            :disabled="isSpotifyLoginDisabled"
                            @click="spotifyOAuthClick">
                            <Icon
                                name="i-simple-icons:spotify"
                                class="inline text-xl" />
                            <span v-if="spotifyAuthState">Authorized</span>
                            <span v-else>Authorize for Spotify</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Spotify access is disabled. Please see
                        <a
                            href="/blog/spotify"
                            class="underline">
                            this blog post
                        </a>
                        to learn more.
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Button
                class="shadow-md bg-osu text-secondary hover:bg-osu/90 special_btn"
                @click="osuOAuthClick">
                <Icon
                    name="i-simple-icons:osu"
                    class="inline text-xl" />
                <span v-if="osuAuthState">Authorized</span>
                <span v-else>Authorize for osu!</span>
            </Button>
        </span>
        <Button
            class="mb-2 w-[30.5rem]"
            variant="outline"
            v-if="spotifyAuthState && osuAuthState"
            @click="redirectToHome">
            Get started
        </Button>
        <p class="p-1 mb-4 text-xs border rounded-md text-primary/80 max-w-96 border-primary/20">
            <span class="font-nunito">osus!</span>
            will never ask for more permissions than necessary. Always ensure that the scope for any OAuth application
            is the absolute minimum necessary for its function.
        </p>
        <span class="inline-flex items-center gap-x-2">
            <Checkbox
                id="anonymousData"
                :checked="privacyConditionState"
                @click="storePrivacyAgreementCheckboxClicked" />
            <label
                for="anonymousData"
                class="text-sm font-medium leading-none text-primary/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Participate in a completely anonymous and freely-viewable repository
                <a
                    class="text-primary"
                    href="/data">
                    (learn more)
                </a>
                .
            </label>
        </span>
    </div>
    <AlertDialog
        :open="isSpotifyAuthorizationPopupShown"
        :default-open="false">
        <AlertDialogContent class="max-w-[90vw] w-[90vw]! max-h-[80vh]">
            <AlertDialogHeader>
                <AlertDialogTrigger>Retrieve your authorization header</AlertDialogTrigger>
                <AlertDialogDescription class="flex flex-col items-center max-h-[66%]">
                    <img
                        src="~/assets/images/steps.gif"
                        class="w-auto h-[50%] mb-4" />
                    <Textarea
                        placeholder="Bearer ................................."
                        v-model:model-value="selfPastedOauthAuthorizationValue"
                        class="resize-none"></Textarea>
                </AlertDialogDescription>
                <span class="ml-auto space-x-2">
                    <AlertDialogCancel @click="() => (isSpotifyAuthorizationPopupShown = false)">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction @click="createFakeAuthorizationValue">Submit</AlertDialogAction>
                </span>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
</template>
<style scoped lang="scss">
    button.special_btn {
        @apply w-60;
    }
</style>
