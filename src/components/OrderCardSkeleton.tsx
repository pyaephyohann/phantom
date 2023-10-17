import { Skeleton } from "@mui/material";

const OrderCardSkeleton = () => {
  return (
    <Skeleton animation="wave" variant="rounded" width={180} height={180} />
  );
};

export default OrderCardSkeleton;
