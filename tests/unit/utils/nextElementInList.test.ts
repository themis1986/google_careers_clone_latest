import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates element in list and returns the next element in list", () => {
    const list = ["a", "b", "c", "d", "e"];
    const value = "c";
    const result = nextElementInList(list, value);
    expect(result).toBe("d");
  });

  describe("when element is at the end of the list", () => {
    it("locates next element at start of list", () => {
      const list = ["a", "b", "c", "d", "e"];
      const value = "e";
      const result = nextElementInList(list, value);
      expect(result).toBe("a");
    });
  });
});
