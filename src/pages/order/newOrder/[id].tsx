import { config } from "@/config";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const NewOrder = () => {
  const router = useRouter();
  const orderId = Number(router.query.id);

  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const [isGeneratingQrCode, setIsGeneratingQrCode] = useState(false);

  const qrCodeData = `https://shwemyintmol.vercel.app/order/myOrders/${orderId}`;

  const qrCodeFileName = `shwemyintmolfashionshoporder${orderId}.png`;

  const generateQrCode = async () => {
    setIsGeneratingQrCode(true);
    const response = await fetch(`${config.apiBaseUrl}/assets/qrCodeUpload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qrCodeFileName, qrCodeData }),
    });
    const responseJson = await response.json();
    setQrCodeUrl(responseJson.url);
    setIsGeneratingQrCode(false);
  };

  useEffect(() => {
    if (orderId) {
      generateQrCode();
    }
  }, [orderId]);

  const [isCopied, setIsCopied] = useState(false);
  const textRef = useRef<HTMLInputElement | null>(null);

  const handleCopyClick = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      setIsCopied(true);
    }
  };

  return (
    <Box sx={{ mt: { xs: "6.5rem", sm: "6.5rem", md: "8rem" }, p: "1rem" }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Thank you for your order!
      </Typography>
      <Box sx={{ mt: "2.5rem" }}>
        {isGeneratingQrCode ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "primary.main",
              width: "fit-content",
              mx: "auto",
              p: "1rem",
              borderRadius: "1rem",
            }}>
            <CircularProgress color="info" />
            <Typography sx={{ ml: "1.3rem", color: "info.main" }} variant="h5">
              Generating QR Code
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: "1.5rem",
              bgcolor: "primary.main",
              width: "fit-content",
              mx: "auto",
              borderRadius: "1.5rem",
            }}>
            <img
              style={{ height: "15rem", borderRadius: "1rem" }}
              src={`${qrCodeUrl}`}
              alt={qrCodeUrl}
            />
            <Typography
              sx={{
                color: "info.main",
                textAlign: "center",
                fontSize: "1.3rem",
                mt: "1rem",
              }}>
              Shwe Myint Mol
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ mb: "3rem" }}>
        <input
          type="text"
          value={qrCodeData}
          ref={textRef}
          readOnly
          style={{ position: "absolute", left: "-999rem" }}
        />
        <Box
          sx={{
            width: "15rem",
            bgcolor: "primary.main",
            borderRadius: "1rem",
            mx: "auto",
            p: "0.6rem",
            mt: "2.5rem",
            display: "flex",
            justifyContent: "center",
          }}>
          <Button
            onClick={handleCopyClick}
            color="info"
            variant="text"
            sx={{
              textTransform: "none",
              fontSize: "1.2rem",
            }}>
            {isCopied ? "Copied" : "Copy Link"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewOrder;
