import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import React, { useMemo, useState } from "react";

interface ToolbarAction {
  icon: React.ReactNode;
  label: string;
  onClick: (...args: any[]) => void | Promise<void>;
  color?:
    | "info"
    | "warning"
    | "error"
    | "success"
    | "inherit"
    | "primary"
    | "secondary"; // Match Material-UI
}

interface Column {
  id: string;
  label: string;
  numeric: boolean;
}

interface DynamiTableProps {
  columns: Column[];
  data: any[];
  totalRecords: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onAdd?: () => void;
  showSearch?: boolean;
  showAddButton?: boolean;
  toolbarActions?: ToolbarAction[]; // New prop for dynamic toolbar actions
}

const TableComponent = ({
  columns,
  data,
  totalRecords,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
  onUpdate,
  onApprove,
  onReject,
  onAdd,
  showSearch,
  showAddButton = false,
  toolbarActions = [],
}: DynamiTableProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>(columns[0]?.id || "");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((item) => item.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = useMemo(
    () =>
      (data || []).filter((row) =>
        (columns || []).some((column) => {
          const cellValue = row[column.id];
          return cellValue
            ? cellValue
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            : false;
        })
      ),
    [data, searchQuery, columns]
  );

  const sortedData = useMemo(
    () =>
      [...filteredData].sort((a, b) => {
        const aValue = a[orderBy] || ""; // Default to empty string if undefined
        const bValue = b[orderBy] || "";
        return order === "desc"
          ? bValue.toString().localeCompare(aValue.toString())
          : aValue.toString().localeCompare(bValue.toString());
      }),
    [filteredData, order, orderBy]
  );

  const visibleRows = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        {showSearch && (
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ mb: 2, width: "200px" }}
            onChange={handleSearch}
          />
        )}
      </Box>
      <Box>
        {showAddButton && onAdd && (
          <Button
            variant="contained"
            color="primary"
            onClick={onAdd}
            sx={{ mb: 1, ml: 2 }}
          >
            Add Details
          </Button>
        )}
      </Box>
      {/* Toolbar Actions */}
      {toolbarActions.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 2, // Space between buttons
            mb: 2,
          }}
        >
          {toolbarActions.map((action, index) => (
            <Button
              key={index}
              startIcon={action.icon}
              variant="contained"
              color={action.color || "primary"} // Default to "primary" if no color is provided
              onClick={action.onClick}
              sx={{ marginRight: 1 }} // Optional: Add spacing between buttons
            >
              {action.label}
            </Button>
          ))}
        </Box>
      )}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {(onUpdate || onDelete || onApprove || onReject) && (
                  <TableCell
                    sx={{
                      position: "sticky",
                      right: 0,
                      textAlign: "center",
                      background: "white",
                      zIndex: 1,
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.id);
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.numeric ? "right" : "left"}
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
                    {(onUpdate || onDelete || onApprove || onReject) && (
                      <TableCell
                        sx={{
                          position: "sticky",
                          right: 0,
                          textAlign: "center",
                          background: "white",
                          zIndex: 1,
                          width: "auto", // Let the width shrink to fit content
                        }}
                      >
                        <Box
                          sx={{
                            display: "grid", // Use CSS grid
                            gridTemplateColumns: `repeat(${[onUpdate, onDelete, onApprove, onReject].filter(Boolean).length > 2 ? 2 : 1}, auto)`, // 2 columns if >2 icons, otherwise 1
                            gap: 1, // Spacing between icons
                            justifyContent: "center",
                          }}
                        >
                          {onUpdate && (
                            <IconButton
                              color="primary"
                              onClick={() => onUpdate(row.id)}
                              title="Edit"
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                          {onDelete && (
                            <IconButton
                              color="secondary"
                              onClick={() => onDelete(row.id)}
                              title="Delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                          {onApprove && (
                            <IconButton
                              color="success"
                              onClick={() => onApprove(row.id)}
                              title="Approve"
                            >
                              {/* Replace DeleteIcon with your desired icon */}
                              <CheckCircleIcon />
                            </IconButton>
                          )}
                          {onReject && (
                            <IconButton
                              color="error"
                              onClick={() => onReject(row.id)}
                              title="Reject"
                            >
                              {/* Replace DeleteIcon with your desired icon */}
                              <CancelIcon />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRecords} // Use total records for correct pagination
          rowsPerPage={rowsPerPage} // Current rows per page
          page={currentPage} // Current page
          onPageChange={(event, newPage) => onPageChange(newPage)} // Trigger parent callback
          onRowsPerPageChange={(event) => {
            onRowsPerPageChange(parseInt(event.target.value, 10)); // Trigger parent callback
          }}
        />
      </Paper>
    </Box>
  );
};

export default TableComponent;
