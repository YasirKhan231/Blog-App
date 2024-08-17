import z from "zod"

export  const postblog = z.object({
  title : z.string(),
  content : z.string(),
})

export const updateblog  = z.object({
  title : z.string(),
  content : z.string(),
  id : z.number()
})

export const signupSchema = z.object({
  username :z.string().email().min(1 , "username is required"),
  password: z.string().min(6, "password should be 6 letter"),
  name  :z.string().optional()
})
