import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseNetworkCalls from "../hooks/utility/UseNetworkCalls";
import { Box } from "@mui/material";
import TableComponent from "../assets/Componets/TableComponent";
import {
  ApproveRequest,
  SearchServiceRegistrationReq,
} from "./ServiceRegistrationInterface";
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
  const { getServicesRegistration, approveService } = UseNetworkCalls();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

  const handleSearch = (newFilters: SearchServiceRegistrationReq) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handleApprove = (id: number) => async () => {
    if (id !== 0) {
      alert(`ID are selected for approval : ${selectedIds}`);
      const payload: ApproveRequest = {
        requestId: id,
        status: "APPROVED",
        reason: "Seems good",
      };
      try {
        const response = await approveService(payload);
        if (response) {
          alert("User added successfully!");
          window.location.reload();
        } else {
          alert(`Failed to delete user: ${response}`);
        }
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
    } else {
      // alert(`Selected IDs for approval: ${selectedIds.join(", ")}`);
      console.log("Approve clicked for IDs:", selectedIds);
    }
  };

  const handleReject = (id: number) => {
    alert(`"clicked reject", ${id}`);
  };

  // -------------------------------
  const handleDetail = (id: number) => {
    console.log("Add clicked", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit clicked:", id);
  };

  const handleDelete = (selectedIds: number[]) => {
    alert(`"clicked: " ${selectedIds}`);
  };

  // ------------------------------------

  const handleRejectOne = (id: number) => {
    alert(`"clicked reject", ${id}`);
  };

  const handleApproveSingle = (id: number) => {
    alert(`"clicked: " ${id}`);
  };

  const handleSelectionChange = (ids: number[]) => {
    setSelectedIds(ids);
    console.log("Selected IDs:", ids);
  };

  // Handle Delete action
  const handleDeleteOne = async (id: number) => {
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

  const toolbarActions = [
    {
      icon: <InfoIcon />,
      label: "Detail",
      onClick: () => {
        handleDetail(selectedIds[0]);
      },
      color: "info" as "info", // Button will have Material-UI "info" color
      disabled: selectedIds.length !== 1, // Disable the button if more than one row is selected
    },
    {
      icon: <EditIcon />,
      label: "Edit",
      onClick: () => {
        handleEdit(selectedIds[0]);
      },
      color: "warning" as "warning", // "warning" color
      disabled: selectedIds.length !== 1, // Disable the button if more than one row is selected
    },
    {
      icon: <DeleteIcon />,
      label: "Delete",
      onClick: () => {
        handleDelete(selectedIds);
      },
      color: "error" as "error", // "error" color for deletion
      disabled: selectedIds.length === 0, // Disable the button if no row is selected
    },
    {
      icon: <EditAttributesTwoToneIcon />,
      label: "Approve",
      onClick: () => {
        handleApprove(selectedIds[0])();
      },
      color: "success" as "success", // "success" color for approval
      disabled: selectedIds.length !== 1, // Disable the button if more than one row is selected
    },
    {
      icon: <RemoveCircleOutlineIcon />,
      label: "Reject",
      onClick: () => {
        handleReject(selectedIds[0]);
      },
      color: "error" as "error", // "error" color for rejection
      disabled: selectedIds.length !== 1, // Disable the button if more than one row is selected
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
            onDelete={handleDeleteOne}
            onApprove={handleApproveSingle}
            onReject={handleRejectOne}
            showSearch={true}
            showAddButton={true}
            toolbarActions={toolbarActions}
            onSelectionChange={handleSelectionChange} // Pass callback
          />
        </Box>
      </Box>
    </>
  );
};

export default ServiceRegistration;
