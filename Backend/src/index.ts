import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()
app.post('/api/v1/user/signup', async (c) => {
  const databse  =  c.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmEwZDFiNzctYWNlMy00NTMyLWEyYzQtZGU0MzQ1NGMzODE0IiwidGVuYW50X2lkIjoiNDc2MDEwYWY0MTNlNmNlZmNlYTlhMDFkZDJjY2Y1MmQwMTNhMmZiYTI3ZjIwODJiNTA0MThkZWZlOWUzMWUxMyIsImludGVybmFsX3NlY3JldCI6IjVhZWQyZTZiLWI4MTktNGU3YS1hY2E0LTJlODMyNjQxNjA0ZCJ9.qNbgt6s9lcz5Nx7B_YT-HgHbvHFcrBQ9jE_cU-8Zqmw"
  }).$extends(withAccelerate())

  const body = await c.req.json()
    // hash the password here  
  try {
    await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    })
    return c.text('User created')
  } catch (e) {
    c.status(403)
    console.log("mistake is " + e);
    return c.text('Invalid')
  }
})
app.post('/api/v1/user/signin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono! from blog from signin')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono! from put')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono from blog!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono form bulk!')
})

export default app





/** "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmEwZDFiNzctYWNlMy00NTMyLWEyYzQtZGU0MzQ1NGMzODE0IiwidGVuYW50X2lkIjoiNDc2MDEwYWY0MTNlNmNlZmNlYTlhMDFkZDJjY2Y1MmQwMTNhMmZiYTI3ZjIwODJiNTA0MThkZWZlOWUzMWUxMyIsImludGVybmFsX3NlY3JldCI6IjVhZWQyZTZiLWI4MTktNGU3YS1hY2E0LTJlODMyNjQxNjA0ZCJ9.qNbgt6s9lcz5Nx7B_YT-HgHbvHFcrBQ9jE_cU-8Zqmw" */