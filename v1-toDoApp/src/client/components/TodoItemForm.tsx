import React, { useMemo, useState } from 'react'
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
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track the ID of the item being edited
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);



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
      setTitle(value);
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
      if(!response) {
        return;
      }
      const newItem = response.data
      console.log('API response data', response.data);
      setTodos([...todos, newItem]);
    } catch (error) {
      console.error('Could not add new item to the list', error.response.data);
    }
    setTitle('');
    setComplete(false);
  };


const deleteItemFromList = async (id: number) => {
  try {
    const response = await api.delete(`http://localhost:5008/api/v1/items/${id}`)
    console.log("API Response for delete", response);
    setTodos(todos.filter(item => item.id !== id));
  } catch (error) {
    console.log('could not delete th item from the list');
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
    setIsEditing(null); // Reset isEditing after updating todo
  } catch (error) {
    console.error('Could not update todo:', error.response.data);
  }
};
  
const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addItemToDatabase();
    setTitle('')
    setComplete(false);
};

//const renderedTodos = useMemo(() => { return todos.map(x => <TodoItem props={...x} />)}, [todos])
  

return (
  <>
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
          value={title} 
          onChange={handleChange}  
          onBlur={e => {
            // only re-focus if the user clicked on something
            // that was NOT an input element
            if (e.relatedTarget === null) {
              e.target.focus();
            }
          }}
        />
        {/* Add button */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mb-1 bg-emerald-400 rounded-md cursor-pointer ml-2 h-8 w-20 inline-flex items-center justify-center w-8 h-8" onClick={addItemToDatabase}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <div className='flex items-center justify-center p-4'>
          <ul className='shadow-lg dark:shadow-dark h-full bg-stone-500 bg-opacity-25 rounded-md'>
          /* Look into using memo here rather then inserting the logic in our return */
            {todos.map((todo, index) => (
              <li className='p-2 flex items-center' key={index}>
                {isEditing === todo.id ? (
                  <input
                    type="text"
                    value={todo.title}
                    onChange={(e) => handleChange(e, todo.id)}
                    onBlur={() => updateTodo(todo.id, todo.title)}
                  />
                ) : (
                  <span className="w-full mr-2 relative flex justify-between">{todo.title}</span>
                )}
                <div className='inline-flex group '>
                  {/* Edit icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => setIsEditing(todo.id)} className="bg-blue-500 cursor-pointer w-8 h-8 p-1 m-1 rounded-md shadow-lg dark:shadow-dark">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                  {/* Trash can icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => { deleteItemFromList(todo.id) }} className="bg-red-500 cursor-pointer w-8 h-8 p-1 m-1 rounded-md shadow-lg dark:shadow-dark">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  </>
);
}
export default TodoItemForm;


