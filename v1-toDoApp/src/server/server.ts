// we use default spell `express` which is the main spell
// and call named spell`Request` and `Response` which joker will need later
// to understand information, he's a psycho information broker after all
// ofc we will use ES module system 
import express, { Request, Response } from "express";
import itemRouter from './routes/itemsRoutes.ts';

// instantize an app from express() function
const app = express();

//middleware for static files in the future if we end up going this route
//app.use(express.static('public'));

//middleware to allow information from forms as we'll need this for our todo list
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setup a simple get route 
// and return a test message

// app.get("/", (_req: Request, res: Response) => {
//   res.json({ test: "Ok" });
 
// });

// app.get("/items", (_req: Request, res: Response) => {
//   //res.send("sending the todo list items")
//   res.status(200).send(res.locals.items)
// })

app.use((req: Request, _res: Response, next) => {
  console.log(`${req.method} ${req.path} ${req.params}`);
  next();
});

//router for items
app.use('/items', itemRouter);
//create our post router



// and finally start the server at port 5000
const PORT = 5008;
app.listen(PORT, () => {
  console.log("server has started on port");
  console.log("http://localhost:" + PORT);
});