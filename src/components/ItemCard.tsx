import { Box, Card, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  name: string;
  icon: ReactNode;
  subtitle?: string;
  href: string;
}

const ItemCard = ({ icon, name, subtitle, href }: Props) => {
  return (
    <Link style={{ textDecoration: "none" }} href={href}>
      <Paper
        sx={{
          width: "11rem",
          height: "11rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>{icon}</Box>
        <Typography sx={{ my: "1.5rem" }}>{name}</Typography>
        <Typography>{subtitle}</Typography>
      </Paper>
    </Link>
  );
};

export default ItemCard;
