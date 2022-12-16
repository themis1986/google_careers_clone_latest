import { defineStore } from "pinia";
import { ref } from "vue";

export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES";
export const CLEAR_USER_JOB_FILTER_SELECTIONS =
  "CLEAR_USER_JOB_FILTER_SELECTIONS";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref<Boolean>(false);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);

  const LOGIN_USER = () => (isLoggedIn.value = true);

  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations;
  };

  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes;
  };

  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees;
  };

  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedOrganizations.value = [];
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
  };

  return {
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    LOGIN_USER,
    ADD_SELECTED_ORGANIZATIONS,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_DEGREES,
    CLEAR_USER_JOB_FILTER_SELECTIONS,
  };
});

// export interface UserState {
//   isLoggedIn: boolean;
//   selectedOrganizations: string[];
//   selectedJobTypes: string[];
//   selectedDegrees: string[];
// }

// export const useUserStore = defineStore("user", {
//   state: (): UserState => ({
//     isLoggedIn: false,
//     selectedOrganizations: [],
//     selectedJobTypes: [],
//     selectedDegrees: [],
//   }),
//   actions: {
//     loginUser() {
//       this.isLoggedIn = true;
//     },
//     [ADD_SELECTED_ORGANIZATIONS](organizations: string[]) {
//       this.selectedOrganizations = organizations;
//     },
//     [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
//       this.selectedJobTypes = jobTypes;
//     },
//     [ADD_SELECTED_DEGREES](degrees: string[]) {
//       this.selectedDegrees = degrees;
//     },
//     [CLEAR_USER_JOB_FILTER_SELECTIONS]() {
//       this.selectedOrganizations = [];
//       this.selectedDegrees = [];
//       this.selectedJobTypes = [];
//     },
//   },
// });
