import { PrismaClient } from "@prisma/client";
import {
  getCurrentExperiece,
  getCurrentExperienceNeeded,
} from "../../../../lib/util";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id as string;
    const { experience } = await prisma.user.findUnique({
      where: { id: userId },
    });
    res.status(200).send({ experience });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
