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
import React, { useMemo, useState } from "react";

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
  onAdd?: () => void;
  showSearch?: boolean;
  showAddButton?: boolean;
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
  onAdd,
  showSearch,
  showAddButton,
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
      data.filter((row) =>
        columns.some((column) =>
          row[column.id]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      ),
    [data, searchQuery, columns]
  );

  const sortedData = useMemo(
    () =>
      [...filteredData].sort((a, b) =>
        order === "desc"
          ? b[orderBy].toString().localeCompare(a[orderBy].toString())
          : a[orderBy].toString().localeCompare(b[orderBy].toString())
      ),
    [filteredData, order, orderBy]
  );

  const visibleRows = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      {showSearch && (
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ mb: 2, width: "100%" }}
          onChange={handleSearch}
        />
      )}
      {showAddButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={onAdd}
          sx={{ mb: 2 }}
        >
          Add Details
        </Button>
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
                {(onUpdate || onDelete) && <TableCell>Actions</TableCell>}
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
                    {(onUpdate || onDelete) && (
                      <TableCell
                        sx={{
                          position: "sticky",
                          right: 0,
                          background: "white",
                          zIndex: 1,
                        }}
                      >
                        {onUpdate && (
                          <IconButton onClick={() => onUpdate(row.id)}>
                            <EditIcon />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton onClick={() => onDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
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
