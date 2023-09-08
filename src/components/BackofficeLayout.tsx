import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const BackofficeLayout = ({ children }: Props) => {
  const { data } = useSession();
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex" }}>
        {data && <SideBar />}
        <Box sx={{ p: "1.5rem" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
