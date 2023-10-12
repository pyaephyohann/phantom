import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import AnimationIcon from "@mui/icons-material/Animation";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";

const BackofficeSideBar = () => {
  const sideBarItems = [
    {
      name: "Orders",
      icon: <ShoppingCartIcon sx={{ color: "#fff" }} />,
      route: "/backoffice/orders",
    },
    {
      name: "Products",
      icon: <InventoryIcon sx={{ color: "#fff" }} />,
      route: "/backoffice/products",
    },
    {
      name: "Categories",
      icon: <CategoryIcon sx={{ color: "#fff" }} />,
      route: "/backoffice/categories",
    },
    {
      name: "Sizes",
      icon: <AnimationIcon sx={{ color: "#fff" }} />,
      route: "/backoffice/sizes",
    },
    {
      name: "Colors",
      icon: <PaletteIcon sx={{ color: "#fff" }} />,
      route: "/backoffice/colors",
    },
    {
      name: "Settings",
      icon: <SettingsIcon sx={{ color: "#fff" }} />,
      route: "/backoffice/settings",
    },
  ];

  return (
    <Box
      sx={{
        width: "13rem",
        height: "100vh",
        bgcolor: "primary.main",
        pt: "0.8rem",
        p: "1rem",
        borderTopRightRadius: "2rem",
        display: { xs: "none", md: "block" },
      }}>
      <List>
        {sideBarItems.splice(0, 5).map((item, index) => (
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            key={item.name}
            href={item.route}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sideBarItems.splice(-1).map((item, index) => (
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            key={item.name}
            href={item.route}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
        <Button
          onClick={() => signOut({ callbackUrl: "/auth/backoffice/signin" })}
          variant="text">
          <Typography
            sx={{
              textAlign: "center",
              px: "1.5rem",
              width: "fit-content",
              color: "white",
            }}>
            Log out
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default BackofficeSideBar;
