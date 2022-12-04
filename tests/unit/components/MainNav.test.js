import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";

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
});
