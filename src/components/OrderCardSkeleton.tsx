import { Box, Skeleton } from "@mui/material";

const OrderCardSkeleton = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "none", md: "flex" },
        flexWrap: "wrap",
        mt: "1rem",
        justifyContent: {
          xs: "center",
          sm: "center",
          md: "flex-start",
        },
      }}>
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ].map((index) => {
        return (
          <Box sx={{ m: "1rem" }} key={index}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={180}
              height={180}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default OrderCardSkeleton;
