import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskForm from "../../../../components/tasks/TaskForm/TaskForm";
import "@testing-library/jest-dom";

 
const mockAddTask = jest.fn();
const mockOnClose = jest.fn();

describe("TaskForm", () => {
  beforeEach(() => {
    mockAddTask.mockClear();
    mockOnClose.mockClear();
  });

  it("renders the form correctly", () => {
    render(<TaskForm onClose={mockOnClose} addTask={mockAddTask} />);

 
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/new task/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save task/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("allows the user to type in the input fields", () => {
    render(<TaskForm onClose={mockOnClose} addTask={mockAddTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    
    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    expect((titleInput as HTMLInputElement).value).toBe("Test Task");

 
    fireEvent.change(descriptionInput, { target: { value: "This is a test task" } });
    expect((descriptionInput as HTMLInputElement).value).toBe("This is a test task");
  });

  it("calls addTask and onClose on form submit", async () => {
    render(<TaskForm onClose={mockOnClose} addTask={mockAddTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    
    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a test task" } });

   
    fireEvent.click(screen.getByRole("button", { name: /save task/i }));

    await waitFor(() => {
     
      expect(mockAddTask).toHaveBeenCalledWith({
        title: "Test Task",
        description: "This is a test task",
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("calls onClose and resets the form on cancel", () => {
    render(<TaskForm onClose={mockOnClose} addTask={mockAddTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

   
    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a test task" } });

 
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

 
    expect((titleInput as HTMLInputElement).value).toBe("");
    expect((descriptionInput as HTMLInputElement).value).toBe("");
    expect(mockOnClose).toHaveBeenCalled();
  });
});