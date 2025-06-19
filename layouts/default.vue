<script setup lang="ts">
    import "~/lib/debug";
    import "./authStore";
</script>
<template>
    <main class="w-screen h-screen max-h-screen overflow-auto max-w-screen">
        <slot />
        <Toaster />
        <OsusDonateMeMoney />
    </main>
</template>
