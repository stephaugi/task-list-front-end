import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

// ({ id, title, isComplete }) => (props)
// props.id, props.title, props.isComplete

const Task = ({ id, title, isComplete, onComplete, onDelete}) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  // const markComplete = () =>
  // {
  //   onComplete(id);
  // };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => {onComplete(id)}}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => {onDelete(id)}}
      >x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
