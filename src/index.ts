import { Hono } from 'hono'
import mainRouter from './routes'
import {cors} from "hono/cors";

const app = new Hono()
app.use('/api/*',cors({
    origin : "*"
}));
app.route('/api',mainRouter);

export default app
