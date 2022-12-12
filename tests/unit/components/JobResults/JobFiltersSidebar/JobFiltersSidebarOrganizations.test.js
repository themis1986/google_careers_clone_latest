import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFiltersSidebarOrganizations", () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    const jobsStore = useJobsStore();
    const $router = {
      push: vi.fn(),
    };

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        mocks: { $router },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { userStore, jobsStore, $router };
  };
  it("renders unique list of organizations from jobs", async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole("listitem");
    const organizations = organizationListItems.map((node) => node.textContent);

    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  describe("whe user click checbox", () => {
    it("communicates that user jas selected checkbox for organization", async () => {
      const { userStore, jobsStore } = renderJobFiltersSidebarOrganizations();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

      const button = screen.getByRole("button", { name: /organizations/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", { name: /google/i });
      await userEvent.click(googleCheckbox);

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
        "Google",
      ]);
    });

    it("navigates user to job results page to see fresh batch of job results", async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarOrganizations();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["google"]);

      const button = screen.getByRole("button", { name: /organizations/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
