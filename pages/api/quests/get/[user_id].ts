import prisma from "../../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user_id = req.query.user_id as string;
    console.log(user_id);
    const quests = await prisma.quest.findMany({
      where: { userId: user_id },
      include: { tasks: true },
    });
    res.status(200).send(quests);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
