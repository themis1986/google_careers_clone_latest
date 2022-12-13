import { useJobsStore } from "@/stores/jobs";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import type { Mock } from "vitest";
import type { Job } fromm "@/api/types"

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();

    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axiosGetMock.mockResolvedValue({ data: ["job 1", "job 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();

      expect(store.jobs).toEqual(["job 1", "job 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
      ] as Job[];
      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: "full-time" },
        { jobType: "temporary" },
        { jobType: "full-time" },
      ] as Job[];
      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["full-time", "temporary"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organizations", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const jobsStore = useJobsStore();
        const job = { organization: "google" } as Job;
        const result = jobsStore.INCLUDE_JOB_BY_ORGANIZATION(job);

        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["google", "microsoft"];
      const jobsStore = useJobsStore();
      const job = { organization: "google" } as Job;
      const result = jobsStore.INCLUDE_JOB_BY_ORGANIZATION(job);

      expect(result).toBe(true);
    });
  });
  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job types", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const jobsStore = useJobsStore();
        const job = { jobType: "full-time" } as Job;
        const result = jobsStore.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given job types", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["full-time", "part-time"];
      const jobsStore = useJobsStore();
      const job = { jobType: "part-time" } as Job;
      const result = jobsStore.INCLUDE_JOB_BY_JOB_TYPE(job);

      expect(result).toBe(true);
    });
  });
});
