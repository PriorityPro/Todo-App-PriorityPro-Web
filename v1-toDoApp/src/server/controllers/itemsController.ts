// import { sql } from "@vercel/postgres";
import { query } from "../database/model.ts";
import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from "express";


interface itemsControllerInterface {
  createItem: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  fetchItems: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  deleteItem: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  updateItem: (req: Request, res: Response, next: NextFunction) => Promise<void>,

}

const itemController : itemsControllerInterface = {
  createItem: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const { title, completed } = req.body;
    console.log('this is our req.body --->', req.body)
    
    //make sure the title and a completed status are set
    if (!title || !completed ) {
      //if not return this error
      res.status(400).send('Error in itemController.createItem: Not given all necessary inputs')
      //continues the middleware chain
      return next();
    }

try {
  const sqlCommandCheck = `SELECT * from toDoItems WHERE title = $1;`;
  const valueCheck = [ title ];
  const result = await query(sqlCommandCheck, valueCheck);
  if (result.rows[0]) {
    res.status(400).json({ message: 'Item already exist' });
    return next()
  }

  const primarySqlCmd = `INSERT INTO toDoItems (title, completed) VALUES ($1, $2) RETURNING *;`;
  const values = [title, completed];
  await query(primarySqlCmd, values);

  res.status(201).json({ message: 'item created successfully' });
  next()

} catch (err) {
  console.error('Error during item insert option:', err);
  res.status(500).send('Error creating a new item to database')
  next()
      }
   },

   //create our fetchitems controller
   //res.locals.items
   fetchItems: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sqlCommand = `SELECT * FROM toDoItems;`;
    try {
      const allItems = await query(sqlCommand);
      res.locals.fetchedItems = allItems.rows;
      if (!allItems.rowCount) throw createHttpError(400, 'Item not found')
      return next();
  
    } catch (err) {
      console.error('Failed to fetch all items in the todo list', err);
      return next(createHttpError(400, 'Could not retreive your todo list request'))
    }
   },
 
   updateItem: async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    console.log('test')
    const {
      title,
      completed
    } = req.body;
    console.log('test')
    const { id } = req.params;

    const command = 'UPDATE todoItems SET title = $1, completed = $2 WHERE id = $3';
    const values = [title, completed, id]; // Include the id in the values array

    console.log('this is our id', id);
    console.log('this is req.body -->', req.body);
    
    try {
      await query(command, values);
      return next();
    } catch (err) {
      console.error(err); // Log the error for debugging
      return next(createHttpError(400, 'Could not update item in the todo list'));
    }
},

   deleteItem: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const command = 'DELETE FROM toDoItems WHERE id = $1';
    const values = [id];

    try {
      const deletedItem = await query(command, values);
      res.locals.deletedItem = deletedItem.rowCount;
      return next();
    } catch (err) {
      console.error('Failed to delete the item in the todo list', err);
      return next(createHttpError(400, 'Could not delete the todo list item'))
    }

   }
}

export default itemController;