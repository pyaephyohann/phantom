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
import { Drawer, IconButton, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const BackofficeSideBarDrawer = ({ open, setOpen }: Props) => {
  const { data } = useSession();
  const user = data?.user;

  const sideBarItems = [
    {
      name: "Orders",
      icon: <ShoppingCartIcon color="primary" />,
      route: "/backoffice/orders",
    },
    {
      name: "Products",
      icon: <InventoryIcon color="primary" />,
      route: "/backoffice/products",
    },
    {
      name: "Categories",
      icon: <CategoryIcon color="primary" />,
      route: "/backoffice/categories",
    },
    {
      name: "Sizes",
      icon: <AnimationIcon color="primary" />,
      route: "/backoffice/sizes",
    },
    {
      name: "Colors",
      icon: <PaletteIcon color="primary" />,
      route: "/backoffice/colors",
    },
    {
      name: "Settings",
      icon: <SettingsIcon color="primary" />,
      route: "/backoffice/settings",
    },
  ];

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "secondary.main",
          color: "text.primary",
          px: "1rem",
          pt: "1.5rem",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "1rem",
          }}>
          {user && (
            <Image
              style={{ borderRadius: "5rem" }}
              src={user.image as string}
              alt={user.name as string}
              width={50}
              height={50}
            />
          )}
          <IconButton onClick={() => setOpen(false)}>
            <CancelIcon sx={{ fontSize: "2rem", color: "primary.main" }} />
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

export default BackofficeSideBarDrawer;
