
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../../../../components/tasks/TaskItem/TaskItem";
import { useTasks } from "../../../../hooks/useTasks";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";


jest.mock("../../../../hooks/useTasks");
jest.mock('../../../../api/httpService', () => ({
  api: {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
  },
}));

describe("TaskItem Component", () => {
  const mockEditTask = jest.fn();
  const mockHandleDelete = jest.fn();

  const task = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
  };

  beforeEach(() => {
    mockEditTask.mockClear();
    mockHandleDelete.mockClear();
    (useTasks as jest.Mock).mockReturnValue({
        editTask: mockEditTask,  
    });
  });

  it("should render the TaskView component by default", () => {
    render(<TaskItem task={task} handleDelete={mockHandleDelete} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  it("should call handleDelete when the delete button is clicked", () => {
    render(<TaskItem task={task} handleDelete={mockHandleDelete} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledWith(task.id);
  });

  it("should switch to TaskEditForm when the edit button is clicked", () => {
    render(<TaskItem task={task} handleDelete={mockHandleDelete} />);

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByPlaceholderText("Task Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task Description")).toBeInTheDocument();
  });

  it("should call editTask and switch back to TaskView when save is clicked", async () => {
    render(<TaskItem task={task} handleDelete={mockHandleDelete} />);
  
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
  
    fireEvent.change(screen.getByPlaceholderText("Task Title"), { target: { value: "Updated Task" } });
    fireEvent.change(screen.getByPlaceholderText("Task Description"), { target: { value: "Updated Description" } });
    fireEvent.click(screen.getByText("Save"));  
  
    await waitFor(() => {
      expect(mockEditTask).toHaveBeenCalledWith(task.id, {
        title: "Updated Task",
        description: "Updated Description",
      });
  
      expect(screen.getByText("Updated Task")).toBeInTheDocument();
      expect(screen.getByText("Updated Description")).toBeInTheDocument();
    });
  });

  it("should reset the form and switch back to TaskView when cancel is clicked", async () => {

    render(<TaskItem task={task} handleDelete={mockHandleDelete} />);
    
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
  
    fireEvent.change(screen.getByPlaceholderText("Task Title"), { target: { value: "Modified Title" } });
    fireEvent.change(screen.getByPlaceholderText("Task Description"), { target: { value: "Modified Description" } });
    fireEvent.click(screen.getByText("Cancel"));
  
    await waitFor(() => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
    });
  });
  
});