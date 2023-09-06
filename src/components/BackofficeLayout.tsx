import { Box } from "@mui/material";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const BackofficeLayout = ({ children }: Props) => {
  return (
    <Box>
      <Box>This is backoffice Layout</Box>
      {children}
    </Box>
  );
};

export default BackofficeLayout;
