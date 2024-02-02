import React, { useState } from 'react'
import api from '../api/ItemCreator.ts';




const TodoItemForm = () => {
  const [title, setTitle] = useState('');
  const [complete, setComplete] = useState(false);

  const addItemToDatabase = async () => {
    if (!title) {
      alert('Please add a title');
      return;
    }

    const requestBody = {
      title: title,
      completed: complete,
    };

    try {
      const response = await api.post('http://localhost:5008/api/v1/items/create', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API response', response);
    } catch (error) {
      console.error('Could not add new item to the list', error.response.data);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'title') {
      setTitle(event.target.value);
    } else if (event.target.id === 'completed') {
      setComplete(event.target.checked);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.reload();
    addItemToDatabase();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Todo item:</label>
        <br />
        <input type="text" id="title" placeholder="" value={title} onChange={handleChange} required />
        <span className="error">Enter a todo item</span>
      </div>
      <div>
        <label htmlFor="completed">Completed:</label>
        <br />
        <input type="checkbox" id="completed" checked={complete} onChange={handleChange} />
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default TodoItemForm;


