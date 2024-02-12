/* eslint-disable @typescript-eslint/no-explicit-any */

import api from '../api/ItemFinder.ts'
import { useEffect, useState } from 'react'



const FetchItems = () => {
const [ items, setItems ] = useState([]);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const res = await api.get('http://localhost:5008/api/v1/items');
      console.log('this is our res --> ', res);
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching the todo items', error);
    }
  };
  fetchItems()
}, [])


  return (
    <div>
      <h2>Todo Items</h2>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            {item.title} - {item.completed ? 'Completed' : 'Not Completed'}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default FetchItems


