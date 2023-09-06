import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const TopBar = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <Box>
      <AppBar sx={{ p: "0.5rem" }} color="secondary" position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
          <Typography sx={{ fontSize: "1.5rem", color: "text.primary" }}>
            Title
          </Typography>
          {user ? (
            <Image
              alt={user.name as string}
              src={user.image as string}
              width={60}
              height={60}
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
