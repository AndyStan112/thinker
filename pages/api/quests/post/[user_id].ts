import prisma from "../../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id as string;
    console.log(userId);
    const { title, id, experience } = req.body;
    await prisma.quest.create({ data: { title, experience, id, userId } });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("quest post error");
  }
};

export default handler;
