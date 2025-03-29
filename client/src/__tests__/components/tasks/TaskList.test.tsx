import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../../../components/tasks/TaskList";
import AuthProvider from '../../../context/AuthProvider'; 
import "@testing-library/jest-dom";

describe("TaskList Component", () => {
  const mockHandleDeleteTask = jest.fn();

  const tasks = [
    { id: "1", title: "Task 1", description: "Description 1" },
    { id: "2", title: "Task 2", description: "Description 2" },
    { id: "3", title: "Task 3", description: "Description 3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a list of tasks", () => {
    render(<AuthProvider><TaskList tasks={tasks} handleDeleteTask={mockHandleDeleteTask} /></AuthProvider>);
    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
    });
  });

  it("should call handleDeleteTask when a task's delete button is clicked", () => {
    render(
      <AuthProvider>
        <TaskList tasks={tasks} handleDeleteTask={mockHandleDeleteTask} />
      </AuthProvider>
    );

    const deleteButtons = screen.getAllByRole("button");
    fireEvent.click(deleteButtons[0]);

    expect(mockHandleDeleteTask).toHaveBeenCalledWith(tasks[0].id);
  });
});