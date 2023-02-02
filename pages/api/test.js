import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const test1 = async () => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};
const levelToExperiece = (level) =>
  10 + 10 * level + Math.floor(30 * level ** 2.3);
const test = [1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 18, 19, 20];

export default function handler({ res, req }) {
  test.forEach((e) => {
    console.log(e, levelToExperiece(e));
  });
}
