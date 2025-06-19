<script setup lang="ts">
    // Data for form elements
    const gameModeItems = [
        { id: "standard", label: "osu!standard" },
        { id: "catch", label: "osu!catch" },
        { id: "mania", label: "osu!mania" },
        { id: "taiko", label: "osu!taiko" },
    ];
    const mapTypeItems = [
        { id: "favorite", label: "Favorite" },
        { id: "graveyard", label: "Graveyard" },
        { id: "guest", label: "Guest" },
        { id: "loved", label: "Loved" },
        { id: "nominated", label: "Nominated" },
        { id: "pending", label: "Pending" },
        { id: "ranked", label: "Ranked" },
    ];
    const scoreGradeItems = [
        { id: "ssh", label: "SSH" },
        { id: "sh", label: "SH" },
        { id: "ss", label: "SS" },
        { id: "s", label: "S" },
        { id: "a", label: "A" },
        { id: "b", label: "B" },
        { id: "c", label: "C" },
        { id: "d", label: "D" },
    ];
    const creationOrderItems: Array<{ id: OsusConfiguration["creation_order"]; label: string }> = [
        { id: "best_performance", label: "Best Performance" },
        { id: "recent", label: "Recent" },
        { id: "oldest", label: "Oldest" },
        { id: "most_played", label: "Most Played" },
    ];
</script>
<template>
    <p>This feature is coming soon...</p>
</template>
