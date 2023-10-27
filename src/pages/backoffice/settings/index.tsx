import { Box, Typography } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Link from "next/link";

const Settings = () => {
  const settingItems = [
    {
      name: "Trash",
      icon: <DeleteSweepIcon sx={{ color: "#F2BE22" }} />,
      href: "/backoffice/settings/trash",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {settingItems.map((item) => {
        return (
          <Link
            style={{ textDecoration: "none" }}
            href={item.href}
            key={item.name}>
            <Box
              key={item.name}
              sx={{
                display: "flex",
                bgcolor: "primary.main",
                py: "0.8rem",
                px: "1rem",
                borderRadius: "0.5rem",
                m: "1rem",
                width: "10rem",
              }}>
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

export default Settings;
