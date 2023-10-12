import type { NextApiRequest, NextApiResponse } from "next";
import * as qrcode from "qrcode";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = require("./shwe-myint-mol-fashion-shop-firebase-adminsdk-es6iq-5ca1888f23.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "shwe-myint-mol-fashion-shop.appspot.com",
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "POST") {
    const { qrCodeFileName, qrCodeData } = req.body;

    const generateQRCode = async (data: string, filename: string) => {
      try {
        const qrCodeDataUrl = await qrcode.toDataURL(data);
        const qrCodeBuffer = Buffer.from(
          qrCodeDataUrl.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        const storage = admin.storage();
        const bucket = storage.bucket();

        await bucket.file(filename).save(qrCodeBuffer, {
          contentType: "image/png",
        });

        const [url] = await bucket.file(filename).getSignedUrl({
          action: "read",
          expires: "01-01-2100",
        });
        return res.status(200).send({ url });
      } catch (error) {
        console.error("Error generating and uploading QR code:", error);
        res.status(500).send("Error generating and uploading QR code");
      }
    };

    return generateQRCode(qrCodeData, qrCodeFileName);
  }
  res.status(405).send("Method now allowed");
}
