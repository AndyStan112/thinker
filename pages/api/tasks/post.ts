import prisma from "../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id as string;
    console.log(userId);
    const { title, description, id, experience, questId } = req.body;
    await prisma.task.create({
      data: { title, experience, id, questId, description },
    });
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send("task post error");
  }
};

export default handler;
