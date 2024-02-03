// import { sql } from "@vercel/postgres";
import { query } from "../database/model.ts";
import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from "express";


interface itemsControllerInterface {
  createItem: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  fetchItems: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const itemController : itemsControllerInterface = {
  createItem: async (req, res, next) => {
    
    const { title, completed } = req.body || {};
    console.log('this is our req.body --->', req.body)
    
    //make sure the title and a completed status are set
    if (!title ) {
      //if not return this error
      res.status(400).send('Error in itemController.createItem: Not given all necessary inputs')
      //continues the middleware chain
      return next();
    }

try {
  const sqlCommandCheck = `SELECT * from toDoItems WHERE title = $1 AND completed = $2;`;
  const valueCheck = [ title, completed ];
  const result = await query(sqlCommandCheck, valueCheck);
  if (result.rows[0]) {
    res.status(400).json({ message: 'Item already exist' });
    return;
  }

  //const primarySqlCmd = `INSERT INTO toDoItems (title, completed) VALUES ($1, $2) RETURNING *;`;
  const primarySqlCmd = `INSERT INTO toDoItems (title) VALUES ($1) RETURNING *;`;
  //INSERT INTO toDoItems (title)
//VALUES ('walk the dog') RETURNING *;
  const values = [title];
  console.log('this is our values', values)
  const newItem = await query(primarySqlCmd, values);
  res.locals.newItem = newItem.rows[0];
  return next()
  // res.status(201).json({ message: 'item created successfully' });
} catch (err) {
  return next(createHttpError(400, 'Could not create new item in itemsController.createItem'))

      }
   },

   //create our fetchitems controller
   //res.locals.items
   fetchItems: async (_req: Request, res: Response, next: NextFunction) => {
    //const { title, completed } = req.body;
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


   }
}

export default itemController;