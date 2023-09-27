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
  }
  res.status(405).send("Method not allowed");
}
