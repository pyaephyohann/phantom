import { Box, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Backoffice = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/backoffice");
    }
    if (status === "unauthenticated") {
      router.push("/auth/backoffice/signin");
    }
  }, [router, status]);

  return null;
};

export default Backoffice;
