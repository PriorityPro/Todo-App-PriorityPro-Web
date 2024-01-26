// we use default spell `express` which is the main spell
// and call named spell`Request` and `Response` which joker will need later
// to understand information, he's a psycho information broker after all
// ofc we will use ES module system 
import express, { Request, Response } from "express";
import itemRouter from './routes/items.ts';

// instantize an app from express() function
const app = express();

// setup a simple get route 
// and return a test message
app.get("/", (_req: Request, res: Response) => {
  res.json({ test: "Ok" });
});

app.get("/items", (_req: Request, res: Response) => {
  res.send("sending the todo list items")
})



//router for items
app.use('/items', itemRouter);
//create our post router



// and finally start the server at port 5000
const PORT = 5008;
app.listen(PORT, () => {
  console.log("server has started on port");
  console.log("http://localhost:" + PORT);
});