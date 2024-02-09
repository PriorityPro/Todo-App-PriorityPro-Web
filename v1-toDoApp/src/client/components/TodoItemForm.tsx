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
      //bug to look into later but current cheapest work around is the following
      //this logic is here to prevent our middleware to trigger a post request
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
        <label className='shadow-lg dark:shadow-dark' htmlFor="title">What needs to be done?</label>
        <br />
        <input type="text" className='h-8 w-80 rounded-md mb-6'  id="title" placeholder="" value={title} onChange={handleChange}  onBlur={e => {
        // only re-focus if the user clicked on something
        // that was NOT an input element
        if (e.relatedTarget === null) {
            e.target.focus();
        }
    }}
    />
        <div className='flex items-center justify-center p-4'>
          <ul className='shadow-lg dark:shadow-dark h-full bg-stone-500 bg-opacity-25 rounded-md'>
            {todos.map((todo, index) => (
              <ol className='p-2 flex items-center' key={index}>
                <span className="w-full mr-2 relative flex justify-between">{todo.title}</span>
                <div className='group'>
                <button className="shadow-lg dark:shadow-dark mt-2 flex transition ease-in-out delay-350 inline-flex justify-center items-center h-1 w-1 opacity-0 group-hover:opacity-100 -translate-y-1 hover:scale-110 hover:bg-red-500 duration-300" onClick={() => {deleteItemFromList(todo.id)}}>
                  X
                </button>
                </div>
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

