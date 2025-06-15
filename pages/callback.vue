<script lang="ts">
const authorizationState = ref<boolean>();

onMounted(() => {
    const params: {
        code?: string;
        error?: string;
        state: string;
    } = new URLSearchParams(window.location.search);

    if (params.code !== undefined) {
        
    }
    if (params.error !== undefined && params.error === "access_denied") {
        authorizationState.value = false;
    }
})
</script>
<template>
    <div>
        <p></p>
    </div>
</template>