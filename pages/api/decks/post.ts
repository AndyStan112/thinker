import prisma from "../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    
    const { title, id,creatorId,description,type,tags} = req.body;
    console.log(tags)
    
    await prisma.deck.create({
     data: { title, description, id, creatorId,type,
     tags:{create: tags.map((tag)=>({name:tag}))} } });
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send("quest post error");
  }
};

export default handler;
