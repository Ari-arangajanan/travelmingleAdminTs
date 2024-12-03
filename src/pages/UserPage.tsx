import { Box, Typography } from "@mui/material";
import TableComponent from "../assets/Componets/TableComponent";
import { useEffect, useState } from "react";
import UseNetworkCalls from "../hooks/utility/UseNetworkCalls";
import { UserListRequest, UserListResponse } from "./user/User";

interface Column {
  id: string;
  label: string;
  numeric: boolean;
}

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
  const [columns, setColumns] = useState<Column[]>(columnsSet);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  // Function to map response data to table data
  const mapDataToColumns = (
    data: UserListResponse["content"],
    columns: Column[]
  ) => {
    return data.map((record) => {
      const mappedRecord: Record<string, any> = {};
      columns.forEach((columnToFetch) => {
        // Ensure the column ID matches a key in the record and assign the value or a default
        mappedRecord[columnToFetch.id] =
          record[columnToFetch.id as keyof typeof record] ?? "";
      });
      return mappedRecord;
    });
  };

  // Define the data
  const data1 = [
    {
      id: 1,
      name: "Cupcake",
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    { id: 2, name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    {
      id: 3,
      name: "Eclair",
      calories: 262,
      fat: 16.0,
      carbs: 24,
      protein: 6.0,
    },
    {
      id: 4,
      name: "Frozen Yoghurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      id: 5,
      name: "Gingerbread",
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
    },
  ];

  const { getSysUser } = UseNetworkCalls();

  useEffect(() => {
    const fetchUsers = async (page: number, rowsPerPage: number) => {
      setLoading(true);
      try {
        const response = await getSysUser({
          page,
          limit: rowsPerPage,
          userName: "",
          telegramId: "",
        }); // Fetch data
        console.log(response.content);
        setData(response.content);
        setTotalRecords(response.totalElements);
        console.log(
          "---------------------------",
          mapDataToColumns(data, columnsSet)
        );
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers(page, rowsPerPage);
  }, [page, rowsPerPage]); // Dependency array to ensure the effect runs as needed

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

  return (
    <>
      <Box>
        <Box>
          <Typography>Test Ari</Typography>
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
            showAddButton={true}
          />
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
