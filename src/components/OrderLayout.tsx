import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrderAppData } from "@/store/slices/orderAppSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrderAppTopBar from "./OrderAppTopBar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  const { data } = useSession();
  const init = useAppSelector((state) => state.orderApp.init);
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !init) {
      dispatch(fetchOrderAppData());
    }
  }, [data, dispatch, init]);

  return (
    <Box>
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 55 }}>
        <OrderAppTopBar />
      </Box>
      {children}
    </Box>
  );
};

export default OrderLayout;
