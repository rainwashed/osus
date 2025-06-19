<script setup lang="ts">
    import "~/assets/css/blog.css";

    const slug = useRoute().params.slug;

    const { data: post } = await useAsyncData(`${slug}`, () => {
        return queryCollection("blog").path(`/blog/${slug}`).first();
    });

    const parseAndFormatDate = (dateStr: string) => {
        // Convert the input string to a format recognized by Date
        const [day, monthStr, year] = dateStr.split("-");
        const months = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11,
        };

        // @ts-ignore
        const month = months[monthStr];
        if (month === undefined) throw new Error("Invalid month string");

        const dateObj = new Date(parseInt(year, 10), month, parseInt(day, 10));

        return dateObj.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
</script>
<template>
    <template v-if="post">
        <header class="w-full h-[20vh] md:h-[50vh] bg-black/30">
            <h1 class="text-5xl">
                {{ post.title }}
            </h1>
            <h3>{{ post.author }}</h3>
            <h4>{{ parseAndFormatDate(post.date) }}</h4>
        </header>
        <div class="w-[90vw] md:w-[60vw] p-4 bg-red-300 mx-auto">
            <ContentRenderer :value="post" />
        </div>
    </template>
</template>
