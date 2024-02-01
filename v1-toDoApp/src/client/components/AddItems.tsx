
import axios from 'axios'
import ItemFinder from '../api/ItemFinder.ts'


interface Item {
  id: number,
  title: string,
  completed: boolean
}

const AddItems = async (): Promise<Item[]> => {
  const { data } = await axios.get<Item[]>(`${ItemFinder}`)
  console.log('this is our data -->', data);
  return data;
}

export default AddItems;
