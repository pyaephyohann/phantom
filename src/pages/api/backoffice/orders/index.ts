import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { orderId, status } = req.body;
    const isValid = orderId && status;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingOrder = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!existingOrder) return res.status(404).send("Order not found");
    const validOrderlines = await prisma.orderline.findMany({
      where: { orderId },
    });
    const updatedOrderlines = await prisma.$transaction(
      validOrderlines.map((item) =>
        prisma.orderline.update({
          where: { id: item.id },
          data: { status },
        })
      )
    );
    return res.status(200).send(updatedOrderlines);
  }
  res.status(405).send("Method not allowed");
}
