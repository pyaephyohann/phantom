import { Box, Divider, Popover, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ProfilePopOver = ({ open, setOpen }: Props) => {
  const { data } = useSession();

  const user = data?.user;

  return (
    <Popover
      sx={{ mt: "3.5rem" }}
      open={open}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Box sx={{ p: "1rem", width: "20rem" }}>
        {/* show user */}

        {user && (
          <Box>
            {/* show user image and name */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                style={{ borderRadius: "20rem", marginRight: "1rem" }}
                width={40}
                height={40}
                alt={user.name as string}
                src={user.image as string}
              />
              <Typography>{user.name}</Typography>
            </Box>
            <Divider sx={{ my: "0.8rem" }} />
            <Typography>{user.email}</Typography>
          </Box>
        )}
      </Box>
    </Popover>
  );
};

export default ProfilePopOver;
