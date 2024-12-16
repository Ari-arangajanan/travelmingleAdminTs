import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCategory from "./AddCategory";
import { AddCategoryReq, SearchCategoryReq } from "./ServiceCategoryInterface";
import TableComponent from "../../assets/Componets/TableComponent";
import CategorySearch from "./CategorySearch";
import UseNetworkCalls from "../../hooks/utility/UseNetworkCalls";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ServiceCategory = () => {
  const columnsSet = [
    { id: "id", label: "ID", numeric: true },
    { id: "categoryName", label: "Category Name", numeric: false },
    { id: "description", label: "Description", numeric: false },
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
  const [open, setOpen] = useState(false);
  const { getCatrgory, addCategory } = UseNetworkCalls();

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
        const response = await getCatrgory(params);
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
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleSave = async (data: AddCategoryReq) => {
    try {
      // Optional: Validate the data
      if (data.categoryName == null) {
        alert("categoryName Cannotbe Null");
        return;
      }
      const response = await addCategory(data);
      if (response) {
        alert("User added successfully!");
        setOpen(false); // Close dialog
      } else {
        alert(`Failed to add user: ${response}`);
        setError(response);
      }
    } catch (error: any) {
      console.error("Error adding user:", error);
      alert(error);
      if (error.response?.status === 401) {
        alert("system.unAuthorized");
        navigate("/login");
      } else {
        setError("Failed to fetch users.");
      }
    }
  };

  // Handle Add action
  const handleAdd = () => {
    // alert("Add Details clicked");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const handleSearch = (newFilters: SearchCategoryReq) => {
    setFilters(newFilters);
    setPage(0);
  };

  // -------------------------------
  // const handleAdd = (id: number) => {
  //   console.log("Add clicked");
  // };

  const handleEdit = (id: number) => {
    console.log("Edit clicked");
  };

  const toolbarActions = [
    { icon: <AddIcon />, label: "Add", onClick: handleAdd },
    { icon: <EditIcon />, label: "Edit", onClick: handleEdit },
    { icon: <DeleteIcon />, label: "Delete", onClick: handleDelete },
  ];

  return (
    <>
      <>
        <Box>
          <Box>
            <CategorySearch onSearch={handleSearch} />
          </Box>
          <AddCategory
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
              // onAdd={handleAdd}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              showSearch={true}
              showAddButton={true}
              toolbarActions={toolbarActions}
            />
          </Box>
        </Box>
      </>
    </>
  );
};

export default ServiceCategory;
