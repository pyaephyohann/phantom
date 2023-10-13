import { CartItem } from "@/store/slices/cartSlice";
import { getCartTotalPrice } from "@/utils/client";
import { prisma } from "@/utils/server";
import { OrderStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { cart, userInformation } = req.body;
    const isValid = cart.length && userInformation;
    if (!isValid) return res.status(400).send("Bad Request");

    const existingUser = await prisma.user.findFirst({
      where: { email: userInformation.userEmail },
    });

    if (!existingUser) return res.status(404).send("User not found");

    const order = await prisma.order.create({
      data: {
        userId: existingUser.id,
        price: getCartTotalPrice(cart),
        address: String(userInformation.address),
        phoneNumber: userInformation.phoneNumber,
      },
    });

    const orderlines = await prisma.$transaction(
      cart.map((item: CartItem) =>
        prisma.orderline.create({
          data: {
            productId: item.product.id,
            orderId: order.id,
            status: OrderStatus.PENDING,
            quantity: item.quantity,
            subTotalPrice: item.subTotal,
          },
        })
      )
    );
    return res.status(200).send({ order, orderlines });
  }
  res.status(405).send("Method not allowed");
}
