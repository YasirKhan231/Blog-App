import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs';
import z from 'zod';
const app = new Hono()
import { decode, sign, verify } from 'hono/jwt'
export const userRouter  = new Hono();


const signupSchema = z.object({
  username :z.string().min(1 , "username is required"),
  password: z.string().min(6, "password should be 6 letter"),
  name  :z.string().optional()
})


userRouter.post('/signup', async (c) => {
  const body = await c.req.json()

  const result = signupSchema.safeParse(body);
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

  
  const salt = await bcrypt.genSalt(10)
  const hashpassword = await bcrypt.hash(password , salt) 
  
  
    const user =  await prisma.user.create({
      data: {
        username,
        password: hashpassword,
        name
      },
    })
    const jwt = await sign({
      id:user.id
    }, "yasirkhan")

    return c.text('Jwt :-' +jwt);
  
    
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
  
  const user  = await  prisma.user.findFirst({
    where:{
      username: body.username,
    }
  })
  if(!user) {
    return c.json({e : "user does not exist "}, 400);}

    const comparepasswoed = await bcrypt.compare(body.password ,  user.password)
    if(!comparepasswoed) {
      return c.text(" password is incorrect ");
    }
  
    return c.text("user is present in database ");
  
})
