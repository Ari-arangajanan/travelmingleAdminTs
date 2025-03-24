import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchServiceReq } from "./ServicesInterface";
import UseNetworkCalls from "../../hooks/utility/UseNetworkCalls";
import ServiceSearch from "./ServiceSearch";
import { Box } from "@mui/material";
import TableComponent from "../../assets/Componets/TableComponent";

const Services = () => {
  const columnsSet = [
    { id: "id", label: "ID", numeric: true },
    { id: "serviceName", label: "Service Name", numeric: false },
    { id: "description", label: "Description", numeric: false },
    { id: "categoryId", label: "Category ID", numeric: true },
    { id: "status", label: "Status", numeric: true },
    { id: "basePrice", label: "Base Price", numeric: true },
    { id: "registrationDate", label: "Registration Date", numeric: false },
    { id: "approvalDate", label: "Approval Date", numeric: false },
    { id: "latitude", label: "Latitude", numeric: true },
    { id: "longitude", label: "Longitude", numeric: true },
    { id: "registeredBy.id", label: "Registered By (ID)", numeric: true },
    {
      id: "registeredBy.userName",
      label: "Registered By (Username)",
      numeric: false,
    },
    { id: "rejectReason", label: "Reject Reason", numeric: false },
  ];

  // Explicitly type the state
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchServiceReq>({
    serviceName: "",
    categoryId: 0,
    serviceProviderId: 0,
  });
  const [open, setOpen] = useState(false);
  const { getAllServices } = UseNetworkCalls();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      // Convert filters to ensure numeric values for telegramId and id
      const params = {
        ...filters,
        page,
        limit: rowsPerPage,
      };
      try {
        // Fetch data
        const response = await getAllServices(params);
        setData(response.content);
        console.log(data);

        setTotalRecords(response.totalElements);
      } catch (err: any) {
        if (err.response?.status === 401) {
          alert("system.unAuthorized");
          navigate("/login");
        } else {
          setError("Failed to fetch service.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, [page, rowsPerPage, filters, open]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Handle Update action
  const handleUpdate = (id: number) => {
    alert(`Update clicked for ID: ${id}`);
  };

  // Handle Delete action
  const handleDelete = async (id: number) => {
    alert(`Delete clicked for ID: ${id}`);
    try {
      // const response = await deleteSysUser({ id });
      // if (response) {
      //   alert("User added successfully!");
      //   setOpen(false); // Close dialog
      //   window.location.reload();
      // } else {
      //   alert(`Failed to delete user: ${response}`);
      // }
    } catch (error: any) {
      console.error("Error adding user:", error);
      alert("An error occurred while deleting the user.");
      if (error.response?.status === 401) {
        alert("system.unAuthorized");
        navigate("/login");
      } else {
        setError("Failed to delete user.");
      }
    }
  };
  const handleSearch = (newFilters: SearchServiceReq) => {
    setFilters(newFilters);
    setPage(0);
  };

  return (
    <>
      <Box>
        <Box>
          <ServiceSearch onSearch={handleSearch} />
        </Box>

        <Box>
          <TableComponent
            columns={columnsSet}
            data={data}
            totalRecords={totalRecords}
            currentPage={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newRowsPerPage) => {
              setRowsPerPage(newRowsPerPage);
              setPage(0); // Reset to the first page when rows per page changes
            }}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            showSearch={true}
            showAddButton={true}
          />
        </Box>
      </Box>
    </>
  );
};

export default Services;
