import { render, screen } from "@testing-library/vue";
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import { nextTick } from "vue";

describe("TheHeadline", () => {
  // describe("Vitest playground", () => {
  //   it("tracks whether it has been called ", () => {
  //     const mockFunction = vi.fn();
  //     mockFunction(1, 2);
  //     expect(mockFunction).toHaveBeenCalledWith(1, 2);
  //   });
  // });
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays introductory actin verb", () => {
    render(TheHeadline);
    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("changes action verb at a consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);

    expect(mock).toHaveBeenCalled();
  });

  it("swaps action verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    await nextTick();

    const actionPhrase = screen.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("removes interval when component dissapears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);
    const { unmount } = render(TheHeadline);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
