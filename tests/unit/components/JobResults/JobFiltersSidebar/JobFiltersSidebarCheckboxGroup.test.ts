import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useRouter } from "vue-router";
import type { Mock } from "vitest";
import { useUserStore } from "@/stores/user";

interface JobFiltersSidebarCheckboxGroups {
  uniqueValues: Set<string>;
  action: Mock;
}

vi.mock("vue-router");
const useRouterMock = useRouter as Mock;
describe("JobFiltersSidebarCheckboxGroup", () => {
  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroups>
  ): JobFiltersSidebarCheckboxGroups => ({
    uniqueValues: new Set(["valueA", "valueB"]),
    action: vi.fn(),
    ...props,
  });

  const renderJobFiltersCheckboxGroup = (
    props: JobFiltersSidebarCheckboxGroups
  ) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };
  it("renders unique list of values", () => {
    const props = createProps({
      uniqueValues: new Set(["full-time", "part-time"]),
    });
    renderJobFiltersCheckboxGroup(props);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);

    expect(jobTypes).toEqual(["full-time", "part-time"]);
  });

  describe("when user clicks checkbox", () => {
    const push = vi.fn();
    useRouterMock.mockReturnValue({ push });

    it("communicates that user jas selected checkbox for value", async () => {
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["full-time", "part-time"]),
        action,
      });
      renderJobFiltersCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(["full-time"]);
    });

    it("navigates user to job results page to see fresh batch of job results", async () => {
      const props = createProps({
        uniqueValues: new Set(["full-time"]),
      });
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      renderJobFiltersCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });

  describe("when user clears job filters", () => {
    it("unchecks any checked checkboxes", async () => {
      const props = createProps({
        uniqueValues: new Set(["full-time"]),
      });
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      const { userStore } = renderJobFiltersCheckboxGroup(props);

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
        "checkbox",
        {
          name: /full-time/i,
        }
      );
      await userEvent.click(fullTimeCheckboxBeforeAction);
      expect(fullTimeCheckboxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();
      const fullTimeCheckboxAfterAction =
        await screen.findByRole<HTMLInputElement>("checkbox", {
          name: /full-time/i,
        });
      expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
