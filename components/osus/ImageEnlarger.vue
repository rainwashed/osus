<template>
    <div>
        <Button
            :src="src"
            :alt="alt"
            class="cursor-zoom-in max-w-full max-h-96 object-contain"
            @click="openModal">
            <slot />
        </Button>

        <div
            v-if="isOpen"
            class="fixed inset-0 z-[9999] outline-none bg-black bg-opacity-80 flex items-center justify-center transition-opacity duration-300"
            @click.self="closeModal">
            <Button
                class="absolute top-4 right-4 text-white text-3xl font-bold z-50"
                @click="closeModal"
                aria-label="Close">
                &times;
            </Button>

            <img
                :src="src"
                :alt="alt"
                class="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-300" />
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from "vue";

    const props = defineProps({
        src: { type: String, required: true },
        alt: { type: String, default: "" },
    });

    const isOpen = ref(false);

    const openModal = () => {
        isOpen.value = true;
        document.body.style.overflow = "hidden"; // Prevent background scroll
    };

    const closeModal = () => {
        isOpen.value = false;
        document.body.style.overflow = ""; // Restore scroll
    };

    const handleKey = (e) => {
        if (e.key === "Escape") closeModal();
    };

    onMounted(() => window.addEventListener("keydown", handleKey));
    onBeforeUnmount(() => window.removeEventListener("keydown", handleKey));
</script>

<style scoped>
    /* Optional: smoother scaling effect */
    img {
        transition: transform 0.3s ease;
    }
</style>
