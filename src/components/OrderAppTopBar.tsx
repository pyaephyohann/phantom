import {
  AppBar,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import OrderAppSideBar from "./OrderAppSideBar";

const OrderAppTopBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <AppBar sx={{ p: "0.5rem" }} position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ mr: { xs: "0", sm: "0", md: "2rem" } }}>
              <MenuIcon sx={{ fontSize: "2rem", color: "white" }} />
            </IconButton>
            <Link style={{ textDecoration: "none", color: "#fff" }} href={"/"}>
              <Typography
                sx={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "2rem",
                  display: { xs: "none", sm: "none", md: "block" },
                }}>
                Shwe Myint Mol
              </Typography>
            </Link>
          </Box>
          <Box>
            <TextField
              color="info"
              sx={{
                width: { xs: "15rem", sm: "15rem", md: "20rem" },
              }}
              InputProps={{
                sx: {
                  borderRadius: "10rem",
                  height: "3rem",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                bgcolor: "secondary.main",
                mr: { xs: "0", sm: "0", md: "3rem" },
                p: "0.2rem",
                borderRadius: "5rem",
              }}>
              <IconButton sx={{ position: "relative" }}>
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
                  0
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
            <Box
              sx={{
                width: "3rem",
                height: "3rem",
                bgcolor: "white",
                borderRadius: "5rem",
                display: { xs: "none", sm: "none", md: "block" },
              }}></Box>
          </Box>
        </Toolbar>
      </AppBar>
      <OrderAppSideBar open={open} setOpen={setOpen} />
    </Box>
  );
};

export default OrderAppTopBar;
