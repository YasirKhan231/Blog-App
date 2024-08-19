import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
const app = new Hono()
import {  sign } from 'hono/jwt'
export const userRouter  = new Hono();
import {signinInput, signupInput} from "@100xdevs/medium-common"





userRouter.post('/signup', async (c) => {
  const body = await c.req.json()

  const result = signupInput.safeParse(body);
  if(!result.success) {
return c.json({ error :" validation mistake in input"},400);
  }

  const {username , password , name} = result.data;
  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmEwZDFiNzctYWNlMy00NTMyLWEyYzQtZGU0MzQ1NGMzODE0IiwidGVuYW50X2lkIjoiNDc2MDEwYWY0MTNlNmNlZmNlYTlhMDFkZDJjY2Y1MmQwMTNhMmZiYTI3ZjIwODJiNTA0MThkZWZlOWUzMWUxMyIsImludGVybmFsX3NlY3JldCI6IjVhZWQyZTZiLWI4MTktNGU3YS1hY2E0LTJlODMyNjQxNjA0ZCJ9.qNbgt6s9lcz5Nx7B_YT-HgHbvHFcrBQ9jE_cU-8Zqmw"
  }).$extends(withAccelerate())
 try {
 const existinguser = await prisma.user.findUnique( {
  where :{
    username
  }
 })
  if (existinguser) {
  return c.json({ error  :"user already exist "} , 400);
 }
    const user =  await prisma.user.create({
      data: {
        username,
        password,
        name
      },
    })
    const jwt = await sign({
      id:user.id
    }, "yasirkhan")

    return c.text(jwt);
  
    
  } catch (e) {
    c.status(403)
    console.log("mistake is " + e);
    return c.text('Invalid')
  }
})

userRouter.post('/signin',async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmEwZDFiNzctYWNlMy00NTMyLWEyYzQtZGU0MzQ1NGMzODE0IiwidGVuYW50X2lkIjoiNDc2MDEwYWY0MTNlNmNlZmNlYTlhMDFkZDJjY2Y1MmQwMTNhMmZiYTI3ZjIwODJiNTA0MThkZWZlOWUzMWUxMyIsImludGVybmFsX3NlY3JldCI6IjVhZWQyZTZiLWI4MTktNGU3YS1hY2E0LTJlODMyNjQxNjA0ZCJ9.qNbgt6s9lcz5Nx7B_YT-HgHbvHFcrBQ9jE_cU-8Zqmw"
  }).$extends(withAccelerate())

  const result = await signinInput.safeParse(body);
  if(!result) {
    return c.text("invalid input format ");
  }
   
  
  const user  = await  prisma.user.findFirst({
    where:{
      username: body.username,
      password :body.password
    }
  })
  if(!user) {
    return c.json({e : "user does not exist "}, 400);}

  
    return c.text("user is present in database ");
  
})
