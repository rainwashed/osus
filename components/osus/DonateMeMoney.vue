<script setup lang="ts">
const openCoffeePage = () => window.open("https://coff.ee/rainwashed", "_blank");
</script>
<template>
    <div class="fixed bottom-4 right-4 aspect-square">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button size="icon" @click="openCoffeePage" class="scale-125"><Icon name="i-simple-icons-buymeacoffee" /></Button
                ></TooltipTrigger>
                <TooltipContent>Donate</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
</template>
