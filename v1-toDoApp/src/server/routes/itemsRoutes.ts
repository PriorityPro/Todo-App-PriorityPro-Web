import express, { Request, Response } from "express";
import itemController from "../controllers/itemsController.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = express.Router();
// instantize an app from express() function

//get the items for our todo list
//router.get("/items") === router.get("/")
router.get("/", (_req: Request, res: Response) => {
  res.send("sending the todo list items")
  
})

//post to create our items for a todo list
router.post('/create', itemController.createItem, (_req: Request, res: Response) => {
//res.status(200).send('test creating an item');
res.status(200).json(res.locals.items)
})

// router.post('/', (_req: Request, res: Response) => {
//   res.send('create a todo item')
//   })

//access an individual item
router.get('/:id', (_req: Request, res: Response) => {
_req.params.id
res.send(`get an individual item ${_req.params.id}`)
})

//update an individual item
router.put('/:id', (_req: Request, res: Response) => {
  _req.params.id
  res.send(`update an individual item ${_req.params.id}`)
})

//Delete an individual item
router.delete('/:id', (_req: Request, res: Response) => {
  _req.params.id
  res.send(`delete an individual item ${_req.params.id}`)
})

router.param('id', (_req: Request, _res: Response, next, id) => {
  console.log('this is our id ---> ', id)
  next()
})

export default router;