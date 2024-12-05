import { TextField } from "@mui/material";
import React, { useState } from "react";
import FormDialogtxs from "../../../assets/Componets/FormDialogtxs";

interface Params {
  handleSave: (data: { name: string; email: string }) => void;
  handleClose: () => void;
  open: boolean;
}
const AddSysUser: React.FC<Params> = ({ handleSave, handleClose, open }) => {
  const [formData, setFormData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      </FormDialogtxs>
    </>
  );
};

export default AddSysUser;
