import express, { Request, Response } from "express";
import itemController from "../controllers/itemsController.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = express.Router();
// instantize an app from express() function

//get the items for our todo list
//router.get("/items") === router.get("/")
router.get("/", itemController.fetchItems, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.fetchedItems);
  
})

//post to create our items for a todo list
router.post('/create', itemController.createItem, (_req: Request, res: Response) => {
res.status(201).json(res.locals.newItem)
console.log('New item created', res.locals.newItem)
})



//access an individual item
router.get('/:id', (_req: Request, res: Response) => {
_req.params.id
res.send(`get an individual item ${_req.params.id}`)
})

//update an individual item
router.patch('/:id', itemController.updateItem, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.updatedItem);
  console.log(`update an individual item ${_req.params.id}`);
})

//Delete an individual item
router.delete('/:id', itemController.deleteItem, (_req: Request, res: Response) => {
  res.send(`delete an individual item ${_req.params.id}`)
  console.log(res.locals.fetchedItems)
})

router.param('id', (_req: Request, _res: Response, next, id) => {
  console.log('this is our id ---> ', id)
  next()
})

export default router;