import prisma from "../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const skip=Number(req.query.skip)
    const decks = await prisma.deck.findMany({take:10,skip,include:{tags:true}});
    res.status(200).send(decks);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
