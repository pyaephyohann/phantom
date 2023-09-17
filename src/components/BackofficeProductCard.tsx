import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  name: string;
  imageUrl: string;
  price: number;
  genderId: number;
}

const BackofficeProductCard = ({ name, imageUrl, price, genderId }: Props) => {
  return (
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
  );
};

export default BackofficeProductCard;
