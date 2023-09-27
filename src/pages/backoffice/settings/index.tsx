import { Box, Typography } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Link from "next/link";

const Settings = () => {
  const settingItems = [
    {
      name: "Trash",
      icon: <DeleteSweepIcon sx={{ color: "#fff" }} />,
      href: "/backoffice/settings/trash",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {settingItems.map((item) => {
        return (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              bgcolor: "primary.main",
              py: "0.8rem",
              px: "1rem",
              borderRadius: "0.5rem",
              m: "1rem",
              width: { xs: "100%", sm: "fit-content" },
            }}
          >
            <Link
              style={{ textDecoration: "none", display: "flex" }}
              href={item.href}
            >
              {item.icon}
              <Typography sx={{ ml: "0.8rem", color: "#fff" }}>
                {item.name}
              </Typography>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default Settings;
