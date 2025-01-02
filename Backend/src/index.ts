import { Hono } from 'hono'
const app = new Hono()
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

app.use('/*', cors())
 app.route("/api/v1/user" , userRouter);
 app.route("/api/v1/blog" , blogRouter);




export default app

