<script setup lang="ts">

</script>
<template>
<div class="flex flex-row justify-evenly">
    <div>
        <span class="text-primary/80">Order</span>
        <RadioGroup default-value="recent">
            <span>
                <RadioGroupItem id="recent" value="recent"/>
                <label for="recent">Recent</label>
            </span>
            <span>
                <RadioGroupItem id="oldest" value="oldest" />
                <label for="oldest">Oldest</label>
            </span>
            <span>
                <RadioGroupItem id="best_performance" value="best_performance" />
                <label for="best_performance">Best Performance</label>
            </span>
            <span>
                <RadioGroupItem id="most_played" value="most_played" />
                <label for="most_played">Most Played</label>
            </span>
        </RadioGroup>
    </div>
    <div>
        <span>Game Modes</span>
        <div class="flex flex-col">
            <span>
                <Checkbox id="standard" value="standard" />
                <label for="standard">osu!standard</label>
            </span>
            <span>
                <Checkbox id="catch" value="catch" />
                <label for="catch">osu!catch</label>
            </span>
            <span>
                <Checkbox id="mania" value="mania" />
                <label for="mania">osu!mania</label>
            </span>
            <span>
                <Checkbox id="taiko" value="taiko" />
                <label for="taiko">osu!taiko</label>
            </span>
        </div>
    </div>
    <div>
        <span>Map Ratings</span>
        <div class="grid grid-cols-2 gap-2">
            <span>
                <Checkbox id="favorite" value="favorite" />
                <label for="favorite">Favorite</label>
            </span>
            <span>
                <Checkbox id="graveyard" value="graveyard" />
                <label for="graveyard">Graveyard</label>
            </span>
            <span>
                <Checkbox id="guest" value="guest" />
                <label for="guest">Guest</label>
            </span>
            <span>
                <Checkbox id="loved" value="loved" />
                <label for="loved">Loved</label>
            </span>
            <span>
                <Checkbox id="nominated" value="nominated" />
                <label for="nominated">Nominated</label>
            </span>
            <span>
                <Checkbox id="pending" value="pending" />
                <label for="pending">Pending</label>
            </span>
            <span>
                <Checkbox id="ranked" value="ranked" />
                <label for="ranked">Ranked</label>
            </span>
        </div>
    </div>
    <div>
        <span>Score Grade</span>
        <div class="flex flex-col">
            <span>
                <Checkbox id="ssh" value="ssh" />
                <label for="ssh">SSH</label>
            </span>
            <span>
                <Checkbox id="sh" value="sh" />
                <label for="sh">SH</label>
            </span>
            <span>
                <Checkbox id="ss" value="ss" />
                <label for="ss">SS</label>
            </span>
            <span>
                <Checkbox id="s" value="s" />
                <label for="s">S</label>
            </span>
            <span>
                <Checkbox id="a" value="a" />
                <label for="a">A</label>
            </span>
            <span>
                <Checkbox id="b" value="b" />
                <label for="b">B</label>
            </span>
            <span>
                <Checkbox id="c" value="c" />
                <label for="c">C</label>
            </span>
            <span>
                <Checkbox id="d" value="d" />
                <label for="d">D</label>
            </span>
        </div>
    </div>
    <div>
        <span>Miscellaneous</span>
        <div class="flex flex-col space-y-1">
        <Input type="number" placeholder="max songs" id="max_songs" />
        <Input type="number" placeholder="min pp" id="min_pp_score" />
        <Input type="number" placeholder="min accuracy" id="min_completion_accuracy" />
        <Input type="number" placeholder="min star" id="min_star_rating" />
        <span>
            <Checkbox id="fc" value="fc" />
            <label for="fc">Full Combo</label>
        </span>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
span:has(button[role=radio]), span:has(button[role=checkbox]) {
    @apply inline-flex items-center space-x-1 bg-red-100;
}
</style>