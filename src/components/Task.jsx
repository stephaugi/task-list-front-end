import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

// ({ id, title, isComplete }) => (props)
// props.id, props.title, props.isComplete

const Task = ({ id, title, isComplete }) => {
  const [complete, setComplete] = useState(isComplete);
  const buttonClass = complete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => setComplete(!complete)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default Task;
