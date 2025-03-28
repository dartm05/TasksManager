import { render, screen, fireEvent } from "@testing-library/react";
import FormField from "../../../../components/tasks/TaskForm/FormField";
import "@testing-library/jest-dom";


describe("FormField Component", () => {
  const mockOnChange = jest.fn();

  it("should render a text input field correctly", () => {
    render(
      <FormField
        id="title"
        label="Title"
        value="Test Title"
        onChange={mockOnChange}
        placeholder="Enter task title"
        isTextArea={false}
      />
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter task title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Title")).toBeInTheDocument();
  });

  it("should render a textarea field correctly", () => {
    render(
      <FormField
        id="description"
        label="Description"
        value="Test Description"
        onChange={mockOnChange}
        placeholder="Enter task description"
        isTextArea={true}
      />
    );

    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter task description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
  });

  it("should call onChange when typing in the input field", () => {
    render(
      <FormField
        id="title"
        label="Title"
        value=""
        onChange={mockOnChange}
        placeholder="Enter task title"
        isTextArea={false}
      />
    );

    const input = screen.getByLabelText("Title");
    fireEvent.change(input, { target: { value: "New Title" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should call onChange when typing in the textarea field", () => {
    render(
      <FormField
        id="description"
        label="Description"
        value=""
        onChange={mockOnChange}
        placeholder="Enter task description"
        isTextArea={true}
      />
    );

    const textarea = screen.getByLabelText("Description");
    fireEvent.change(textarea, { target: { value: "New Description" } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});