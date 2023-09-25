import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name } = req.body;
    const isValid = name;
    if (!isValid) return res.status(400).send("Bad Request");
    const createdSize = await prisma.size.create({
      data: {
        name,
      },
    });
    return res.status(200).send(createdSize);
  } else if (method === "PUT") {
    const { id, name } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingSize = await prisma.size.findFirst({
      where: { id },
    });
    if (!existingSize) return res.status(404).send("Size does not exist");
    const updatedSize = await prisma.size.update({
      where: { id },
      data: { name },
    });
    return res.status(200).send(updatedSize);
  }
  res.status(405).send("Method not allowed");
}
