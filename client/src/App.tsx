import React from 'react';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;