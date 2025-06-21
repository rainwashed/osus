<script setup lang="ts">
    const logInformation = ref<string[]>(["All log information will show up here!"]);
    const textAreaRef = useTemplateRef<HTMLTextAreaElement>("textarea");

    const appendToLogInformation = (message: string) => {
        const currentTime = Date.now();
        const localeString = new Date(currentTime).toLocaleString();

        logInformation.value = [...logInformation.value, `[${localeString}] - ${message}`];
    };

    const scrollTextAreaToBottom = () => {
        if (textAreaRef.value && textAreaRef.value.scrollTop && textAreaRef.value.scrollHeight) {
            textAreaRef.value.scrollTop = textAreaRef.value.scrollHeight;
        }
    };

    onMounted(() => {
        const notificationBus = useNuxtApp().$bus;

        notificationBus.on("notify", appendToLogInformation);
    });

    onBeforeUnmount(() => {
        const notificationBus = useNuxtApp().$bus;
        notificationBus.off("notify");
    });
</script>
<template>
    <Textarea
        ref="textarea"
        class="resize-none w-[60%] mt-4"
        readonly
        v-bind:model-value="logInformation.join('\n')"
        @change="scrollTextAreaToBottom"></Textarea>
</template>
