import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SideBarDrawer from "./SideBarDrawer";
import { useRouter } from "next/router";

const TopBar = () => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;
  const [open, setOpen] = useState(false);

  const getTitle = () => {
    if (router.pathname.includes("products")) return "Products";
  };

  return (
    <Box>
      <AppBar sx={{ p: "0.5rem", bgcolor: "primary.main" }} position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {user && (
              <Box>
                <IconButton
                  onClick={() => setOpen(true)}
                  sx={{ mr: "2rem", display: { sm: "block", md: "none" } }}
                >
                  <MenuIcon
                    sx={{ fontSize: "2rem", color: "white" }}
                    color="primary"
                  />
                </IconButton>
                <SideBarDrawer open={open} setOpen={setOpen} />
              </Box>
            )}
            <Box>
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                href={"/backoffice"}
              >
                <Typography
                  sx={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "2rem",
                  }}
                >
                  Shwe Myint Mol
                </Typography>
              </Link>
            </Box>
          </Box>
          {data ? (
            <Typography
              sx={{
                fontSize: "1.5rem",
                display: { xs: "none", md: "block" },
                color: "#fff",
              }}
            >
              {getTitle()}
            </Typography>
          ) : (
            ""
          )}
          {user ? (
            <Image
              alt={user.name as string}
              src={user.image as string}
              width={50}
              height={50}
              style={{ borderRadius: "5rem" }}
            />
          ) : (
            <Typography></Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
