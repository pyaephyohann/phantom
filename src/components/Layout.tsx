import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BackofficeLayout from "./BackofficeLayout";
import OrderLayout from "./OrderLayout";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const isBackofficeApp =
    router.pathname.includes("/backoffice") ||
    router.pathname.includes("/auth/backoffice");
  const isOrderApp = router.pathname.includes("/order");

  if (isBackofficeApp) {
    return <BackofficeLayout>{children}</BackofficeLayout>;
  }

  if (isOrderApp) {
    return <OrderLayout>{children}</OrderLayout>;
  }
};

export default Layout;
