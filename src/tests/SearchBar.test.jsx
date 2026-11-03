import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar";

test("reports changes to the query", async () => {
  const user = userEvent.setup();
  const onQueryChange = jest.fn();
  render(<SearchBar query="" onQueryChange={onQueryChange} />);

  await user.type(screen.getByRole("searchbox", { name: "Search projects" }), "a");

  expect(onQueryChange).toHaveBeenLastCalledWith("a");
});
