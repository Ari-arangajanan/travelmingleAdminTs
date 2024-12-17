import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseNetworkCalls from "../hooks/utility/UseNetworkCalls";
import { Box } from "@mui/material";
import TableComponent from "../assets/Componets/TableComponent";
import { SearchServiceRegistrationReq } from "./ServiceRegistrationInterface";
import ServiceRegistrationSearch from "./ServiceRegistrationSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditAttributesTwoToneIcon from "@mui/icons-material/EditAttributesTwoTone";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InfoIcon from "@mui/icons-material/Info";

const ServiceRegistration = () => {
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
    {
      id: "registeredByUserName",
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
  const [filters, setFilters] = useState<SearchServiceRegistrationReq>({
    serviceName: "",
    categoryId: 0,
    serviceProviderId: 0,
  });
  const [open, setOpen] = useState(false);
  const { getServicesRegistration } = UseNetworkCalls();

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
        const response = await getServicesRegistration(params);
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
  const handleSearch = (newFilters: SearchServiceRegistrationReq) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handleApprove = (id: number) => {
    alert(`"clicked approve": ${id}`);
  };

  const handleReject = (id: number) => {
    alert(`"clicked reject", ${id}`);
  };

  // -------------------------------
  const handleDetail = (id: number) => {
    console.log("Add clicked");
  };

  const handleEdit = (id: number) => {
    console.log("Edit clicked");
  };

  const handleSpprove = (id: number) => {
    alert(`"clicked: " ${id}`);
  };

  // const handleReject = (id: number)=>{
  //   alert(`"clicked: " ${id}` )
  // }

  const toolbarActions = [
    {
      icon: <InfoIcon />,
      label: "Detail",
      onClick: handleDetail,
      color: "info" as "info", // Button will have Material-UI "info" color
    },
    {
      icon: <EditIcon />,
      label: "Edit",
      onClick: handleEdit,
      color: "warning" as "warning", // "warning" color
    },
    {
      icon: <DeleteIcon />,
      label: "Delete",
      onClick: handleDelete,
      color: "error" as "error", // "error" color for deletion
    },
    {
      icon: <EditAttributesTwoToneIcon />,
      label: "Approve",
      onClick: handleApprove,
      color: "success" as "success", // "success" color for approval
    },
    {
      icon: <RemoveCircleOutlineIcon />,
      label: "Reject",
      onClick: handleReject,
      color: "error" as "error", // "error" color for rejection
    },
  ];

  return (
    <>
      <Box>
        <Box>
          <ServiceRegistrationSearch onSearch={handleSearch} />
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
            onApprove={handleApprove}
            onReject={handleReject}
            showSearch={true}
            showAddButton={true}
            toolbarActions={toolbarActions}
          />
        </Box>
      </Box>
    </>
  );
};

export default ServiceRegistration;
