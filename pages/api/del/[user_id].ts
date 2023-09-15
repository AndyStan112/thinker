import prisma from "../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id as string;
    console.log("deleting")
    await prisma.deck.deleteMany();
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
