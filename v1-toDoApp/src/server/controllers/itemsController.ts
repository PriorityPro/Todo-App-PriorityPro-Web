// import { sql } from "@vercel/postgres";
import { query } from "../database/model.ts";
import { Request, Response, NextFunction } from "express";


interface itemsControllerInterface {
  createItem: (req: Request, res: Response, next: NextFunction) => Promise<void>,

}

const itemController : itemsControllerInterface = {
  createItem: async (req, res, next) => {
    
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
   }
}

export default itemController;