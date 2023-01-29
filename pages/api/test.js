import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const test = async () => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};
const handler = (res, req) => {
  test();
};
export default handler;
