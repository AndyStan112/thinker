import { PrismaClient } from "@prisma/client";
import { getTotalExperienceNeeded } from "../../../../lib/util";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismadb";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method != "POST")
      res.status(500).send({ message: "Wrong request" });
    const userId = req.query.user_id as string;
    const { id: taskId, title, type, experience } = req.body;
    console.log(userId);
    await prisma.$transaction([
      prisma.history.create({
        data: { userId: userId, source: title, sourceType: type },
      }),
      prisma.task.update({
        data: { finished: true },
        where: { id: taskId },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { experience: { increment: experience } },
      }),
    ]);
    //TODO use if statement to integrate decks in future updates
    //TODO use transactions or nests

    res.status(200).send({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default handler;
