import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import SearchFieldProps from "../../assets/Componets/SearchFieldProps";
import { SearchCategoryReq } from "./ServiceCategoryInterface";

interface SearchBarProps {
  onSearch: (filters: SearchCategoryReq) => void; // search by object " [key: string]: string }"
}

const CategorySearch: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchCategoryReq>({
    categoryName: "",
  });

  const handleInputChange = (req: keyof SearchCategoryReq, value: string) => {
    const xObj = (prev: SearchCategoryReq) => ({
      ...prev,
      [req]: value,
    });

    setFilters(xObj);
  };

  const handleSearchClick = () => {
    onSearch(filters);
  };

  return (
    <>
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <SearchFieldProps
          label="Category Name"
          query={filters.categoryName}
          onChange={(value) => handleInputChange("categoryName", value)}
        />
        <Button variant="contained" onClick={handleSearchClick}>
          Filter
        </Button>
      </Box>
    </>
  );
};

export default CategorySearch;
