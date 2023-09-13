import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { fetchBackofficeData } from "@/store/slices/backofficeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const BackofficeLayout = ({ children }: Props) => {
  const { data } = useSession();
  const init = useAppSelector((state) => state.backoffice.init);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !init) {
      dispatch(fetchBackofficeData());
    }
  }, [data, dispatch, init]);

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
