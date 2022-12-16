import { defineStore } from "pinia";
import getDegrees from "@/api/getDegrees";
import type { Degree } from "@/api/types";
import { computed, ref } from "vue";

export const useDegreesStore = defineStore("degrees", () => {
  const degrees = ref<Degree[]>([]);

  const UNIQUE_DEGREES = computed(() => {
    return degrees.value.map((degree) => degree.degree);
  });

  const FETCH_DEGREES = async () => {
    const receivedDegrees = await getDegrees();
    degrees.value = receivedDegrees;
  };

  return {
    degrees,
    FETCH_DEGREES,
    UNIQUE_DEGREES,
  };
});
