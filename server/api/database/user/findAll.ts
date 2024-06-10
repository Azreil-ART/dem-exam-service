import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {
  const result: {
    data: any;
    error: any;
  } = {
    data: null,
    error: null,
  }
  try {
    result.data = await prisma.user.findMany(); 
  } catch (error) {
    result.error = error
  }
  return result
})
