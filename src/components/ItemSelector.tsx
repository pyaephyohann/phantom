import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  defaultValue?: Option;
  label: string;
  onChange: (value: number) => void;
}

const ItemSelector = ({ options, label, onChange, defaultValue }: Props) => {
  return (
    <Box sx={{ minWidth: "20rem" }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          defaultValue={defaultValue?.id}
          label={label}
          onChange={(event) => onChange(event.target.value as number)}
        >
          {options.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ItemSelector;
