import { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultsFormState = {
  title: '',
  description: ''
};



const NewTaskForm = ({ onHandleSubmit }) =>{
  const [formData, setFormData] = useState(kDefaultsFormState);

  const makeControlledInput = (inputName) => {
    return (<input
      type="text"
      name={inputName}
      id={`input-${inputName}`}
      value={formData[inputName]}
      onChange={handleChange}
    />
    );
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    setFormData(formData => {
      return {
        ...formData,
        [inputName]: inputValue
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSubmit(formData);
    setFormData(kDefaultsFormState);
  };

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title">Task Title </label>
      {makeControlledInput('title')}
    </div>
    <div>
      <label htmlFor="description">Description </label>
      {makeControlledInput('description')}
    </div>
    <div>
      <input type="submit" value="Create a Task"/>
    </div>
  </form>;
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;