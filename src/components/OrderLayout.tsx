import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrderAppData } from "@/store/slices/orderSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  const { data } = useSession();
  const init = useAppSelector((state) => state.order.init);
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !init) {
      dispatch(fetchOrderAppData());
    }
  }, [data, dispatch, init]);

  return (
    <Box>
      <Box>This is Order Layout</Box>
      {children}
    </Box>
  );
};

export default OrderLayout;
