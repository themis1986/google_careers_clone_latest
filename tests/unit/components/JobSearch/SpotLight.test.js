import { render, screen } from "@testing-library/vue";
import axios from "axios";
import SpotLight from "@/components/JobSearch/SpotLight.vue";

vi.mock("axios");

describe("SpotLight", () => {
  const mockSpotlightsResponse = (spotlight = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "some image",
          title: "some title",
          description: "some description",
          ...spotlight,
        },
      ],
    });
  };
  it("provides image to parent component", async () => {
    const spotlight = { img: "other image" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #:default="slotProps">
                  <h1>{{slotProps.img}}</h1>
                  </template>`,
      },
    });

    const text = await screen.findByText("other image");
    expect(text).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    const spotlight = { title: "other title" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #:default="slotProps">
                  <h1>{{slotProps.title}}</h1>
                  </template>`,
      },
    });

    const text = await screen.findByText("other title");
    expect(text).toBeInTheDocument();
  });

  it("provides description to parent component", async () => {
    const spotlight = { description: "other description" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #:default="slotProps">
                  <h1>{{slotProps.description}}</h1>
                  </template>`,
      },
    });

    const text = await screen.findByText("other description");
    expect(text).toBeInTheDocument();
  });
});
