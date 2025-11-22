import  express, {json} from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { moviesRouter } from "./routes/movies.js";

const app = express();
app.use(json());
app.use(corsMiddleware());

app.use('/movies', moviesRouter)

app.listen(1234);