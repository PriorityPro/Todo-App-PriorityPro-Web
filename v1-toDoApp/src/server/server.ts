// we use default spell `express` which is the main spell
// and call named spell`Request` and `Response` which joker will need later
// to understand information, he's a psycho information broker after all
// ofc we will use ES module system 
import express, { Request, Response } from "express";
import itemRouter from './routes/itemsRoutes.ts';
import cors from 'cors';

// instantize an app from express() function
const app = express();

//middleware for static files in the future if we end up going this route
//app.use(express.static('public'));

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

//middleware to allow information from forms as we'll need this for our todo list
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req: Request, _res: Response, next) => {
  console.log(`${req.method} ${req.path} ${req.params}`);
  next();
});

//router for items
app.use('/api/v1/items', itemRouter);
//app.use('/items', itemRouter);


const PORT = 5008;
app.listen(PORT, () => {
  console.log("server has started on port");
  console.log("http://localhost:" + PORT);
});