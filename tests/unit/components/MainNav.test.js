import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";
import userEvent from "@testing-library/user-event";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays meu items for navigation", () => {
    render(MainNav);
    const navigationMenuItems = screen.getAllByRole("listitem");
    // console.log(navigationMenuItems);
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    // console.log(navigationMenuTexts);
    expect(navigationMenuTexts).toEqual([
      "Teams ",
      "Location",
      "Life at Bobo Corp",
      "Students",
      "Jobs",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      render(MainNav);
      // screen.debug();
      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });

      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      await userEvent.click(loginButton);
      profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });

      expect(profileImage).toBeInTheDocument();
    });
  });
});
