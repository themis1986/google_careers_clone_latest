import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/Navigation/MainNav.vue";
import { RouterLinkStub } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";

vi.mock("vue-router");

describe("MainNav", () => {
  const renderMainNav = () => {
    useRoute.mockReturnValue({ name: "Home" });
    const pinia = createTestingPinia();
    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          "font-awesome-icon": true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };
  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays meu items for navigation", () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole("listitem");
    // console.log(navigationMenuItems);
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    // console.log(navigationMenuTexts);
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Bobo Corp",
      "Students",
      "Jobs",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();
      const userStore = useUserStore();
      // screen.debug();
      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });

      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      userStore.isLoggedIn = true;
      await userEvent.click(loginButton);
      profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });

      expect(profileImage).toBeInTheDocument();
    });
  });
});
