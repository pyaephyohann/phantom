import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { orderlineId, status } = req.body;
    const isValid = orderlineId && status;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingOrderline = await prisma.orderline.findFirst({
      where: { id: orderlineId },
    });
    if (!existingOrderline)
      return res.status(404).send("Orderline does not exist");
    const updatedOrderline = await prisma.orderline.update({
      where: { id: orderlineId },
      data: { status },
    });
    return res.status(200).send(updatedOrderline);
  }
  res.status(405).send("Method now allowed");
}
