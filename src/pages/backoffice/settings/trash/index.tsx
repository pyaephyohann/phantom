import { Box, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import Link from "next/link";

const Trash = () => {
  const trashItems = [
    {
      name: "Products",
      icon: <InventoryIcon sx={{ color: "#fff" }} />,
      href: "/backoffice/settings/trash/products",
    },
    {
      name: "Categories",
      icon: <CategoryIcon sx={{ color: "#fff" }} />,
      href: "/backoffice/settings/trash/categories",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {trashItems.map((item) => {
        return (
          <Link
            style={{ textDecoration: "none" }}
            href={item.href}
            key={item.name}
          >
            <Box
              sx={{
                display: "flex",
                bgcolor: "primary.main",
                py: "0.8rem",
                px: "1rem",
                borderRadius: "0.5rem",
                m: "1rem",
                width: "10rem",
              }}
            >
              {item.icon}
              <Typography sx={{ ml: "0.8rem", color: "#fff" }}>
                {item.name}
              </Typography>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default Trash;
