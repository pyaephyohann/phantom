import { Box } from "@mui/material";
import TopBar from "./TopBar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const BackofficeLayout = ({ children }: Props) => {
  return (
    <Box>
      <TopBar />
      {children}
    </Box>
  );
};

export default BackofficeLayout;
