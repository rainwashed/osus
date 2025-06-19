<script setup lang="ts">
    const openCoffeePage = () => window.open("https://coff.ee/rainwashed", "_blank");
</script>
<template>
    <div class="fixed bottom-6 right-6">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        size="icon"
                        @click="openCoffeePage"
                        id="buymeacoffee">
                        <Icon name="i-simple-icons-buymeacoffee" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Donate</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
</template>
<style scoped lang="scss">
    #buymeacoffee {
        border: 0.1em;
        border-image: linear-gradient(135deg, #fff4a3, #ffdd00, #a47100);
    }
</style>
