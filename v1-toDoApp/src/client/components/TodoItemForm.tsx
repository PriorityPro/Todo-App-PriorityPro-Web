import React, { useState } from 'react'
import api from '../api/ItemCreator.ts';
import styled from 'styled-components';

const ListWrapper = styled.section`
  background: white;
  color: black;
  height: auto;

`;



interface Todo {
  title: string,
  complete: boolean
}


const TodoItemForm = () => {
  const [title, setTitle] = useState('');
  const [complete, setComplete] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]); // Explicitly define the type



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'title') {
      setTitle(event.target.value);
    } else if (event.target.id === 'completed') {
      setComplete(event.target.checked);
    }
  };

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
      const response = await api.post('http://localhost:5008/api/v1/items/create', requestBody);
      console.log('API response', response);
    } catch (error) {
      console.error('Could not add new item to the list', error.response.data);
    }
    setTodos([...todos, { title, complete }]);
  };
  
 
//on form submission we don't want to reload the page
//invoking our addItemToDatabase function which is making the request
//as well as adding our items to our array
//updating the state for the title to an empty string
//updating the state to false
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addItemToDatabase();
    setTitle('')
    setComplete(false);
  };

  return (
    <>
    <h2>Todo</h2>
    <form onSubmit={handleSubmit}>
      <div id="form">
        <label htmlFor="title">What needs to be done?</label>
        <br />
        <input type="text" id="title" placeholder="" value={title} onChange={handleChange} required />
        {/* <span className="error"></span> */}
      </div>
      <div>
        {/* <label htmlFor="completed">Completed:</label> */}
        <br />
        {/* <input type="checkbox" id="completed" checked={complete} onChange={handleChange} /> */}
      </div>
      {/* <input type="submit" value="Submit" /> */}

      <div>
        {/* <h2>Todo List:</h2> */}
        <ul>
          {todos.map((todo, index) => (
            <ListWrapper key={index}>{todo.title} - {todo.complete ? 'Completed' : 'Incomplete'}</ListWrapper>
          ))}
        </ul>
      </div>
    </form>
    </>
  );
};

export default TodoItemForm;


