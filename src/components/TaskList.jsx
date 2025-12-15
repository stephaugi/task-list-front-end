import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

// getTaskListJSX is used in TaskList component.
const TaskList = ({ tasks, onComplete,onDelete }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

// takes one prop, tasks.
// tasks is an array of objects that have id, title, isComplete
// props is input from app.jsx and the structure of the object is from Task
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskList;
