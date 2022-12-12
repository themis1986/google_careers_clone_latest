<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="org in UNIQUE_ORGANIZATIONS" :key="org" class="h-8 w-1/2">
            <input
              :id="org"
              v-model="selectedOrganizations"
              :value="org"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="org">{{ org }}</label>
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

const selectedOrganizations = ref([]);

const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);

const userStore = useUserStore();
const ADD_SELECTED_ORGANIZATIONS = userStore.ADD_SELECTED_ORGANIZATIONS;
const router = useRouter();

const selectOrganization = () => {
  ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value);
  router.push({
    name: "JobResults",
  });
};
</script>

<style lang="scss" scoped></style>
