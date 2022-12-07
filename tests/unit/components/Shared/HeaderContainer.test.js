import { render, screen } from "@testing-library/vue";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  it("allows parent component to provide title content", () => {
    render(HeaderContainer, {
      slots: {
        title: "<h2>My title</h2>",
      },
    });
    const title = screen.getByText("My title");
    expect(title).toBeInTheDocument();
  });

  it("allows parent component to provide subtitle content", () => {
    render(HeaderContainer, {
      slots: {
        subtitle: "<h2>My subtitle</h2>",
      },
    });
    const title = screen.getByText("My subtitle");
    expect(title).toBeInTheDocument();
  });
});
