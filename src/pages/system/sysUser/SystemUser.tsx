import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UseNetworkCalls from "../../../hooks/utility/UseNetworkCalls";
import SysUserSearch from "./SysUserSearch";
import { Box } from "@mui/material";
import TableComponent from "../../../assets/Componets/TableComponent";
import AddSysUser from "./AddSysUser";

const SystemUser = () => {
  // Define the columns
  const columnsSet = [
    { id: "id", label: "Id", numeric: true },
    { id: "username", label: "User Name", numeric: false },
    { id: "email", label: "Email", numeric: false },
    { id: "phone", label: "Phone", numeric: true },
    { id: "avatar", label: "avatar", numeric: false },
    { id: "create_time", label: "Registration Date", numeric: false },
    { id: "updateTime", label: "Update Time", numeric: false },
    { id: "status", label: "Status", numeric: true },
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
  const { getSysUser } = UseNetworkCalls();

  const [open, setOpen] = useState(false);

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
        const response = await getSysUser(params);
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
    // alert("Add Details clicked");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (data: { name: string; email: string }) => {
    alert(data);
    console.log("----------------d", data);

    setOpen(false);
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
          <SysUserSearch onSearch={handleSearch} />
        </Box>
        <AddSysUser
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
        />
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
            showAddButton={true}
          />
        </Box>
      </Box>
    </>
  );
};

export default SystemUser;
