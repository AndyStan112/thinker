import { PrismaClient } from '@prisma/client';
import {
  getCurrentExperiece,
  getCurrentExperienceNeeded,
} from '../../../../lib/util';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getStats = async (userId: string) => {
  const { totalExperience, level } = await prisma.stats.findUnique({
    where: { userId: userId },
  });
  return {
    totalExperience: totalExperience,
    currExp: getCurrentExperiece(level, totalExperience),
    nextExp: getCurrentExperienceNeeded(level),
    level: level,
  };
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id as string;
    const stats = await getStats(userId);
    res.status(200).send(stats);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
