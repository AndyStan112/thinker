import prisma from "../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id as string;
    await prisma.history.deleteMany({
      where: { userId },
    });
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
