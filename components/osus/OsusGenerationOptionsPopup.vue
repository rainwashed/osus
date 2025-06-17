<script setup lang="ts">
import { useForm } from 'vee-validate';
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";

const configurationState = ref<OsusConfiguration>({ ...DefaultOsusConfiguration });
const gameModeItems = [
    {id: "standard", label: "osu!standard"},
    {id: "catch", label: "osu!catch"},
    {id: "mania", label: "osu!mania"},
    {id: "taiko", label: "osu!taiko"}
];
const mapTypeItems = [
    {id: "favorite", label: "Favorite"},
    {id: "graveyard", label: "Graveyard"},
    {id: "guest", label: "Guest"},
    {id: "loved", label: "Loved"},
    {id: "nominated", label: "Nominated"},
    {id: "pending", label: "Pending"},
    {id: "ranked", label: "Ranked"}
];
const scoreGradeItems = [
    {id: "ssh", label: "SSH"},
    {id: "sh", label: "SH"},
    {id: "ss", label: "SS"},
    {id: "s", label: "S"},
    {id: "a", label: "A"},
    {id: "b", label: "B"},
    {id: "c", label: "C"},
    {id: "d", label: "D"}
];
const creationOrderItems: Array<{ id: OsusConfiguration['creation_order'], label: string }> = [
    { id: "best_performance", label: "Best Performance" },
    { id: "recent", label: "Recent" },
    { id: "oldest", label: "Oldest" },
    { id: "most_played", label: "Most Played" }
];

watch(configurationState, (newValue) => {
    console.log("configState changed:", newValue);
}, { deep: true });

const {handleSubmit} = useForm({
    validationSchema: toTypedSchema(OsusConfigurationSchema),
    initialValues: DefaultOsusConfiguration,
});

const onSubmit = handleSubmit((values) => {
    console.log("values::", values);
})

// The form now updates configurationState reactively.
// The onSubmit function and explicit submit button are no longer needed
// if actions are to be triggered directly by state changes or other UI elements.
</script>
<template>
  <!-- Removed non-standard :initial-values and problematic @change="onSubmit" -->
  <form @submit="onSubmit">
    <!-- Creation Order -->
    <FormField v-slot="{ componentField }" name="creation_order" class="md:col-span-2">
      <FormItem class="space-y-1.5">
        <FormLabel>Sort songs by</FormLabel>
        <FormControl>
          <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <FormItem v-for="item in creationOrderItems" :key="item.id" class="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem :value="item.id" />
              </FormControl>
              <FormLabel class="font-normal">{{ item.label }}</FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <!-- Gamemodes Checkbox Group - Aligned with shadcn-vue docs pattern -->
    <FormField v-slot="{ value: currentGamemodesArray, handleChange: handleGamemodesChange }" name="gamemodes">
      <FormItem>
        <FormLabel>Included gamemodes</FormLabel>
        <div class="space-y-1 pt-2">
          <FormItem v-for="item in gameModeItems" :key="item.id" class="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :checked="currentGamemodesArray && currentGamemodesArray.includes(item.id)"
                @update:checked="(checkedState: boolean) => {
                  const currentSelected = Array.isArray(currentGamemodesArray) ? currentGamemodesArray : [];
                  let newSelectedGamemodes;
                  if (checkedState) {
                    // Add item.id if not already present
                    if (!currentSelected.includes(item.id)) {
                      newSelectedGamemodes = [...currentSelected, item.id];
                    } else {
                      newSelectedGamemodes = [...currentSelected]; // No change
                    }
                  } else {
                    // Remove item.id
                    newSelectedGamemodes = currentSelected.filter(id => id !== item.id);
                  }
                  handleGamemodesChange(newSelectedGamemodes);
                }"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </div>
        <FormMessage />
      </FormItem>
    </FormField>
    <!-- It's good practice to have an explicit submit button -->
    <Button type="submit" class="mt-4">Apply Settings</Button>
  </form>
</template>
