import { PrismaClient } from '@prisma/client';
import {
  getCurrentExperiece,
  getCurrentExperienceNeeded,
} from '../../lib/util';
const prisma = new PrismaClient();

const getStats = async (id) => {
  const { totalExperience, level } = await prisma.stats.findUnique({
    where: { userId: id },
  });
  return {
    curExp: getCurrentExperiece(level, totalExperience),
    nextExp: getCurrentExperienceNeeded(level),
  };
};
const handler = (res, req) => {
  getStats('a').then((e) => console.log(e));
};
export default handler;
