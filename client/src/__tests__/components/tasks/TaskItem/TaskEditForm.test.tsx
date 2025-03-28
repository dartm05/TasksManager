import { render, screen, fireEvent } from "@testing-library/react";
import TaskEditForm from "../../../../components/tasks/TaskItem/TaskEditForm";
import "@testing-library/jest-dom";

describe("TaskEditForm Component", () => {
  const mockHandleChange = jest.fn();
  const mockHandleSave = jest.fn();
  const mockHandleCancel = jest.fn();

  const editedTask = {
    title: "Test Title",
    description: "Test Description",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the TaskEditForm component", () => {
    render(
      <TaskEditForm
        editedTask={editedTask}
        handleChange={mockHandleChange}
        handleSave={mockHandleSave}
        handleCancel={mockHandleCancel}
      />
    );

    expect(screen.getByPlaceholderText("Task Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task Description")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should call handleChange when typing in the title input", () => {
    render(
      <TaskEditForm
        editedTask={editedTask}
        handleChange={mockHandleChange}
        handleSave={mockHandleSave}
        handleCancel={mockHandleCancel}
      />
    );

    const titleInput = screen.getByPlaceholderText("Task Title");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("should call handleChange when typing in the description textarea", () => {
    render(
      <TaskEditForm
        editedTask={editedTask}
        handleChange={mockHandleChange}
        handleSave={mockHandleSave}
        handleCancel={mockHandleCancel}
      />
    );

    const descriptionTextarea = screen.getByPlaceholderText("Task Description");
    fireEvent.change(descriptionTextarea, { target: { value: "Updated Description" } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("should call handleSave when the Save button is clicked", () => {
    render(
      <TaskEditForm
        editedTask={editedTask}
        handleChange={mockHandleChange}
        handleSave={mockHandleSave}
        handleCancel={mockHandleCancel}
      />
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it("should call handleCancel when the Cancel button is clicked", () => {
    render(
      <TaskEditForm
        editedTask={editedTask}
        handleChange={mockHandleChange}
        handleSave={mockHandleSave}
        handleCancel={mockHandleCancel}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockHandleCancel).toHaveBeenCalled();
  });
});