import { TextField } from "@mui/material";
import React from "react";

interface searchFieldProps {
  label: string;
  query: string;
  onChange: (query: string) => void;
}

const SearchFieldProps: React.FC<searchFieldProps> = ({
  label,
  query,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchFieldProps;
