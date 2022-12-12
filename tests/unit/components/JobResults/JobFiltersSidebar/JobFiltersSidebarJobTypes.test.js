import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

import { useRouter } from "vue-router";
import { router } from "json-server";
import { vi } from "vitest";
vi.mock("vue-router");

describe("JobFiltersSidebarJobTypes", () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    const jobsStore = useJobsStore();

    render(JobFiltersSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { userStore, jobsStore };
  };
  it("renders unique list of job types from jobs", async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(["full-time", "part-time"]);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);

    expect(jobTypes).toEqual(["full-time", "part-time"]);
  });

  describe("when user clicks checkbox", () => {
    const push = vi.fn();
    useRouter.mockReturnValue({ push });

    it("communicates that user jas selected checkbox for job type", async () => {
      const { userStore, jobsStore } = renderJobFiltersSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["full-time", "part-time"]);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        "full-time",
      ]);
    });

    it("navigates user to job results page to see fresh batch of job results", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const { jobsStore } = renderJobFiltersSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["full-time"]);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
