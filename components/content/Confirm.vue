<script setup lang="ts">
    import store from "store2";

    const confirmSpotifyExperimentalUsage = () => {
        store.set("spotifyExperimentalUsage", true, true);
        document.location.replace("/onboarding");
    };
</script>
<template>
    <AlertDialog>
        <AlertDialogTrigger as-child>
            <Button>I still want Spotify Access</Button>
        </AlertDialogTrigger>
        <AlertDialogContent class="max-w-[70vw] max-h-[80vh]">
            <AlertDialogHeader class="font-bold">
                Spotify functionality is not guaranteed and requires trust, are you sure?
            </AlertDialogHeader>
            <AlertDialogDescription>
                Spotify functionality will require that you go to the Spotify website and retrieve your personal oauth
                token, which has complete access and is not limited to the scope that osus! would prefer. This token is
                essential to your account's security and cannot be be shared to
                <span class="font-bold">anyone.</span>
                osus! will store this token in the browser's localStorage, and all function calls to Spotify will be
                directly to
                <span class="italic">https://api.spotify.com</span>
                from the browser context, so there will not be any server in-between these API calls, but
                <span class="font-bold">you are responsible</span>
                for keeping this oauth token safe.
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel>Nevermind, I will use an alternative solution.</AlertDialogCancel>
                <AlertDialogAction @click="confirmSpotifyExperimentalUsage">I am absolutely sure.</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
