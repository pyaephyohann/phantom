import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { email, phoneNumber } = req.body;
    const isValid = email && phoneNumber;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser) return res.status(404).send("User not found");
    const updatedUser = await prisma.user.update({
      data: { phoneNumber },
      where: { id: existingUser.id },
    });
    return res.status(200).send(updatedUser);
  }
  res.status(405).send("Method not allowed");
}
