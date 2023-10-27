import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const ContactUs = () => {
  const contactDatas = [
    {
      icon: <LocationOnIcon sx={{ fontSize: "2rem" }} color="secondary" />,
      title: "Address",
      content:
        "No(27), Thirimon (5th) Street, Bayint Naung, Mayangone Township, Yangon, Myanmar.",
    },
    {
      icon: <LocalPhoneIcon sx={{ fontSize: "2rem" }} color="secondary" />,
      title: "Phone",
      content: "+959757814509, +959682760037",
    },
    {
      icon: <EmailIcon sx={{ fontSize: "2rem" }} color="secondary" />,
      title: "Email",
      content: "pyaephyohan2200@gmail.com",
    },
  ];

  return (
    <Box sx={{ mt: "7.5rem", px: "2rem" }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Contact Us
      </Typography>
      <Box
        sx={{
          mt: { xs: "3rem", sm: "3rem", md: "4rem" },
          display: { xs: "block", sm: "block", md: "flex" },
          justifyContent: "space-evenly",
        }}>
        {contactDatas.map((contact) => {
          return (
            <Box
              key={contact.title}
              sx={{
                width: { xs: "100%", sm: "100%", md: "30%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: "3rem",
              }}>
              <Box
                sx={{
                  py: "0.5rem",
                  px: "0.6rem",
                  border: "2px solid #F2BE22",
                  borderRadius: "5rem",
                  width: "fit-content",
                  mb: "1.1rem",
                }}>
                {contact.icon}
              </Box>
              <Typography
                sx={{ mb: "1.4rem", fontSize: "1.3rem", fontWeight: "bold" }}>
                {contact.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}>
                {contact.content}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ContactUs;
