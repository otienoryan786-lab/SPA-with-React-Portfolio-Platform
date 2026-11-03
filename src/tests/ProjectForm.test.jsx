import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectForm from "../components/ProjectForm";

test("submits trimmed project details", async () => {
  const user = userEvent.setup();
  const onAddProject = jest.fn();
  render(<ProjectForm onAddProject={onAddProject} />);

  await user.type(screen.getByLabelText("Project title"), " New project ");
  await user.type(screen.getByLabelText("Description"), " A description ");
  await user.click(screen.getByRole("button", { name: "Add project" }));

  expect(onAddProject).toHaveBeenCalledWith({
    title: "New project",
    description: "A description",
  });
});
