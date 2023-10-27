import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import OrderAppSideBar from "./OrderAppSideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import ProfilePopOver from "./ProfilePopOver";

const OrderAppTopBar = () => {
  const { data } = useSession();

  const user = data?.user;

  const router = useRouter();

  const { cart } = useAppSelector(orderAppDatas);

  const [open, setOpen] = useState(false);

  const isSigninPage = router.pathname.includes("/signin");

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <AppBar sx={{ p: "0.5rem" }} position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pl: { xs: "0", sm: "0.5rem", md: "0.5rem" },
          }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {data && (
              <IconButton
                onClick={() => setOpen(true)}
                sx={{ mr: { xs: "0", sm: "0", md: "2rem" } }}>
                <MenuIcon sx={{ fontSize: "2rem", color: "white" }} />
              </IconButton>
            )}
            <Link style={{ textDecoration: "none", color: "#fff" }} href={"/"}>
              <Typography
                sx={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "2rem",
                  display: { xs: "none", sm: "none", md: "block" },
                  color: "secondary.main",
                }}>
                Phantom
              </Typography>
            </Link>
          </Box>
          <Box>
            <SearchBar />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                mt: "0.7rem",
                bgcolor: "secondary.main",
                mr: { xs: "0", sm: "0", md: "3rem" },
                p: "0.2rem",
                borderRadius: "5rem",
              }}>
              <IconButton
                onClick={() => router.push("/order/cart")}
                sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "-1rem",
                    right: "-0.3rem",
                    color: "info.main",
                    bgcolor: "secondary.main",
                    borderRadius: "5rem",
                    py: "0.1rem",
                    px: "0.5rem",
                  }}>
                  {cart.length}
                </Typography>
                <ShoppingCartIcon
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
                  }}
                />
              </IconButton>
            </Box>
            {/* user photo */}
            {user ? (
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "block" },
                }}>
                <Button onClick={handleClick}>
                  <Image
                    style={{ borderRadius: "5rem" }}
                    alt={user.name as string}
                    src={user.image as string}
                    width={50}
                    height={50}
                  />
                </Button>
              </Box>
            ) : (
              <Button
                onClick={() => router.push("/auth/order/signin")}
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "1.2rem",
                  display: { xs: "none", sm: "none", md: "block" },
                }}
                variant="text">
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <OrderAppSideBar open={open} setOpen={setOpen} />
      <ProfilePopOver
        id={id}
        open={openProfile}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default OrderAppTopBar;
