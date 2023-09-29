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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Drawer, IconButton, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SideBarDrawer = ({ open, setOpen }: Props) => {
  const { data } = useSession();
  const user = data?.user;

  const sideBarItems = [
    {
      name: "Orders",
      icon: <AddShoppingCartIcon sx={{ color: "#fff" }} />,
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
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "primary.main",
          color: "text.primary",
          px: "1rem",
          pt: "1.2rem",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "0.5rem",
          }}>
          {user && (
            <Image
              style={{ borderRadius: "5rem" }}
              src={user.image as string}
              alt={user.name as string}
              width={40}
              height={40}
            />
          )}
          <IconButton onClick={() => setOpen(false)}>
            <CancelIcon sx={{ fontSize: "1.8rem", color: "white" }} />
          </IconButton>
        </Box>
        <List>
          {sideBarItems.splice(0, 5).map((item, index) => (
            <Link
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none", color: "white" }}
              href={item.route}
              key={item.name}>
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
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none", color: "white" }}
              href={item.route}
              key={item.name}>
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
    </Drawer>
  );
};

export default SideBarDrawer;
