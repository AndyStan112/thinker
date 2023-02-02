import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getTotalExperienceNeeded = (level) => 30 * Math.floor(level ** 2.4);
const getCurrentExperienceNeeded = (level) =>
  getTotalExperienceNeeded(level) - getTotalExperienceNeeded(level - 1);
const getCurrentExperience = (level, totalExperience) =>
  totalExperience - getTotalExperienceNeeded(level - 1);
const getStats = async (id) => {
  const { totalExperience, level } = await prisma.stats.findUnique({
    where: { userId: id },
  });
  return [
    totalExperience,
    getTotalExperienceNeeded(level - 1),
    getCurrentExperience(level),
    getCurrentExperienceNeeded(level, totalExperience),
  ];
};
const handler = (res, req) => {
  getStats("a").then((e) => console.log(e));
};
export default handler;
