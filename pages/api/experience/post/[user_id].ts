import { PrismaClient } from '@prisma/client';
import { getTotalExperienceNeeded } from '../../../../lib/util';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const updateStats = async (userId: string, experience: number) => {
  let { totalExperience, level } = await prisma.stats.findUnique({
    where: { userId: userId },
  });
  totalExperience += experience;
  while (totalExperience > getTotalExperienceNeeded(level)) {
    level++;
  }
  await prisma.stats.update({
    data: { totalExperience: totalExperience, level: level },
    where: { userId: userId },
  });
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method != 'POST')
      res.status(500).send({ message: 'Wrong request' });
    const userId = req.query.user_id as string;
    const { id, title, type, experience } = req.body;
    console.log(userId);
    await prisma.history.create({
      data: { userId: userId, source: title, sourceType: type },
    });
    //use if statement to integrate decks in future updates
    await prisma.task.update({ data: { finished: true }, where: { id: id } });
    await updateStats(userId, experience);

    res.status(200).send({ message: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default handler;
