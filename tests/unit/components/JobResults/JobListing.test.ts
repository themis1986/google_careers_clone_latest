import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";
import { createJob } from "../../../utils/createJob";
import type { Job } from "@/api/types";

describe("JobListing", () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...job,
        },
      },
    });
  };

  it("renders job title", () => {
    const jobProps = createJob({ title: "Vue Programmer" });
    renderJobListing(jobProps);

    expect(screen.getByText("Vue Programmer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const jobProps = createJob({ organization: "Samsung" });
    renderJobListing(jobProps);

    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJob({ locations: ["Orlando", "JacksonVille"] });
    renderJobListing(jobProps);

    expect(screen.getByText("Orlando")).toBeInTheDocument();
    expect(screen.getByText("JacksonVille")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJob({
      minimumQualifications: ["code", "develop"],
    });
    renderJobListing(jobProps);

    expect(screen.getByText("code")).toBeInTheDocument();
    expect(screen.getByText("develop")).toBeInTheDocument();
  });
});
