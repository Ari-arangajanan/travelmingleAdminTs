import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import FormDialogtxs from "../../../assets/Componets/FormDialogtxs";

interface Params {
  handleSave: (data: {
    name: string;
    email: string;
    phone: number;
    avatar: string;
    status: number;
    password: string;
    confirmPassword: string;
    role: number;
  }) => void;
  handleClose: () => void;
  open: boolean;
  dropdownData: Array<{
    role: string;
    id: number;
  }>;
}
const AddSysUser: React.FC<Params> = ({
  handleSave,
  handleClose,
  open,
  dropdownData,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: number;
    avatar: string;
    status: number;
    password: string;
    confirmPassword: string;
    role: number;
  }>({
    name: "",
    email: "",
    phone: 0,
    avatar: "",
    status: 1,
    password: "",
    confirmPassword: "",
    role: 1,
  });
  const [passwordError, setPasswordError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate confirmPassword
    if (name === "confirmPassword" || name === "password") {
      if (
        (name === "confirmPassword" && value !== formData.password) ||
        (name === "password" && formData.confirmPassword !== value)
      ) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file); // Generate a temporary URL for preview purposes
      setFormData((prev) => ({ ...prev, avatar: fileURL }));
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, status: e.target.checked ? 1 : 0 }));
  };

  const handleRoleChange = (e: SelectChangeEvent<number>) => {
    setFormData((prev) => ({
      ...prev,
      role: Number(e.target.value as number),
    }));
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Add
      </Button> */}
      <FormDialogtxs
        open={open}
        onClose={handleClose}
        onSave={() => handleSave(formData)}
        title="Example Form"
      >
        <TextField
          margin="dense"
          label="Username"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
        />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <TextField
            margin="dense"
            label="Avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="outlined" component="label">
            Upload
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileUpload}
            />
          </Button>
        </div>
        <FormControl fullWidth margin="dense">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={formData.role}
            onChange={handleRoleChange}
          >
            {dropdownData.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={!!formData.status}
              onChange={handleStatusChange}
              name="status"
            />
          }
          label="Status (On/Off)"
        />
      </FormDialogtxs>
    </>
  );
};

export default AddSysUser;
