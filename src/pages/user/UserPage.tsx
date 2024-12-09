import { Box } from "@mui/material";
import TableComponent from "../../assets/Componets/TableComponent";
import { useEffect, useState } from "react";
import UseNetworkCalls from "../../hooks/utility/UseNetworkCalls";
import { useNavigate } from "react-router-dom";
import UserSearchBar from "./UserSearchBar";

const UserPage = () => {
  // Define the columns
  const columnsSet = [
    { id: "id", label: "Id", numeric: true },
    { id: "telegramId", label: "Telegram Id", numeric: true },
    { id: "userName", label: "User Name", numeric: false },
    { id: "firstName", label: "First Name", numeric: false },
    { id: "lastName", label: "Last Name", numeric: false },
    { id: "email", label: "Email", numeric: false },
    { id: "phone", label: "Phone", numeric: false },
    { id: "updateTime", label: "Update Time", numeric: false },
    { id: "registrationDate", label: "Registration Date", numeric: false },
    { id: "preferredLanguage", label: "Preferred Language", numeric: false },
    { id: "status", label: "Status", numeric: true },
    { id: "type", label: "Type", numeric: true },
  ];

  // Explicitly type the state
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{ [key: string]: any }>({
    telegramId: "",
    userName: "",
    id: "",
  });

  const { getSnUser } = UseNetworkCalls();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      // Convert filters to ensure numeric values for telegramId and id
      const params = {
        ...filters,
        telegramId: filters.telegramId ? Number(filters.telegramId) : undefined,
        id: filters.id ? Number(filters.id) : undefined,
        page,
        limit: rowsPerPage,
      };
      try {
        // Fetch data
        const response = await getSnUser(params);
        setData(response.content);
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
  }, [page, rowsPerPage, filters]); // Dependency array to ensure the effect runs as needed

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Handle Add action
  const handleAdd = () => {
    alert("Add Details clicked");
  };

  // Handle Update action
  const handleUpdate = (id: number) => {
    alert(`Update clicked for ID: ${id}`);
  };

  // Handle Delete action
  const handleDelete = (id: number) => {
    alert(`Delete clicked for ID: ${id}`);
  };

  const handleSearch = (newFilters: { [Key: string]: string }) => {
    setFilters(newFilters);
    setPage(0);
  };

  return (
    <>
      <Box>
        <Box>
          <UserSearchBar onSearch={handleSearch} />
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
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            showSearch={true}
            showAddButton={false}
          />
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
