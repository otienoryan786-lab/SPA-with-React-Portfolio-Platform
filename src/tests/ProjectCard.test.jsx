import { render, screen } from "@testing-library/react";
import ProjectCard from "../components/ProjectCard";

test("renders a project's title, description, and decorative initials", () => {
  render(
    <ul>
      <ProjectCard project={{ id: 1, title: "North Shore", description: "Brand design" }} />
    </ul>
  );

  expect(screen.getByRole("heading", { name: "North Shore" })).toBeInTheDocument();
  expect(screen.getByText("Brand design")).toBeInTheDocument();
  expect(screen.getByText("NS")).toHaveAttribute("aria-hidden", "true");
});
