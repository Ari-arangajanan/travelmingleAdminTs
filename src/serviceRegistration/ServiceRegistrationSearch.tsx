import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import SearchFieldProps from "../assets/Componets/SearchFieldProps";

interface searchBarProps {
  onSearch: (filters: { [key: string]: string }) => void; // search by object " [key: string]: string }"
}

const ServiceRegistrationSearch: React.FC<searchBarProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<{ [key: string]: any }>({
    serviceName: "",
    categoryId: "",
    serviceProviderId: "",
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
        label="Service Name"
        query={filters.serviceName}
        onChange={(value) => handleInputChange("userName", value)}
      />
      <SearchFieldProps
        label="Category ID"
        query={filters.categoryId}
        onChange={(value) => handleInputChange("id", value)}
      />
      <SearchFieldProps
        label="Service Provider ID"
        query={filters.serviceProviderId}
        onChange={(value) => handleInputChange("id", value)}
      />
      <Button variant="contained" onClick={handleSearchClick}>
        Filter
      </Button>
    </Box>
  );
};

export default ServiceRegistrationSearch;
