import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const SearchBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openColorCollapse, setOpenColorCollapse] = useState(false);

  const [openSizeCollapse, setOpenSizeCollapse] = useState(false);

  const [openGenderCollapse, setOpenGenderCollapse] = useState(false);

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <TextField
        placeholder="Explore clothings"
        focused
        color="info"
        sx={{
          color: "info.main",
          width: { xs: "15rem", sm: "15rem", md: "20rem" },
        }}
        InputProps={{
          sx: {
            borderRadius: "10rem",
            height: "3rem",
            color: "#fff",
          },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon color="info" />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <ExpandMoreIcon color="info" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Box sx={{ p: "1rem", width: "12rem" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography>Filter with size</Typography>
              <IconButton
                onClick={() => setOpenSizeCollapse(!openSizeCollapse)}>
                {openSizeCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={openSizeCollapse} timeout="auto" unmountOnExit>
              <Box>halo size</Box>
            </Collapse>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography>Filter with color</Typography>
              <IconButton
                onClick={() => setOpenColorCollapse(!openColorCollapse)}>
                {openColorCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={openColorCollapse} timeout="auto" unmountOnExit>
              <Box>halo color</Box>
            </Collapse>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography>Filter with gender</Typography>
              <IconButton
                onClick={() => setOpenGenderCollapse(!openGenderCollapse)}>
                {openGenderCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={openGenderCollapse} timeout="auto" unmountOnExit>
              <Box>halo gender</Box>
            </Collapse>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default SearchBar;
