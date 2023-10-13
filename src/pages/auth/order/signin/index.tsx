import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box sx={{ mt: "7rem" }}>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        variant="contained">
        Sign In with google
      </Button>
    </Box>
  );
};

export default SignIn;
