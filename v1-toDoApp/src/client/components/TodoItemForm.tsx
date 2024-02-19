import React, { FC, useMemo, useState } from 'react'
import api from '../api/ItemCreator.ts';
import TodoItem from './TodoItem';



export interface TodoProps  {
  id: number,
  title: string,
  complete: boolean
}


//This allows us to pass our Todos to other components
const TodoItemForm:FC = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [taskName, setTaskName] = useState('');
  const [isComplete, setisComplete] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id?: number) => {
    const { value } = event.target;
    if (id !== undefined) {
      // Update an existing todo item
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, title: value } : todo
      );
      setTodos(updatedTodos);
    } else {
      // Add a new todo item
      setTaskName(value);
    }
  }; 

  const addItemToDatabase = async () => {
    if (!taskName) {
      //bug to look into later but current cheapest work around is the following
      //this logic is here to prevent our middleware to trigger a post request
      return;
    }
    const requestBody = {
      title: taskName,
      completed: isComplete,
    };

    try {
      const response = await api.post('http://localhost:5008/api/v1/items/create', requestBody);
      if(!response) {
        return;
      }
      const newItem = response.data
      console.log('API response data', response.data);
      setTodos([...todos, newItem]);
    } catch (error) {
      console.error('Could not add new item to the list', error.response.data);
    }
    setTaskName('');
    setisComplete(false);
  };

const deleteItemFromList = async (id: number) => {
  try {
    const response = await api.delete(`http://localhost:5008/api/v1/items/${id}`)
    console.log("API Response for delete", response);
    setTodos(todos.filter(item => item.id !== id));
  } catch (error) {
    console.log('Could not delete th item from the list.');
    error.response.data
  }
}

const updateTodo = async (id: number, newTitle: string) => {
  try {
    const requestBody = {
      title: newTitle,
    };
    const response = await api.patch(`http://localhost:5008/api/v1/items/${id}`, requestBody);
    console.log('Updated todo:', response);
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
  } catch (error) {
    console.error('Could not update todo:', error.response.data);
  }
};
  
const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addItemToDatabase();
    setTaskName('')
    setisComplete(false);
};

return (
  <div className='static  flex flex-col items-center justify-center'>
    <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-yellow-300">Todo</h2>
    <form onSubmit={handleSubmit}>
      <div id="form">
        <label className='' htmlFor="title">What needs to be done?</label>
        <br />
        <input 
          type="text" 
          className='mt-2 h-8 w-80 rounded-md mb-7'  
          id="title" 
          placeholder="" 
          value={taskName} 
          onChange={handleChange}  
          onBlur={e => {
            if (e.relatedTarget === null) {
              e.target.focus();
            }
          }}
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mb-1 bg-emerald-600 hover:bg-emerald-400 rounded-md cursor-pointer ml-2 h-8 w-20 inline-flex items-center justify-center w-8 h-8" onClick={addItemToDatabase}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    </form>
    <ul className="'shadow-lg dark:shadow-dark h-full bg-stone-500 bg-opacity-25 rounded-lg'">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          isEditing={isEditing === todo.id}
          setIsEditing={setIsEditing}
          handleChange={handleChange}
          updateTodo={updateTodo}
          deleteItemFromList={deleteItemFromList}
        />
      ))}
    </ul>
  </div>
);
};

export default TodoItemForm;