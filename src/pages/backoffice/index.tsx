import { Box, Button } from "@mui/material";
import { signOut } from "next-auth/react";

const Backoffice = () => {
  return (
    <Box>
      <Box>Welcome from backoffice guys</Box>
      <Button
        onClick={() => signOut({ callbackUrl: "/auth/backoffice/signin" })}
        variant="contained"
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default Backoffice;
