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
import ProfilePopOver from "./ProfilePopOver";

const TopBar = () => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;
  const [open, setOpen] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const getTitle = () => {
    if (router.pathname === "/backoffice/products/[id]") return "Edit Product";
    if (router.pathname.includes("discountedProducts"))
      return "Discounted Products";
    if (router.pathname.includes("products")) return "Products";
    if (router.pathname === "/backoffice/categories/[id]")
      return "Edit Categories";
    if (router.pathname.includes("categories")) return "Categories";
    if (router.pathname === "/backoffice/sizes/[id]") return "Edit Size";
    if (router.pathname.includes("sizes")) return "Sizes";
    if (router.pathname === "/backoffice/colors/[id]") return "Edit Color";
    if (router.pathname.includes("colors")) return "Colors";
    if (router.pathname.includes("settings")) return "Settings";
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
              onClick={() => setOpenProfile(true)}
              alt={user.name as string}
              src={user.image as string}
              width={50}
              height={50}
              style={{ borderRadius: "5rem", cursor: "pointer" }}
            />
          ) : (
            <Typography></Typography>
          )}
        </Toolbar>
      </AppBar>
      <ProfilePopOver open={openProfile} setOpen={setOpenProfile} />
    </Box>
  );
};

export default TopBar;
