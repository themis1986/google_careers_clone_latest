<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="org in UNIQUE_ORGANIZATIONS" :key="org" class="h-8 w-1/2">
            <input :id="org" type="checkbox" class="mr-3" />
            <label :for="org">{{ org }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { useJobsStore } from "@/stores/jobs";
import { UNIQUE_ORGANIZATIONS } from "@/stores/jobs";
import { mapState } from "pinia";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: { CollapsibleAccordion },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
  },
};
</script>

<style lang="scss" scoped></style>
