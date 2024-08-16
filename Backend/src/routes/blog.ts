import { Hono } from "hono"

export const blogRouter=  new Hono();

blogRouter.post('/', (c) => {
  return c.text('Hello Hono! from blog from signin')
})

blogRouter.put('/', (c) => {
  return c.text('Hello Hono! from put')
})

blogRouter.get('/', (c) => {
  return c.text('Hello Hono from blog!')
})

blogRouter.get('/bulk', (c) => {
  return c.text('Hello Hono form bulk!')
})