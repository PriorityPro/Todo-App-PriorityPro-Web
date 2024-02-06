import React, { useState } from 'react'
import api from '../api/ItemCreator.ts';



interface Todo  {
  id: number;
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
      
      const newItem = response.data
      console.log('API response data', response.data);
      setTodos([...todos, newItem]);
    } catch (error) {
      console.error('Could not add new item to the list', error.response.data);
    }
    // setTodos([...todos, { title, complete, id }]);
    setTitle('');
    setComplete(false);
  };


const deleteItemFromList = async (id: number) => {
  

  try {
    const response = await api.delete(`http://localhost:5008/api/v1/items/${id}`, )
    console.log("API Response for delete", response);
    setTodos(todos.filter(item => item.id !== id));
  } catch (error) {
    console.log('could not delete th item from the list');
    error.response.data
  }
  

}
  
 
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
    <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-yellow-300">Todo</h2>
    <form onSubmit={handleSubmit}>
      <div id="form">
        <label className='' htmlFor="title">What needs to be done?</label>
        <br />
        <input className='rounded-md mb-6' type="text" id="title" placeholder="" value={title} onChange={handleChange} required />
        <div className='flex items-center justify-center p-4'>
          <ul className='h-full bg-stone-500 bg-opacity-25 rounded-md'>
            {todos.map((todo, index) => (
              <ol className='p-2 flex items-center' key={index}>
                <span className="mr-2">{todo.title}</span>
                <button className="ml-auto w-5 h-5 bg-yellow-500 hover:bg-red-400 text-white" onClick={() => {deleteItemFromList(todo.id)}}>
                  X
                </button>
              </ol>
            ))}
          </ul>
        </div>
      </div>
    </form>
  </>
  );
};

export default TodoItemForm;

