import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const OrderAppSideBar = ({ open, setOpen }: Props) => {
  const { data } = useSession();

  const user = data?.user;

  const sideBarItems = [
    {
      name: "My Orders",
      icon: <ArticleIcon sx={{ color: "#fff" }} />,
      route: "/order/myOrders",
    },
    {
      name: "Wish List",
      icon: <FavoriteIcon sx={{ color: "#fff" }} />,
      route: "/order/wishList",
    },
    {
      name: "Account",
      icon: <AccountBoxIcon sx={{ color: "#fff" }} />,
      route: "/order/account",
    },
    {
      name: "Settings",
      icon: <SettingsIcon sx={{ color: "#fff" }} />,
      route: "/order/settings",
    },
  ];

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "primary.main",
          color: "#fff",
          px: "2rem",
          pt: "1.2rem",
        }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ p: "0.5rem", bgcolor: "#fff" }}>
            <ArrowBackIosNewIcon color="primary" />
          </IconButton>
        </Box>
        <Link style={{ textDecoration: "none", color: "#fff" }} href={"/"}>
          <Typography
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "2rem",
              mt: "1.5rem",
            }}>
            Shwe Myint Mol
          </Typography>
        </Link>
        {/* user */}
        <Box
          sx={{
            mt: "2rem",
            mb: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {user && (
            <Image
              style={{ borderRadius: "5rem" }}
              alt={user.name as string}
              src={user.image as string}
              width={90}
              height={90}
            />
          )}
          {user && (
            <Typography sx={{ fontSize: "1.2rem", mt: "1.3rem" }}>
              {user.name}
            </Typography>
          )}
        </Box>
        <Box>
          <List>
            {sideBarItems.splice(0, 3).map((item, index) => (
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
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "3rem" }}>
          <IconButton>
            <FacebookIcon color="info" sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton sx={{ mx: "1rem" }}>
            <TelegramIcon color="info" sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton>
            <InstagramIcon color="info" sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default OrderAppSideBar;
