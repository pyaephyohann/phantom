import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  defaultValue?: Option[];
  onChange: (options: Option[]) => void;
  label: string;
}

const ItemsSelectorToFilter = ({
  options,
  defaultValue,
  onChange,
  label,
}: Props) => {
  return (
    <Autocomplete
      multiple
      defaultValue={defaultValue}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(event, values) => onChange(values as Option[])}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          <Checkbox
            key={option.id}
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default ItemsSelectorToFilter;
