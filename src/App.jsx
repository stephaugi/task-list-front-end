import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
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

const markCompleteTaskAPI = (id, markComplete) => {
  return axios.patch(`${kbaseURL}/tasks/${id}/${markComplete}`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const deleteTaskAPI = (id) => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
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

const addTaskAPI = (newTask) => {
  return axios.post(`${kbaseURL}/tasks`, newTask)
    .catch(error => console.log(error));
};



const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        const newTasks = tasks.map(task => {
          return convertFromAPI(task);
        });

        setTaskData(newTasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const onHandleSubmit = (formData) => {
    console.log('Making a new task!');
    return addTaskAPI(formData)
      .then((result) => {
        return setTaskData(prevTaskData => [convertFromAPI(result.data.task), ...prevTaskData]
        );
      }
      );
  };

  const handleComplete = (id) => {
    let markComplete = null;
    for (const task of taskData) {
      if (task.id === id) {
        markComplete = !task.isComplete ? 'mark_complete' : 'mark_incomplete';
      }
    }
    return markCompleteTaskAPI(id, markComplete)
      .then (() => {
        return setTaskData(taskData => {
          return taskData.map(task => task.id === id ? toggleCompleteTask(task) : task);
        });
      });
  };

  const handleDelete = (id) => {
    deleteTaskAPI(id);
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
        <NewTaskForm
          onHandleSubmit={onHandleSubmit}
        />
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
