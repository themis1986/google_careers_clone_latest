<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUserStore } from "@/stores/user";
import { useDegreesStore } from "@/stores/degrees";
import { computed } from "vue";

const userStore = useUserStore();
const degreesStore = useDegreesStore();

const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);
</script>

<style scoped></style>
