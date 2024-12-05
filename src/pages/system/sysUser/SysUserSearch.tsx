import React, { useState } from "react";
import SearchFieldProps from "../../../assets/Componets/SearchFieldProps";
import { Box, Button } from "@mui/material";

interface searchBarProps {
  onSearch: (filters: { [key: string]: string }) => void; // search by object " [key: string]: string }"
}

const SysUserSearch: React.FC<searchBarProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<{ [key: string]: any }>({
    userName: "",
    id: "",
  });

  const handleInputChange = (field: string, value: any) => {
    const xObj = (prev: { [key: string]: any }) => ({
      ...prev,
      [field]: field === "id" ? value.replace(/\D/g, "") : value, // Allow only numeric input
    });
    setFilters(xObj);
  };
  const handleSearchClick = () => {
    onSearch(filters);
  };

  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      <SearchFieldProps
        label="User Name"
        query={filters.userName}
        onChange={(value) => handleInputChange("userName", value)}
      />
      <SearchFieldProps
        label="ID"
        query={filters.id}
        onChange={(value) => handleInputChange("id", value)}
      />
      <Button variant="contained" onClick={handleSearchClick}>
        Filter
      </Button>
    </Box>
  );
};

export default SysUserSearch;
