import TaskList from './components/TaskList.jsx';
import { useState } from 'react';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];
const toggleCompleteTask = task => {
  console.log(`${task.title} has been completed!`)
  return { ...task, isComplete: !task.isComplete };
};

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const handleComplete = (id) => {
    setTaskData((prevTaskData) => {
      return prevTaskData.map(task => {
        if (task.id === id) {
          return toggleCompleteTask(task);
        } else {return task;}
      });
    }
    );
  };

  const handleDelete = (id) => {
    setTaskData(prevTaskData => {
      return prevTaskData.filter(task => task.id !== id);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList
          tasks={taskData}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />}</div>
      </main>
    </div>
  );
};

export default App;
