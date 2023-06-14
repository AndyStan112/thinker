import prisma from "../../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user_id = req.query.user_id as string;
    console.log(user_id);
    const events = await prisma.history.findMany({
      where: { userId: user_id },
      orderBy: { date: "desc" },
    });
    console.log(events);
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default handler;
