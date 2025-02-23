import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseNetworkCalls from "../../hooks/utility/UseNetworkCalls";
import { Box } from "@mui/material";
import TableComponent from "../../assets/Componets/TableComponent";
import BookingSearch from "./BookingSearch";
import { SearchBookingReq } from "./BookingInterface";

const Bookings = () => {
  const columnsSet = [
    { id: "id", label: "ID", numeric: true },
    { id: "status", label: "Status", numeric: true },
    { id: "createdAt", label: "Created At", numeric: false },
    { id: "updatedAt", label: "Updated At", numeric: false },
    { id: "bookingDateFrom", label: "Booking Date From", numeric: false },
    { id: "bookingDateTo", label: "Booking Date To", numeric: false },
    { id: "price", label: "Price", numeric: true },
    { id: "rejectReason", label: "Reject Reason", numeric: false },
    { id: "user_name", label: "User Name", numeric: false },
    { id: "user_id", label: "User ID", numeric: true },
    { id: "service_id", label: "Service ID", numeric: true },
    {
      id: "service_provider_name",
      label: "Service Provider Name",
      numeric: false,
    },
    { id: "serviceProvider_id", label: "Service Provider ID", numeric: true },
    { id: "service_name", label: "Service Name", numeric: false },
  ];

  // Explicitly type the state
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{ [key: string]: any }>({
    userName: "",
  });
  const [open, setOpen] = useState(false);
  const { getAllBookings } = UseNetworkCalls();

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
        const response = await getAllBookings(params);
        setData(response.content);
        console.log(data);

        setTotalRecords(response.totalElements);
      } catch (err: any) {
        if (err.response?.status === 401) {
          alert("system.unAuthorized");
          navigate("/login");
        } else {
          setError("Failed to fetch users.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, [page, rowsPerPage, filters, open]);

  const handleSearch = (newFilters: SearchBookingReq) => {
    setFilters(newFilters);
    setPage(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Box>
        <Box>
          <BookingSearch onSearch={handleSearch} />
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
            showSearch={true}
            showAddButton={true}
          />
        </Box>
      </Box>
    </>
  );
};

export default Bookings;
