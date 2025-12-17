import TaskList from './components/TaskList.jsx';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];
const toggleCompleteTask = task => {
  console.log(`${task.title} has been completed!`);
  return { ...task, isComplete: !task.isComplete };
};

const kbaseURL = 'http://127.0.0.1:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const convertFromAPI = (task) => {
  const { id, title, description } = task;
  const newTask = {
    id,
    title,
    description,
    isComplete: task.is_complete
  };
  return newTask;
};



const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        setTaskData(tasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

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
