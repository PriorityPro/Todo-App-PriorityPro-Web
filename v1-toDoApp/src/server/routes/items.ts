import express, { Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = express.Router();
// instantize an app from express() function

//get the items for our todo list
//router.get("/items") === router.get("/")
router.get("/", (_req: Request, res: Response) => {
  res.send("sending the todo list items")
})

//post to create our items for a todo list
router.post('/', (_req: Request, res: Response) => {
res.send('create a todo item')
})

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

export default router;