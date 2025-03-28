import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskView from "../../../../components/tasks/TaskItem/TaskView";
import "@testing-library/jest-dom";

describe("TaskView Component", () => {
  const mockHandleEdit = jest.fn();

  const task = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the task title and description", () => {
    render(<TaskView task={task} handleEdit={mockHandleEdit} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should call handleEdit when the edit button is clicked", () => {
    render(<TaskView task={task} handleEdit={mockHandleEdit} />);

    const editButton = screen.getByRole("button");
    fireEvent.click(editButton);

    expect(mockHandleEdit).toHaveBeenCalled();
  });
});