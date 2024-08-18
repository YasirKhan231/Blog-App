import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import {createBlogInput, updateBlogInput} from "@100xdevs/medium-common"
export const  blogRouter=  new Hono<{
  Bindings: {}; // Your bindings if any
  Variables: {
    userId: string; // Ensure 'userId' is correctly defined here
  };
}>();



blogRouter.use('/*', async(c,next)=>{
  const authheader = await c.req.header("authorization") || "";
   const user = await verify(authheader ,"yasirkhan" )
   if(user){
    c.set("userId", user.id as string)
    await next()
   } else {
    c.status(403);
    return c.json({msg:"you are not login"})
   }
})

blogRouter.post('/',async (c) => {
  const  authorId = c.get("userId")
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmEwZDFiNzctYWNlMy00NTMyLWEyYzQtZGU0MzQ1NGMzODE0IiwidGVuYW50X2lkIjoiNDc2MDEwYWY0MTNlNmNlZmNlYTlhMDFkZDJjY2Y1MmQwMTNhMmZiYTI3ZjIwODJiNTA0MThkZWZlOWUzMWUxMyIsImludGVybmFsX3NlY3JldCI6IjVhZWQyZTZiLWI4MTktNGU3YS1hY2E0LTJlODMyNjQxNjA0ZCJ9.qNbgt6s9lcz5Nx7B_YT-HgHbvHFcrBQ9jE_cU-8Zqmw"
  }).$extends(withAccelerate())
  const result = createBlogInput.safeParse(body);
  if(!result) {
    c.status(403);
     return c.text(" Invalid input ");
  }
   else {

  const blog = await prisma.blog.create({
    data:{
      title : body.title,
    content : body.content,
    authorId : Number(authorId)
    }
  })



  return c.json({
    id:blog.id
  })
}
})

blogRouter.put('/',async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmEwZDFiNzctYWNlMy00NTMyLWEyYzQtZGU0MzQ1NGMzODE0IiwidGVuYW50X2lkIjoiNDc2MDEwYWY0MTNlNmNlZmNlYTlhMDFkZDJjY2Y1MmQwMTNhMmZiYTI3ZjIwODJiNTA0MThkZWZlOWUzMWUxMyIsImludGVybmFsX3NlY3JldCI6IjVhZWQyZTZiLWI4MTktNGU3YS1hY2E0LTJlODMyNjQxNjA0ZCJ9.qNbgt6s9lcz5Nx7B_YT-HgHbvHFcrBQ9jE_cU-8Zqmw"
  }).$extends(withAccelerate())

  const result = updateBlogInput.safeParse(body);
  if (!result) {
    c.status(403);
    return c.text("Invalid input")
  }


  const blog = await prisma.blog.update({
    where:{
      id:body.id,
    },
    data:{
      title : body.title,
    content : body.content
    }
  })

  return c.json({
    id:blog.id
  })
})


blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmEwZDFiNzctYWNlMy00NTMyLWEyYzQtZGU0MzQ1NGMzODE0IiwidGVuYW50X2lkIjoiNDc2MDEwYWY0MTNlNmNlZmNlYTlhMDFkZDJjY2Y1MmQwMTNhMmZiYTI3ZjIwODJiNTA0MThkZWZlOWUzMWUxMyIsImludGVybmFsX3NlY3JldCI6IjVhZWQyZTZiLWI4MTktNGU3YS1hY2E0LTJlODMyNjQxNjA0ZCJ9.qNbgt6s9lcz5Nx7B_YT-HgHbvHFcrBQ9jE_cU-8Zqmw"
  }).$extends(withAccelerate())
  const blog = await prisma.blog.findMany({ })
  return c.json({
    blog
  })
})


blogRouter.get('/:id',async (c) => {
  const id =  c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmEwZDFiNzctYWNlMy00NTMyLWEyYzQtZGU0MzQ1NGMzODE0IiwidGVuYW50X2lkIjoiNDc2MDEwYWY0MTNlNmNlZmNlYTlhMDFkZDJjY2Y1MmQwMTNhMmZiYTI3ZjIwODJiNTA0MThkZWZlOWUzMWUxMyIsImludGVybmFsX3NlY3JldCI6IjVhZWQyZTZiLWI4MTktNGU3YS1hY2E0LTJlODMyNjQxNjA0ZCJ9.qNbgt6s9lcz5Nx7B_YT-HgHbvHFcrBQ9jE_cU-8Zqmw"
  }).$extends(withAccelerate())

  try{  
  const blog = await prisma.blog.findFirst({
    where:{
      id: Number(id)
    }
  })
  return c.json({
    blog
  })
}
catch(e){
  return c.json({error:"error is this "}, 403)
}
})
