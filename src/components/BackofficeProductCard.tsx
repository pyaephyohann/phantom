import { Box, Card, Chip, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  imageUrl: string;
  price: number;
  genderId: number;
  href: string;
  discountPrice: number;
}

const BackofficeProductCard = ({
  name,
  imageUrl,
  price,
  genderId,
  href,
  discountPrice,
}: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          py: "1rem",
          px: "1.5rem",
          borderRadius: "0.5rem",
          position: "relative",
        }}
      >
        {discountPrice ? (
          <Chip
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              color: "white",
            }}
            label="Discount"
            color="secondary"
          />
        ) : (
          ""
        )}
        <Image
          style={{ borderRadius: "0.5rem", marginBottom: "0.5rem" }}
          alt={name}
          src={imageUrl}
          width={180}
          height={180}
        />
        <Box sx={{ pl: "0.2rem" }}>
          <Typography sx={{ my: "0.7rem" }}>{name}</Typography>
          <Box sx={{ mb: "0.5rem" }}>
            {discountPrice ? (
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ textDecoration: "line-through", mr: "0.5rem" }}
                >
                  {price} Ks
                </Typography>
                <Typography>{discountPrice} Ks</Typography>
              </Box>
            ) : (
              <Typography>{price} Ks</Typography>
            )}
          </Box>
          <Box>
            {genderId === 4 && <Typography>For Male</Typography>}
            {genderId === 5 && <Typography>For Female</Typography>}
            {genderId === 6 && <Typography>Non-binary</Typography>}
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

export default BackofficeProductCard;
