<template>
  <collapsible-accordion header="Job types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in UNIQUE_JOB_TYPES"
            :key="jobType"
            class="h-8 w-1/2"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobType"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const selectedJobTypes = ref([]);

const jobsStore = useJobsStore();
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);

const userStore = useUserStore();
const router = useRouter();
const selectJobType = () => {
  userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value);
  router.push({
    name: "JobResults",
  });
};
</script>

<style lang="scss" scoped></style>
