import { Box, Skeleton } from "@mui/material";

const OrderCardSkeletonMobile = () => {
  return (
    <Box
      sx={{
        display: { xs: "block", sm: "block", md: "none" },
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
          <Box sx={{ my: "2rem" }} key={index}>
            <Skeleton
              animation="wave"
              variant="rounded"
              style={{ height: "5.5rem", width: "95%", margin: "0 auto" }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default OrderCardSkeletonMobile;
