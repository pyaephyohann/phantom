import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { fetchBackofficeData } from "@/store/slices/backofficeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const BackofficeLayout = ({ children }: Props) => {
  const { data } = useSession();
  const init = useAppSelector((state) => state.backoffice.init);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const waveSupportedPages = [
    "/backoffice/products/[id]",
    "/backoffice/sizes/[id]",
    "/backoffice/colors/[id]",
  ];

  const isWaveSupportedPage = waveSupportedPages.includes(router.pathname);

  useEffect(() => {
    if (data && !init) {
      dispatch(fetchBackofficeData());
    }
  }, [data, dispatch, init]);

  return (
    <Box>
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <TopBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          top: "5rem",
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        {data && <SideBar />}
        <Box
          sx={
            isWaveSupportedPage
              ? {
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                }
              : {
                  p: "1.5rem",
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                }
          }
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
