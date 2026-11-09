import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("shows starter projects", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Recent projects" })).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("adds a trimmed project to the top of the list", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByLabelText("Project title"), "  Pop-up Gallery ");
  await user.type(screen.getByLabelText("Description"), " Exhibition identity ");
  await user.click(screen.getByRole("button", { name: "Add project" }));

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(4);
  expect(items[0]).toHaveTextContent("Pop-up Gallery");
  expect(screen.getByLabelText("Project title")).toHaveValue("");
});

test("validates the form and does not add an empty project", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "Add project" }));

  expect(screen.getByRole("alert")).toHaveTextContent(/title and description/i);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("searches titles and descriptions without case sensitivity", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByRole("searchbox", { name: "Search projects" }), "KIJANI");

  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  expect(screen.getByText("Kijani Farms Website")).toBeInTheDocument();
});

test("sorts projects alphabetically and clears a search", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.selectOptions(screen.getByRole("combobox", { name: "Sort projects" }), "title");
  expect(screen.getAllByRole("listitem")[0]).toHaveTextContent("City Arts Festival Campaign");

  await user.type(screen.getByRole("searchbox", { name: "Search projects" }), "Kijani");
  await user.click(screen.getByRole("button", { name: "Clear search" }));

  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("shows a clear message when no projects match", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByRole("searchbox", { name: "Search projects" }), "no-match");

  expect(screen.getByRole("status")).toHaveTextContent(/no projects match/i);
});

test("falls back to starter projects when saved data is malformed", () => {
  window.localStorage.setItem(
    "project-showcase:projects",
    JSON.stringify([{ id: 1, title: null, description: "Invalid project" }])
  );

  render(<App />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("persists new projects across remounts", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);
  await user.type(screen.getByLabelText("Project title"), "Studio refresh");
  await user.type(screen.getByLabelText("Description"), "New identity");
  await user.click(screen.getByRole("button", { name: "Add project" }));
  unmount();

  render(<App />);

  expect(screen.getAllByRole("listitem")[0]).toHaveTextContent("Studio refresh");
});
