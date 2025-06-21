<script setup lang="ts">
    const input = ref<string>("");
    const result = ref<string>("");

    const onClick = async () => {
        const { testFuck } = useServerFunctions({ cache: false });
        result.value = await testFuck(input.value);
    };
</script>
<template>
    <Input v-model:model-value="input" />
    <Button @click="onClick">Test</Button>
    <p>Server returned: {{ result }}</p>
</template>
