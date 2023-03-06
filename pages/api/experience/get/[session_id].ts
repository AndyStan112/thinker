import { PrismaClient } from '@prisma/client';
import {
  getCurrentExperiece,
  getCurrentExperienceNeeded,
} from '../../../../lib/util';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getStats = async (id: string) => {
  const { totalExperience, level } = await prisma.stats.findUnique({
    where: { userId: id },
  });
  return {
    curExp: getCurrentExperiece(level, totalExperience),
    nextExp: getCurrentExperienceNeeded(level),
    level: level,
  };
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session_id = req.query.session_id as string;
    const stats = await getStats(session_id);
    res.status(200).send(stats);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
