import SuccessAlert from "@/components/SuccessAlert";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { updateUser } from "@/store/slices/usersSlice";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const Account = () => {
  const { data } = useSession();
  const user = data?.user;

  const { users } = useAppSelector(orderAppDatas);

  const currentUser = users.find((item) => item.email === user?.email) as User;

  const dispatch = useAppDispatch();

  const [address, setAddress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [successAlertMessage, setSuccessAlertMessage] = useState("");

  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);

  const [isUpdatingPhoneNumber, setIsUpdatingPhoneNumber] = useState(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const isDisabledAddressButton = !address;

  const isDisabledPhoneNumberButton = !phoneNumber;

  const handleUpdateAddress = async () => {
    setIsUpdatingAddress(true);
    const response = await fetch(`${config.apiBaseUrl}/order/users/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.email, address }),
    });
    const updatedUser = await response.json();
    dispatch(updateUser(updatedUser));
    if (currentUser.address) {
      setSuccessAlertMessage("Updated Address");
    } else {
      setSuccessAlertMessage("Added Address");
    }
    setOpenSuccessAlert(true);
    setIsUpdatingAddress(false);
    setAddress("");
  };

  const handleUpdatePhoneNumber = async () => {
    setIsUpdatingPhoneNumber(true);
    const response = await fetch(
      `${config.apiBaseUrl}/order/users/phoneNumber`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.email, phoneNumber }),
      }
    );
    const updatedUser = await response.json();
    dispatch(updateUser(updatedUser));
    if (currentUser.phoneNumber) {
      setSuccessAlertMessage("Updated Phone Number");
    } else {
      setSuccessAlertMessage("Added Phone Number");
    }
    setOpenSuccessAlert(true);
    setIsUpdatingPhoneNumber(false);
    setPhoneNumber("");
  };

  return (
    <Box sx={{ mt: "7rem" }}>
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Account
        </Typography>
      </Box>
      <Box sx={{ mt: "3rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {currentUser ? (
            <Typography variant="h5">
              {currentUser.address
                ? "Your Shipping Address"
                : "Add Your Shipping Address"}
            </Typography>
          ) : (
            ""
          )}
          {currentUser ? (
            <TextField
              multiline
              rows={4}
              defaultValue={currentUser.address ? currentUser.address : ""}
              onChange={(event) => setAddress(event.target.value)}
              sx={{ mb: "1.5rem", mt: "2.5rem" }}
              label="Address"
            />
          ) : (
            ""
          )}
          {currentUser ? (
            <Button
              disabled={isDisabledAddressButton}
              onClick={handleUpdateAddress}
              variant="contained">
              {isUpdatingAddress ? (
                <CircularProgress color="info" />
              ) : currentUser.address ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: "3rem",
          }}>
          {currentUser ? (
            <Typography variant="h5">
              {currentUser.phoneNumber
                ? "Your Phone Number"
                : "Add Your Phone Number"}
            </Typography>
          ) : (
            ""
          )}
          {currentUser ? (
            <TextField
              defaultValue={
                currentUser.phoneNumber ? currentUser.phoneNumber : ""
              }
              onChange={(event) => setPhoneNumber(event.target.value)}
              sx={{ mb: "1.5rem", mt: "2.5rem" }}
              label="Phone Number"
            />
          ) : (
            ""
          )}
          {currentUser ? (
            <Button
              disabled={isDisabledPhoneNumberButton}
              onClick={handleUpdatePhoneNumber}
              variant="contained">
              {isUpdatingPhoneNumber ? (
                <CircularProgress color="info" />
              ) : currentUser.phoneNumber ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Box
        sx={{
          mt: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "3rem",
        }}>
        <Typography sx={{ mb: "1.5rem" }} variant="h5">
          You want to log out?
        </Typography>
        <Button
          onClick={() => signOut({ callbackUrl: "/auth/order/signin" })}
          variant="contained"
          sx={{ textTransform: "none" }}>
          Log out
        </Button>
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message={successAlertMessage}
      />
    </Box>
  );
};

export default Account;
