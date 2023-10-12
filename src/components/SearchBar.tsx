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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import ItemsSelectorToFilter from "./ItemsSelectorToFilter";
import {
  setFilteredProductsByColor,
  setFilteredProductsByGender,
  setFilteredProductsBySize,
  setFilteredProductsByText,
} from "@/store/slices/filteredProductsSlice";

interface ItemsSelectorDefaultValueType {
  id: number;
  name: string;
}

const SearchBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { sizes, products, colors, genders } = useAppSelector(orderAppDatas);

  const dispatch = useAppDispatch();

  const mappedSizes = sizes.map((item) => ({ id: item.id, name: item.name }));

  const mappedColors = colors.map((item) => ({ id: item.id, name: item.name }));

  const mappedGenders = genders.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const [selectedSizes, setSelectedSizes] = useState<
    ItemsSelectorDefaultValueType[]
  >([]);

  const [selectedColors, setSelectedColors] = useState<
    ItemsSelectorDefaultValueType[]
  >([]);

  const [selectedGenders, setSelectedGenders] = useState<
    ItemsSelectorDefaultValueType[]
  >([]);

  const [openColorCollapse, setOpenColorCollapse] = useState(false);

  const [openSizeCollapse, setOpenSizeCollapse] = useState(false);

  const [openGenderCollapse, setOpenGenderCollapse] = useState(false);

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <TextField
        onChange={(event) => {
          const filteredProductsByText = products.filter((item) =>
            item.name
              .toLowerCase()
              .includes(event.target.value.toLocaleLowerCase())
          );
          dispatch(setFilteredProductsByText(filteredProductsByText));
        }}
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
              <Box sx={{ p: "0.5rem" }}>
                <ItemsSelectorToFilter
                  options={mappedSizes}
                  defaultValue={selectedSizes}
                  onChange={(values) => {
                    const selectedSizeIds = values.map((item) => item.id);
                    const filteredProducts = products.filter((product) =>
                      selectedSizeIds.includes(product.sizeId)
                    );
                    setSelectedSizes(values);
                    dispatch(setFilteredProductsBySize(filteredProducts));
                  }}
                  label="Sizes"
                />
              </Box>
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
              <Box sx={{ p: "0.5rem" }}>
                <ItemsSelectorToFilter
                  options={mappedColors}
                  defaultValue={selectedColors}
                  onChange={(values) => {
                    const selectedColorIds = values.map((item) => item.id);
                    const filteredProducts = products.filter((product) =>
                      selectedColorIds.includes(product.colorId)
                    );
                    setSelectedColors(values);
                    dispatch(setFilteredProductsByColor(filteredProducts));
                  }}
                  label="Colors"
                />
              </Box>
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
              <Box sx={{ p: "0.5rem" }}>
                <ItemsSelectorToFilter
                  options={mappedGenders}
                  defaultValue={selectedGenders}
                  onChange={(values) => {
                    const selectedGenderIds = values.map((item) => item.id);
                    const filteredProducts = products.filter((product) =>
                      selectedGenderIds.includes(product.genderId)
                    );
                    setSelectedGenders(values);
                    dispatch(setFilteredProductsByGender(filteredProducts));
                  }}
                  label="Gender"
                />
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default SearchBar;
