import React, { useEffect, useState } from "react";
import PayemntSearch from "./PayemntSearch";
import { Box } from "@mui/material";
import TableComponent from "../../assets/Componets/TableComponent";
import { useNavigate } from "react-router-dom";
import {
  PaymentDetailsRequest,
  PaymentRecord,
  ValidatePaymentApproveRequest,
} from "./PaymentInterface";
import UseNetworkCalls from "../../hooks/utility/UseNetworkCalls";
import EditAttributesTwoToneIcon from "@mui/icons-material/EditAttributesTwoTone";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Payment = () => {
  // Sample columns data
  const columnsSet = [
    { id: "id", label: "ID", numeric: true },
    { id: "serviceName", label: "Service Name", numeric: false },
    { id: "userName", label: "User Name", numeric: false },
    { id: "orderId", label: "Order ID", numeric: false },
    { id: "amount", label: "Amount", numeric: true },
    { id: "paymentMethod", label: "Payment Method", numeric: false },
    { id: "paymentGateway", label: "Payment Gateway", numeric: false },
    { id: "paymentOrderId", label: "Payment Order ID", numeric: false },
    { id: "paymentStatus", label: "Payment Status", numeric: true },
    { id: "bookingPrice", label: "Booking Price", numeric: true },
    { id: "bookingFrom", label: "Booking From", numeric: false },
    { id: "bookingTo", label: "Booking To", numeric: false },
    { id: "createdAt", label: "Payment Created At", numeric: false },
    {
      id: "serviceProvider",
      label: "Service Provider",
      numeric: false,
    },
  ];
  // Explicitly type the state
  const [data, setData] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<PaymentDetailsRequest>({});
  const { getAllpayments, approvePayment } = UseNetworkCalls();
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchPayment = async () => {
      setLoading(true);
      // Convert filters to ensure numeric values for telegramId and id
      const params = {
        ...filters,
        page,
        limit: rowsPerPage,
      };
      try {
        console.log("`params`", params);

        // Fetch data
        const response = await getAllpayments(params);
        setData(response.content);
        console.log(data);
        // Transform the response data to match column structure
        const formattedData = response.content.map((item: PaymentRecord) => ({
          id: item.id || "-", // Handle missing values
          serviceName: item.booking?.service_name || "N/A",
          userName: item.booking?.user_name || "N/A",
          orderId: item.booking?.orderId || "N/A",
          amount: item.amount ?? 0, // Default to 0 if missing
          paymentMethod: item.paymentMethod || "N/A",
          paymentGateway: item.paymentGateway || "N/A",
          paymentOrderId: item.paymentOrderId || "N/A",
          paymentStatus: item.paymentStatus || "N/A",
          bookingPrice: item.booking?.price ?? 0,
          bookingFrom: item.booking?.bookingDateFrom || "N/A",
          bookingTo: item.booking?.bookingDateTo || "N/A",
          createdAt: item.createdAt || "N/A",
          serviceProvider: item.booking?.service_provider_name || "N/A",
        }));
        console.log("formattedData", formattedData);

        setFormattedData(formattedData);
        setTotalRecords(response.totalElements);
      } catch (err: any) {
        if (err.response?.status === 401) {
          alert("system.unAuthorized");
          navigate("/login");
        } else {
          setError("Failed to fetch payments.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPayment();
  }, [page, rowsPerPage, filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleSearch = (newFilters: PaymentDetailsRequest) => {
    setFilters(newFilters);
    setPage(0);
  };

  // Handle Approve action
  const handleApprove = (id: number) => async () => {
    alert(`Approve clicked for ID: ${id}`);
    const payload: ValidatePaymentApproveRequest = {
      id: id,
      status: "APPROVED",
    };
    try {
      // Optional: Validate the data
      if (!id) {
        alert("ID is required");
        return;
      }
      const response = await approvePayment(payload);
      alert("Payment approved successfully");
      console.log("Approve response", response);
      // Call the API to approve the payment
    } catch (error) {
      console.error("Failed to approve payment", error);
    }
  };

  // Handle Reject action
  const handleReject = (id: number) => async () => {
    alert(`Reject clicked for ID: ${id}`);

    const payload: ValidatePaymentApproveRequest = {
      id: id,
      status: "REJECTED",
      reason: "Seems bad",
    };
    try {
      // Optional: Validate the data
      if (!id) {
        alert("ID is required");
        return;
      }
      const response = await approvePayment(payload);
      alert("Payment approved successfully");
      console.log("Approve response", response);
      // Call the API to reject the payment
    } catch (error) {
      console.error("Failed to reject payment", error);
    }
  };

  // handle selection change
  const handleSelectionChange = (ids: number[]) => {
    setSelectedIds(ids);
    console.log("Selected IDs:", ids);
  };

  const toolbarActions = [
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
          <PayemntSearch onSearch={handleSearch} />
        </Box>

        <Box>
          <TableComponent
            columns={columnsSet}
            data={formattedData}
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
            toolbarActions={toolbarActions}
            onSelectionChange={handleSelectionChange} // Pass callback
          />
        </Box>
      </Box>
    </>
  );
};

export default Payment;
function handleApprove(arg0: number) {
  throw new Error("Function not implemented.");
}
