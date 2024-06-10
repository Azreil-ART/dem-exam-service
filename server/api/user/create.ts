import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let result: {
    status: boolean;
    data:  any;
  } = {
    status: false,
    data: {},
  };
  try {
    result.data = await prisma.user.create({
      data: body,
    });
    result.status = true;
  } catch (error) {
    result.data = error;
  }
  return result;
})
