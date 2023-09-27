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
    const createdColor = await prisma.color.create({
      data: { name },
    });
    return res.status(200).send(createdColor);
  } else if (method === "PUT") {
    const { id, name } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingColor = await prisma.color.findFirst({
      where: { id },
    });
    if (!existingColor) return res.status(404).send("Color does not exist");
    const updatedColor = await prisma.color.update({
      where: { id },
      data: { name },
    });
    return res.status(200).send(updatedColor);
  }
  res.status(405).send("Method not allowed");
}
