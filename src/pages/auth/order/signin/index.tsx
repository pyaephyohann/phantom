import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box sx={{ mt: "8rem", display: "flex", justifyContent: "center" }}>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/order/cart" })}
        variant="contained">
        Sign In with google
      </Button>
    </Box>
  );
};

export default SignIn;
