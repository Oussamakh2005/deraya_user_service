import { Hono } from 'hono'
import mainRouter from './routes'

const app = new Hono()

app.route('/api',mainRouter);

export default app
