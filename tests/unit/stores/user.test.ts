import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of if user is logged in", () => {
    const store = useUserStore();

    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job types that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.LOGIN_USER();

      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations the user has chosen to filter jobs by ", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["org1", "org2"]);
      expect(store.selectedOrganizations).toEqual(["org1", "org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types the user has chosen to fiter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["full-time", "part-time"]);
      expect(store.selectedJobTypes).toEqual(["full-time", "part-time"]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees the user has chosen to fiter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Master's", "Barchelor's"]);
      expect(store.selectedDegrees).toEqual(["Master's", "Barchelor's"]);
    });
  });

  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("removes all job filters that user has chosen", () => {
      const store = useUserStore();
      store.selectedDegrees = ["Master's"];
      store.selectedJobTypes = ["full-time"];
      store.selectedOrganizations = ["Google"];

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
    });
  });
});
