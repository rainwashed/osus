<script setup lang="ts">
    import { Button } from "@/components/ui/button";
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";

    const colorMode = useColorMode();
</script>

<template>
    <div class="fixed right-16 bottom-6">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline">
                    <Icon
                        name="i-radix-icons-moon"
                        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Icon
                        name="i-radix-icons-sun"
                        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                <DropdownMenuItem @click="colorMode.preference = 'light'">Light</DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'dark'">Dark</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
