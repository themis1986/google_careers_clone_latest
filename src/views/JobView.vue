<template>
  <div>Job page id: {{ currentJobId }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const currentJobId = computed(() => route.params.id);
</script>

<style lang="scss" scoped></style>
