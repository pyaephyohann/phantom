import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  imageUrl: string;
  price: number;
  genderId: number;
  href: string;
}

const BackofficeProductCard = ({
  name,
  imageUrl,
  price,
  genderId,
  href,
}: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          py: "1rem",
          px: "1.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <Image
          style={{ borderRadius: "0.5rem", marginBottom: "0.5rem" }}
          alt={name}
          src={imageUrl}
          width={180}
          height={180}
        />
        <Box sx={{ pl: "0.2rem" }}>
          <Typography sx={{ my: "0.7rem" }}>{name}</Typography>
          <Typography sx={{ mb: "0.7rem" }}>{price} Ks</Typography>
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
