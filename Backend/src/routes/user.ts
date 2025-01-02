import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
const app = new Hono()
import {  sign } from 'hono/jwt'
import * as dotenv from 'dotenv';
dotenv.config();  // Loads .env file into process.env

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
    datasourceUrl: process.env.datasourceUrl
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
    return c.text(`Invalid is this schema + ${e} `)
  }
})

userRouter.post('/signin',async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: process.env.datasourceUrl
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
