import { render, screen } from "@testing-library/react";
import ProjectList from "../components/ProjectList";

test("shows an empty state when there are no projects", () => {
  render(<ProjectList projects={[]} isFiltered={false} />);
  expect(screen.getByRole("status")).toHaveTextContent(/add your first project/i);
});

test("shows search-specific guidance when no results match", () => {
  render(<ProjectList projects={[]} isFiltered />);
  expect(screen.getByRole("status")).toHaveTextContent(/try another word/i);
});
