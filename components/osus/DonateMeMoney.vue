<script setup lang="ts">
const openCoffeePage = () => window.open("https://coff.ee/rainwashed", "_blank");
</script>
<template>
    <div class="fixed bottom-6 right-6">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button size="icon" @click="openCoffeePage" class="scale-150"><Icon name="i-simple-icons-buymeacoffee" /></Button
                ></TooltipTrigger>
                <TooltipContent>Donate</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
</template>
