import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import FormDialogtxs from "../../assets/Componets/FormDialogtxs";
import { AddCategoryReq } from "./ServiceCategoryInterface";

interface Params {
  handleSave: (data: AddCategoryReq) => void;
  handleClose: () => void;
  open: boolean;
}

const AddCategory: React.FC<Params> = ({ handleSave, handleClose, open }) => {
  const [formData, setFormData] = useState<AddCategoryReq>({
    categoryName: "",
    description: "",
    status: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, status: e.target.checked ? 1 : 0 }));
  };

  return (
    <>
      <FormDialogtxs
        open={open}
        onClose={handleClose}
        onSave={() => handleSave(formData)}
        title="Add Category"
      >
        <TextField
          margin="dense"
          label="Category Name"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch
              checked={!!formData.status}
              onChange={handleStatusChange}
              name="status"
            />
          }
          label="Status (Active/Inactive)"
        />
      </FormDialogtxs>
    </>
  );
};

export default AddCategory;
