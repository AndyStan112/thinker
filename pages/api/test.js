import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const getTotalExperieceNeeded=(level)=>(30*Math.floor(level**2.4))
const getCurrentExperieceNeeded=(level)=>(getTotalExperieceNeeded(level)-getTotalExperieceNeeded(level-1))
const getCurrentExperiece = (level,totalExperience)=>{totalExperience-getTotalExperieceNeeded(level-1)}
const test = async () => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};
const handler = (res, req) => {
  test();
};
export default handler;
