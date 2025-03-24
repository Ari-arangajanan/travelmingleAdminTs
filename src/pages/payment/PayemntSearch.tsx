import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import SearchFieldProps from "../../assets/Componets/SearchFieldProps";
import { PaymentDetailsRequest } from "./PaymentInterface";

interface SearchBarProps {
  onSearch: (filters: PaymentDetailsRequest) => void; // search by object " [key: string]: string }"
}

const PayemntSearch: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<PaymentDetailsRequest>({
    orderId: "",
  });

  const handleInputChange = (
    req: keyof PaymentDetailsRequest,
    value: string
  ) => {
    const xObj = (prev: PaymentDetailsRequest) => ({
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
          label="Order Id"
          query={filters.orderId || ""}
          onChange={(value) => handleInputChange("orderId", value)}
        />
        <Button variant="contained" onClick={handleSearchClick}>
          Filter
        </Button>
      </Box>
    </>
  );
};

export default PayemntSearch;
