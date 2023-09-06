import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        variant="contained"
      >
        SignIn with google
      </Button>
    </Box>
  );
};

export default SignIn;
