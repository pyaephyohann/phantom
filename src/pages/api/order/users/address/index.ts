import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { email, address } = req.body;
    const isValid = email && address;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser) return res.status(404).send("User not found");
    const updatedUser = await prisma.user.update({
      data: { address },
      where: { id: existingUser.id },
    });
    return res.status(200).send(updatedUser);
  }
  res.status(405).send("Method not allowed");
}
